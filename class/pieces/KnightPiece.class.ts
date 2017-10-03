import {BOARD_CONSTANT} from '../../constants/board.constant.js';
import {Piece} from '../Piece.class.js';

export class Knight extends Piece{
    prepare(){
        var column = ( !this.index ? 'b' : 'g' );
        var row = ( this.color === 'white' ? 1 : 8 );
    
        this.setPosition( column + row );
    }
}
