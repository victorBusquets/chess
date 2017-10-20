import {Piece} from '../Piece.class.js';

export class Knight extends Piece{
    MOVEMENT_CODES = [
        { 'x':-2, 'y':-1 },
        { 'x':-1, 'y':-2 },
        { 'x': 1, 'y':-2 },
        { 'x': 2, 'y':-1 },
        { 'x':-1, 'y': 2 },
        { 'x':-2, 'y': 1 },
        { 'x': 1, 'y': 2 },
        { 'x': 2, 'y': 1 }
    ];

    prepare(){
        var column = ( !this.index ? 'b' : 'g' );
        var row = ( this.color === 'white' ? 1 : 8 );
    
        this.setPosition( column + row );
    }

    showMovements( clickAction:boolean, checkIsPiecePosition:any ){
        this.prepareMovementsByPositions( clickAction, checkIsPiecePosition );
    }
}
