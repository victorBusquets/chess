import {Piece} from '../Piece.class.js';

export class Pawn extends Piece{
    firstMovement:boolean = true;

    prepare(){
        var column = this.BOARD_CONSTANT.boardLetters[this.index],
        row = ( this.color === 'white' ? 2 : 7 );
    
        this.setPosition( column + row );
    }

    showMovements( clickAction:boolean, checkIsPiecePosition:any ){
        var movementTimes = ( this.firstMovement ? 2 : 1 );
        var positionLetter = this.position[0];
        var positionNumber = parseInt( this.position[1] );
        var movements = [];

        for(var i=1; movementTimes>=i; i++){
            var finalPositionNumber = positionNumber + ( this.reverseAssets ? -i : i );

            if( !checkIsPiecePosition(positionLetter + finalPositionNumber) ){
                movements.push( positionLetter + finalPositionNumber );
            }
        }

        this.canvas[ clickAction ? 'showMovements' : 'showPosibleMovements' ]( movements );
    }

    movementCallback(){
        this.firstMovement = false;
    }
}
