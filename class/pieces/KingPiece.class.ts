import {Piece} from '../Piece.class.js';

export class King extends Piece{
    MOVEMENT_CODES = [
        { 'x':-1, 'y':-1 },
        { 'x': 0, 'y':-1 },
        { 'x': 1, 'y':-1 },
        { 'x':-1, 'y': 0 },
        { 'x': 1, 'y': 0 },
        { 'x':-1, 'y': 1 },
        { 'x': 0, 'y': 1 },
        { 'x': 1, 'y': 1 }
    ];

    prepare(){
        var column = 'e';
        var row = ( this.color === 'white' ? 1 : 8 );
    
        this.setPosition( column + row );
    }

    showMovements( clickAction:boolean, checkIsPiecePosition:any ){
        this.prepareMovementsByPositions( clickAction, checkIsPiecePosition );        
    }
}
