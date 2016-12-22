/**
 * Created by mata on 11.12.16.
 */
import MyLogger from '../Logger';
import Node from './Node';


export default class Link{

    private source: number;
    private target: number;

    private linkData: any;


    constructor(source: Node, target: Node){
        MyLogger.log("View/Link constructor");

        this.source = source.getIndex();
        this.target = target.getIndex();

    }

    public setLinkData(type :LinkTypeEnum, linkGroupNumber :number){
        if(linkGroupNumber != null){
            this.linkData = {"type": type, "linkGroup": linkGroupNumber};
        }
        else{
            this.linkData = {"type": type, "linkGroup": -1};
        }
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