import {BOARD_CONSTANT} from '../../constants/board.constant.js';
import {Piece} from '../Piece.class.js';

export class Pawn extends Piece{
    prepare(){
        var column = BOARD_CONSTANT.boardLetters[this.index],
        row = ( this.color === 'white' ? 2 : 7 );
    
        this.setPosition( column + row );
    }
}
