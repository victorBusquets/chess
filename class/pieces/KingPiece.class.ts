import {BOARD_CONSTANT} from '../../constants/board.constant.js';
import {Piece} from '../Piece.class.js';

export class King extends Piece{
    prepare(){
        var column = 'e';
        var row = ( this.color === 'white' ? 1 : 8 );
    
        this.setPosition( column + row );
    }
}
