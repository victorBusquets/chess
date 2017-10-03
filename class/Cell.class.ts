export class Cell{
    value:string;
    color:string;

    constructor(value:string, black:boolean){
        this.value = value;
        this.color = ( black ? 'black' : 'white' );
    }
};