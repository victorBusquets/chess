import {TEAM_CONSTANT} from '../constants/team.constant.js';
import { Piece } from './Piece.class.js';
import { pieces } from './pieces/pieces.js';

export class Team {
    color:string;
    values:Piece[] = [];
    reverseAssets:boolean;

    constructor(color:string, reverseAssets:boolean, canvas:any){
        this.color = color;
        this.reverseAssets = reverseAssets;
        this.prepare(canvas);
    }

    prepare(canvas:any){
		for(var i = 0; i<TEAM_CONSTANT.pieces.length; i++){
			var piece = TEAM_CONSTANT.pieces[i];
			for(var x = 0; x<piece.count; x++){
                this.values.push( new pieces[piece.type](piece.type, this.color, x, this.reverseAssets, canvas) );
			};	
		};
    };
    
    render(){
        for(var i=0; i<this.values.length; i++){
            this.values[i].render();
        }
    }

    checkPieceInCell( mouseCellPosition:string ){
        return this.values.filter(function(piece){
            return piece.position === mouseCellPosition;
        })[0];
    }

    killPiece( piece:Piece ){
        var index = this.values.indexOf(piece);

        if(index >= 0){
            this.values.splice(index, 1);
        }
    }
};