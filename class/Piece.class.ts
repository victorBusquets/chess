export class Piece {
    color:string;
    type:string;
    asset:string;
    position:string;
    index:number;
    
    constructor(type:string, color:string, index:number){
        this.type = type;
        this.color = color;
        this.index = index;
        this.asset = '/assets/'+type+'-'+color+'.png';
    }

    setPosition( position:string ){
        this.position = position;
    }
};