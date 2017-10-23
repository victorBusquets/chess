import {BOARD_CONSTANT} from '../constants/board.constant.js';

export class Canvas{
    margin:number = 100 
    canvas:any;
    ctx:any; 
    checkIsPiecePosition:any;
    cellSize:number;   
    rotatedImagePosition:any;
    posibleMovementsActives:string[] = [];
    movements:string[] = [];

    COLORS = {
        activeCell:{
            value:'122, 179, 188',
            opacity:{
                click:'.75',
                hover:'.5'
            }
        },
        killCell:{
            value:'218, 41, 41',
            opacity:{
                click:'.75',
                hover:'.5'
            }
        }
    };



    constructor( checkIsPiecePosition:any ){
        this.canvas = document.getElementById( "game" );
        this.ctx  = this.canvas.getContext("2d");
        this.checkIsPiecePosition = checkIsPiecePosition;

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

    fillCircle(position:string, color:string){
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

    fillPiece(piece:any){
        var position = this.translateValueToPosition(piece.position);
        var rotate = ( piece.reverseAssets ? 180 : 0 );
        this.drawRotatedImage( piece.asset, position, rotate);
        //this.drawImage( piece.asset, position);
    }
    
    setColor(color:string){
		this.ctx.fillStyle = color;
    }

    translateValueToPosition(value:string){
        var x = BOARD_CONSTANT.boardLetters.indexOf(value[0]);
        var y = 8 - parseInt( value.substring(1) );

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
	}
		
	translateContext( position:any ){
		this.ctx.save();
		this.ctx.translate( position.x, position.y );
	}
	
	rotateContext( position:any, degrees:number ){
	    this.translateContext( position );
		this.ctx.rotate( degrees * Math.PI /180);
	}
	
	restoreContext(){
		this.ctx.restore();
    }

    showPosibleMovements( posibleMovements:string[] ){        
        posibleMovements.map(function(movement:string){
            if( this.canChangeCellStatus( false, movement ) ){
                var piece = this.checkIsPiecePosition(movement);                
                var position:any = this.translateValueToPosition(movement);

                this.fillCell( position, 'rgba('+this.COLORS[piece?'killCell':'activeCell'].value+','+this.COLORS.activeCell.opacity.hover+')' );

                if(piece){
                    this.fillPiece( piece );  
                }
            }
        }.bind(this));

        this.posibleMovementsActives = posibleMovements;
    }

    showMovements( movements:string[] ){     
        movements.map(function(movement:string){
            var piece = this.checkIsPiecePosition(movement);
            var position:any = this.translateValueToPosition(movement);

            this.fillCell( position, 'rgba('+this.COLORS[piece?'killCell':'activeCell'].value+','+this.COLORS.activeCell.opacity.click+')' );      

            if(piece){
                this.fillPiece( piece );  
            }
        }.bind(this));
        
        this.movements = movements;
    }

    // CHECK MORE EFFICIENT CODE!!!
    clearMovements( boardCells:any[], clickAction:boolean ){
        var cleanedMovements = clickAction ? this.movements : this.posibleMovementsActives;

        for(var i=0; i<boardCells.length; i++){
            if( cleanedMovements.indexOf( boardCells[i].value) >= 0 && this.canChangeCellStatus(clickAction, boardCells[i].value) ){
                var piece = this.checkIsPiecePosition(boardCells[i].value);
                
                this.fillCell( this.translateValueToPosition(boardCells[i].value), boardCells[i].color );

                if(piece){
                    this.fillPiece( piece );  
                }
            }
        }

        this[clickAction ? 'movements' : 'posibleMovementsActives'] = [];
    }

    canChangeCellStatus( clickAction:boolean, cellPosition:string ){
        return ( clickAction ? true : this.movements.indexOf( cellPosition ) < 0 );
    }

    clearCell( value:string, boardCells:any[] ){
        var position = this.translateValueToPosition(value);
        var index = ( 8 * position.y ) + position.x;

        this.fillCell( position, boardCells[index].color );
    }

    executeMovement( piece:any, cellIndex:number, boardCells:any[] ){
        var lastPosition = piece.position;
        var newPosition = this.movements[cellIndex];

        this.clearCell( lastPosition, boardCells );
        piece.position = newPosition;
        this.fillPiece( piece );
        this.clearMovements( boardCells, true );
        piece.movementCallback();
    }
};