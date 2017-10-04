export class Piece {
    color:string;
    type:string;
    asset:string;
    position:string;
    index:number;
    canvas:any;
    reverseAssets:boolean;
    
    constructor(type:string, color:string, index:number, reverseAssets:boolean, canvas:any){
        this.type = type;
        this.color = color;
        this.index = index;
        this.reverseAssets = reverseAssets;
        this.canvas = canvas;
        this.asset = '/assets/'+type+'-'+color+'.png';
        this.prepare();
    }

    setPosition( position:string ){
        this.position = position;
    }

    render(){
        this.canvas.fillPiece(this, this.reverseAssets);
    }

    prepare(){
        //Not implemented
        console.log("!Child of Piece.class.ts ("+this.type+") should implements 'prepare()' function");
        
        // Piece out board
        this.setPosition('a0');
    }

    showMovements(){
        //Not implemented
        console.log("!Child of Piece.class.ts ("+this.type+") should implements 'showMovements()' function");
    }
};