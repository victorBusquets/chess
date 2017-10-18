import {BOARD_CONSTANT} from '../../constants/board.constant.js';
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
        var positionLetter = this.position[0];
        var positionNumber = parseInt( this.position[1] );
        var movements = [];


        this.MOVEMENT_CODES.map(function( code ){
            var finalPositionNumber = positionNumber + code.y;
            var letterIndex = BOARD_CONSTANT.boardLetters.indexOf( positionLetter ) + code.x;
            var finalPositionLetter = BOARD_CONSTANT.boardLetters[ letterIndex ] || 'K';

            if( !checkIsPiecePosition(finalPositionLetter + finalPositionNumber) ){
                movements.push( finalPositionLetter + finalPositionNumber );
            }
        });


        this.canvas[ clickAction ? 'showMovements' : 'showPosibleMovements' ]( movements );
    }
}
