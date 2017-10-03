import {BOARD_CONSTANT} from '../../constants/board.constant.js';
import {Piece} from '../Piece.class.js';

export class Queen extends Piece{
    prepare(){
        var column = 'd';
        var row = ( this.color === 'white' ? 1 : 8 );
    
        this.setPosition( column + row );
    }
}
