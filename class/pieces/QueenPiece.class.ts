import {Piece} from '../Piece.class.js';

export class Queen extends Piece{
    DIRECTIONS = [
        { 'x': 0, 'y':-1 },
        { 'x': 1, 'y':-1 },
        { 'x': 1, 'y': 0 },
        { 'x': 1, 'y': 1 },
        { 'x': 0, 'y': 1 },
        { 'x':-1, 'y': 1 },
        { 'x':-1, 'y': 0 },       
        { 'x':-1, 'y': -1 } 
    ];
    
    prepare(){
        var column = 'd';
        var row = ( this.color === 'white' ? 1 : 8 );
    
        this.setPosition( column + row );
    }
    
    showMovements( clickAction:boolean, checkIsPiecePosition:any ){
        this.prepareMovementsByDirections( clickAction, checkIsPiecePosition );
    }
}
