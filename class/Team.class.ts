import {TEAM_CONSTANT} from '../constants/team.constant.js';
import { Piece } from './Piece.class.js';
import { pieces } from './pieces/pieces.js';

export class Team {
    color:string;
    team:Piece[] = [];

    constructor(color:string){
        this.color = color;
        this.prepare();
        this.printInfo();
    }

    prepare(){
		for(var i = 0; i<TEAM_CONSTANT.pieces.length; i++){
			var piece = TEAM_CONSTANT.pieces[i];

			for(var x = 0; x<piece.count; x++){
                this.team.push( new pieces[piece.type](piece.type, this.color, x) );
			};	
		};
	};

    printInfo(){
        console.log("Team "+this.color+" ready!!",this.team);
    }
};