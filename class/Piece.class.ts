import {BOARD_CONSTANT} from '../constants/board.constant.js';

export class Piece {
    color:string;
    type:string;
    asset:string;
    position:string;
    index:number;
    canvas:any;
    reverseAssets:boolean;
    BOARD_CONSTANT:any = BOARD_CONSTANT;
    
    constructor(type:string, color:string, index:number, reverseAssets:boolean, canvas:any){
        this.type = type;
        this.color = color;
        this.index = index;
        this.reverseAssets = reverseAssets;
        this.canvas = canvas;
        this.asset = '/assets/'+type+'-'+color+'.png';
        this.prepare();
    }

    setPosition( position:string ){
        this.position = position;
    }

    render(){
        this.canvas.fillPiece(this);
    }

    prepare(){
        //Not implemented
        console.error("!Child of Piece.class.ts ("+this.type+") should implements 'prepare()' function");
        
        // Piece out board
        this.setPosition('a0');
    }

    showMovements(){
        //Not implemented
        console.error("!Child of Piece.class.ts ("+this.type+") should implements 'showMovements()' function");
    }

    movementCallback(){
        //Not implemented
    }

    prepareMovementsByDirections( clickAction:boolean, checkIsPiecePosition:any ){
        if(this.DIRECTIONS){
            var positionLetter:string = this.position[0];
            var positionNumber:number = parseInt( this.position[1] );
            var movements:any[] = [];

            this.DIRECTIONS.map(function( direction:any ){
                var validWay:boolean = true;
                var index:number = 1;

                while( validWay ){
                    var finalPositionNumber = positionNumber + ( direction.y * index );
                    var letterIndex = this.BOARD_CONSTANT.boardLetters.indexOf( positionLetter ) + ( direction.x * index );
                    var finalPositionLetter = this.BOARD_CONSTANT.boardLetters[ letterIndex ] || 'K';

                    if( this.isValidPosition( finalPositionLetter, finalPositionNumber, checkIsPiecePosition ) ){
                        movements.push( finalPositionLetter + finalPositionNumber );
                        index++;
                    }else{
                        validWay = false;
                    }
                }
            }.bind(this));

            this.canvas[ clickAction ? 'showMovements' : 'showPosibleMovements' ]( movements );
        }else{
            console.error("!Child of Piece.class.ts ("+this.type+") use 'prepareMovementsByDirections()' function and should have been declared 'DIRECTIONS' constant");
        }
    }

    prepareMovementsByPositions( clickAction:boolean, checkIsPiecePosition:any ){
        if(this.MOVEMENT_CODES){            
            var positionLetter = this.position[0];
            var positionNumber = parseInt( this.position[1] );
            var movements:any[] = [];

            this.MOVEMENT_CODES.map(function( code:any ){
                var finalPositionNumber = positionNumber + code.y;
                var letterIndex = this.BOARD_CONSTANT.boardLetters.indexOf( positionLetter ) + code.x;
                var finalPositionLetter = this.BOARD_CONSTANT.boardLetters[ letterIndex ] || 'K';

                if( !checkIsPiecePosition(finalPositionLetter + finalPositionNumber) ){
                    movements.push( finalPositionLetter + finalPositionNumber );
                }
            }.bind(this));

            this.canvas[ clickAction ? 'showMovements' : 'showPosibleMovements' ]( movements );
        }else{
            console.error("!Child of Piece.class.ts ("+this.type+") use 'prepareMovementsByPositions()' function and should have been declared 'MOVEMENT_CODES' constant");
        }
    }
};