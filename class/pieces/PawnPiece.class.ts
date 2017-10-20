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
        var movements:any[] = [];

        for(var i=1; movementTimes>=i; i++){
            var finalPositionNumber = positionNumber + ( this.reverseAssets ? -i : i );

            if( !checkIsPiecePosition(positionLetter + finalPositionNumber) ){
                movements.push( positionLetter + finalPositionNumber );
            }
        }

        movements = movements.concat( this.checkKillMovements( checkIsPiecePosition ) );

        this.canvas[ clickAction ? 'showMovements' : 'showPosibleMovements' ]( movements );
    }

    checkKillMovements( checkIsPiecePosition:any ){
        var positionLetter = this.position[0];
        var positionNumber = parseInt( this.position[1] );
        var letterIndex = this.BOARD_CONSTANT.boardLetters.indexOf( positionLetter );
        var killMovements:any[] = [];

        for(var i=0; i<2; i++){
            var finalPositionLetter =  this.BOARD_CONSTANT.boardLetters[letterIndex + ( i? -1 : 1 ) ];
            var finalPositionNumber = positionNumber + ( this.reverseAssets ? -1 : 1 );
            var piecePosition = checkIsPiecePosition(finalPositionLetter + finalPositionNumber)

            if( piecePosition && piecePosition.color !== this.color ){
                killMovements.push( finalPositionLetter + finalPositionNumber );
            } 
        }

        return killMovements;
    }

    movementCallback(){
        this.firstMovement = false;
    }
}
