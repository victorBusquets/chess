import {BOARD_CONSTANT} from '../../constants/board.constant.js';
import {Piece} from '../Piece.class.js';

export class Rook extends Piece{
    constructor( type:string, color:string, index:number ) { 
        super( type, color, index ); 
        this.prepare();
    }

    prepare(){
        var column = ( !this.index ? 'a' : 'h' );
        var row = ( this.color === 'white' ? 1 : 8 );
    
        this.setPosition( column + row );
    }
}
