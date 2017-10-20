import {Piece} from '../Piece.class.js';

export class Bishop extends Piece{
    DIRECTIONS = [
        { 'x': 1, 'y':-1 },
        { 'x': 1, 'y': 1 },
        { 'x':-1, 'y': 1 },
        { 'x':-1, 'y': -1 } 
    ];

    prepare(){
        var column = ( !this.index ? 'c' : 'f' );
        var row = ( this.color === 'white' ? 1 : 8 );
    
        this.setPosition( column + row );
    }

    isValidPosition( letter:string, number:number, checkIsPiecePosition:any ){
        var notPiecePosition = checkIsPiecePosition(letter + number) == false;
        var notOverBoardLimits = ( letter != 'K' && number>0 && number<=8 );

        return notPiecePosition && notOverBoardLimits;
    }

    showMovements( clickAction:boolean, checkIsPiecePosition:any ){
        this.prepareMovementsByDirections( clickAction, checkIsPiecePosition );
    }
}
