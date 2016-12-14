/**
 * Created by mata on 11.12.16.
 */
import MyLogger from '../Logger';


export default class Node{

    public x: number = NaN;
    public y: number = NaN;
    public vx: number = NaN;
    public vy: number = NaN;
    public index: number = NaN;

    constructor(index: number, x: number, y: number, vx: number, vy: number){
        MyLogger.log("View/Node constructor");


        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.index = index;
    }


    public setX(x:number){
        this.x = x;
    }

    public setY(y:number){
        this.y = y;
    }

    public setIndex(index:number){
        this.index = index;
    }

    public getX(){
        return(this.x);
    }

    public getY(){
        return(this.y);
    }

    public getIndex(){
        return(this.index);
    }



}