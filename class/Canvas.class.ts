import {BOARD_CONSTANT} from '../constants/board.constant.js';

export class Canvas{
    margin:number = 100 
    canvas:any;
    ctx:any; 
    cellSize:number;   
    rotatedImagePosition:any;

    constructor(){
        this.canvas = document.getElementById( "game" );
        this.ctx  = this.canvas.getContext("2d");

        this.prepare();
    }

    prepare(){
        var height = window.innerHeight
        var width = window.innerWidth;
        var maxSize = ( height > width ? width : height ) - this.margin;

        this.cellSize = maxSize / 8;

        this.rotatedImagePosition = {
            'x': -( this.cellSize/2 ),
            'y': -( this.cellSize/2 )
        };

        this.canvas.width = maxSize;
        this.canvas.height = maxSize;
    }

	fillRect(startX:number, startY:number, width:number, height:number, color:string){
		if(color) this.setColor(color);
		this.ctx.fillRect( startX, startY, width, height );
    }

    fillCircle(position, color){
        var x = this.cellSize/2 + (this.cellSize * position.x);
        var y = this.cellSize/2 + (this.cellSize * position.y);

        this.ctx.beginPath();
        if(color) this.setColor(color);
        this.ctx.arc( x, y, this.cellSize/2, 0, 2*Math.PI );
        this.ctx.fill();
    }

    fillCell(position:any, color:string){
        this.fillRect(position.x * this.cellSize, position.y * this.cellSize, this.cellSize, this.cellSize, color);
    }

    fillPiece(piece:any, reverse:boolean){
        var position = this.translateValueToPosition(piece.position);
        var rotate = ( reverse ? 180 : 0 );
        this.drawRotatedImage( piece.asset, position, rotate);
        //this.drawImage( piece.asset, position);
    }
    
    setColor(color:string){
		this.ctx.fillStyle = color;
    }

    translateValueToPosition(value:string){
        var x = BOARD_CONSTANT.boardLetters.indexOf(value[0]);
        var y = 8 - parseInt( value[1] );

        return {
            x:x,
            y:y
        }
    }

    drawImage( imgUrl:string, position:any ){
        var imageObj = new Image();
        var that = this;

        imageObj.onload = function() {
            that.ctx.drawImage( this, position.x, position.y, that.cellSize, that.cellSize );
        };
        imageObj.src = imgUrl;
    }
    
    drawRotatedImage( imgUrl:string, position:any, rotate:number ){
        var imageObj = new Image();
        var that = this;
        var rotatePosition = {
            x: position.x * this.cellSize + ( this.cellSize/2 ),
            y: position.y * this.cellSize + ( this.cellSize/2 )
        };

        imageObj.onload = function() {
            that.rotateContext( rotatePosition, rotate );	
            that.ctx.drawImage( this, that.rotatedImagePosition.x, that.rotatedImagePosition.y, that.cellSize, that.cellSize );
            that.restoreContext();
        };

        imageObj.src = imgUrl;
	};
		
	translateContext( position ){
		this.ctx.save();
		this.ctx.translate( position.x, position.y );
	};
	
	rotateContext( position, degrees ){
	    this.translateContext( position );
		this.ctx.rotate( degrees * Math.PI /180);
	};
	
	restoreContext(){
		this.ctx.restore();
    };
};