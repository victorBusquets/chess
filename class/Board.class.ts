import {Team} from './Team.class.js';

export class Board {
    blackTeam:Team;
    whiteTeam:Team;

    constructor(){
        this.printInfo();
        this.blackTeam = new Team('black');
        this.whiteTeam = new Team('white');
    }

    printInfo(){
        console.log("Board created!!");
    }
};