import {BOARD_CONSTANT} from '../../constants/board.constant.js';
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

    showMovements( clickAction:boolean ){
        var positionLetter = this.position[0];
        var positionNumber = parseInt( this.position[1] );
        var movements = [];


        this.MOVEMENT_CODES.map(function( code ){
            var finalPositionNumber = positionNumber + code.y;
            var letterIndex = BOARD_CONSTANT.boardLetters.indexOf( positionLetter ) + code.x;
            var finalPositionLetter = BOARD_CONSTANT.boardLetters[ letterIndex ] || 'K';

            movements.push( finalPositionLetter + finalPositionNumber );
        });


        this.canvas[ clickAction ? 'showMovements' : 'showPosibleMovements' ]( movements );
    }
}
