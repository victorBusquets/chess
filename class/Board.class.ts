import {Team} from './Team.class.js';
import {Canvas} from './Canvas.class.js';
import {Cell} from './Cell.class.js';
import {BOARD_CONSTANT} from '../constants/board.constant.js';

export class Board {
    blackTeam:Team;
    whiteTeam:Team;
    values:Cell[] = [];
    canvas:Canvas;
    teamWhiteTurn:boolean = true;
    lastMouseCellPosition:string = '';
    lastMouseCellClickPosition:string = '';
    pieceActive:any;

    constructor(){
        this.canvas = new Canvas();

        this.whiteTeam = new Team('white', false, this.canvas);
        this.blackTeam = new Team('black', true, this.canvas);

        this.prepare();
        this.render();
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
        this.blackTeam.render();
        this.whiteTeam.render();
    }

    addEventListener( canvas:any ){
        //ESTO ESTA MUY GUARRO!
        canvas.addEventListener('mousemove',  function(evt) {
            var rect = canvas.getBoundingClientRect();
            var mousePosition = {
                x: evt.clientX - rect.left,
                y: evt.clientY - rect.top
            };
            var mouseCellPosition = this.getCellByPosition(mousePosition);

            if(mouseCellPosition != this.lastMouseCellPosition && mouseCellPosition != NaN){
                var piece = this[( this.teamWhiteTurn ? 'white' : 'black' )+ 'Team'].checkPieceInCell( mouseCellPosition );
                this.lastMouseCellPosition = mouseCellPosition;
                this.canvas.clearMovements( this.values, false );

                if(piece){
                    piece.showMovements( false );
                }
            }
        }.bind(this), false);
        
        canvas.addEventListener('mouseleave', function(evt){
            this.lastMouseCellPosition = '';
            this.canvas.clearMovements( this.values, false );
        }.bind(this));

        canvas.addEventListener('click',  function(evt) {
            var rect = canvas.getBoundingClientRect();
            var mousePosition = {
                x: evt.clientX - rect.left,
                y: evt.clientY - rect.top
            };
            var mouseCellClickPosition = this.getCellByPosition(mousePosition);
            
            if(mouseCellClickPosition != this.lastMouseCellClickPosition){
                var piece = this[( this.teamWhiteTurn ? 'white' : 'black' )+ 'Team'].checkPieceInCell( mouseCellClickPosition );
                this.lastMouseCellClickPosition = mouseCellClickPosition;
                
                if(piece){
                    this.canvas.clearMovements( this.values, true );
                    this.pieceActive = piece;
                    piece.showMovements( true );
                }else{
                    console.log("Click in cell", this.canvas.movements.indexOf(mouseCellClickPosition) );
                    console.log("Piece active", this.pieceActive);
                }
            }else{
                this.lastMouseCellClickPosition = '';
                this.canvas.clearMovements( this.values, true );                
            }
            
        }.bind(this), false);
    }

    getCellByPosition( mousePos:any ){
        var cellSize = this.canvas.cellSize;
        
        return BOARD_CONSTANT.boardLetters[ Math.ceil( mousePos.x / cellSize ) - 1 ] + BOARD_CONSTANT.boardNumbers[ Math.ceil( mousePos.y / cellSize )-1];
    }

};