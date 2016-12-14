/**
 * Created by mata on 11.12.16.
 */
import MyLogger from '../Logger';
import Node from './Node';


export default class Link{

    public source: number;
    public target: number;


    constructor(source: Node, target: Node){
        MyLogger.log("View/Link constructor");

        this.source = source.getIndex();
        this.target = target.getIndex();

    }

    public setSourceNodeIndex(sourceId: number){
        this.source = sourceId;
    }

    public setTargetNodeIndex(targetId: number){
        this.target = targetId;
    }

    public getSourceNodeIndex(){
        return(this.source);
    }

    public getTargetNodeIndex(){
        return(this.target);
    }

}