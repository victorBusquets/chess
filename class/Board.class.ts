import {Team} from './Team.class.js';
import {Canvas} from './Canvas.class.js';
import {Cell} from './Cell.class.js';
import {BOARD_CONSTANT} from '../constants/board.constant.js';

export class Board {
    blackTeam:Team;
    whiteTeam:Team;
    values:Cell[] = [];
    canvas:Canvas;
    teamWhiteTurn:boolean = false;
    lastMouseCellPosition:string = '';

    constructor(){
        this.canvas = new Canvas();

        this.whiteTeam = new Team('white', false, this.canvas);
        this.blackTeam = new Team('black', true, this.canvas);

        this.prepare();
        this.render();
        
        this.blackTeam.render();
        this.whiteTeam.render();
    }

    prepare(){
        var inverse = false;

        BOARD_CONSTANT.boardNumbers.split('').map(function(number:string){
            BOARD_CONSTANT.boardLetters.split('').map(function(letter:string){           
                this.values.push( new Cell( letter + number, inverse ) );
                inverse = !inverse;
            }.bind(this));
            inverse = !inverse;
        }.bind(this));

        this.addEventListener(this.canvas.canvas);
    }

    render(){
        for(var i=0; i<this.values.length; i++){
            var cell = this.values[i];
            var position = this.canvas.translateValueToPosition(cell.value);

            this.canvas.fillCell( position, cell.color );
        }
    }

    addEventListener( canvas:any ){
        canvas.addEventListener('mousemove',  function(evt) {
            var rect = canvas.getBoundingClientRect();
            var mousePosition = {
                x: evt.clientX - rect.left,
                y: evt.clientY - rect.top
            };
            var mouseCellPosition = this.getCellByPosition(mousePosition);

            if(mouseCellPosition != this.lastMouseCellPosition && mouseCellPosition != NaN){
                this[( this.teamWhiteTurn ? 'white' : 'black' )+ 'Team'].checkPieceInCell( mouseCellPosition );
                this.lastMouseCellPosition = mouseCellPosition;
            }
        }.bind(this), false);
    }

    getCellByPosition( mousePos:any ){
        var cellSize = this.canvas.cellSize;
        
        return BOARD_CONSTANT.boardLetters[ Math.ceil( mousePos.x / cellSize ) - 1 ] + BOARD_CONSTANT.boardNumbers[ Math.ceil( mousePos.y / cellSize )-1];
    }

};