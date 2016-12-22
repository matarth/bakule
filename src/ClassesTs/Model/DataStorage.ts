/**
 * Created by mata on 20.12.16.
 */
import MyLogger from '../Logger';
import Link from "./Link";
import Node from './Node';

export default class DataStorage {

    private linkSet: Set<Link> = null;
    private nodeSet: Set<Node> = null;

    constructor(){
        MyLogger.log("DataStorage - constructor");

        this.linkSet = new Set<Link>();
        this.nodeSet = new Set<Node>();
    }

    public addLink(link :Link){
        if(!this.isDuplicateLink((link))){
            this.linkSet.add(link);
        }
    }

    public addNode(node :Node) :Node{
        var duplicate :Node;

        duplicate = this.getDuplicateNode(node);

        if(duplicate != null){
            return(duplicate);
        }

        this.nodeSet.add(node);

        return(node);
    }

    public getNodeChildrenIdx(nodeIndex :number){
        var link :Link;
        var ret: number[];

        for(link of this.linkSet){
            if(link.getSourceNodeIndex() == nodeIndex){
                ret.push(link.getTargetNodeIndex());
            }
        }

        return(ret);
    }

    public getNode(nodeIndex :number){
        var node: Node;

        for(node of this.nodeSet){
            if(node.getIndex() == nodeIndex)
                return(node);
        }

        return(null);
    }

    private getDuplicateNode(suspect :Node) :Node{
        
        var node :Node;

        for(node of this.nodeSet){
            if(node.equals(suspect)){
                return(node);
            }
        }

        return(null);
        

    }

    private isDuplicateLink(link: Link){
        var iLink :Link;

        for(iLink of this.linkSet){
            if((iLink.getSourceNodeIndex() == link.getSourceNodeIndex()) && (iLink.getTargetNodeIndex() == link.getTargetNodeIndex())){
                return(true);
            }
        }

        return(false);
    }

    public getChildrenCount(index :number){
        var link :Link;
        var ret :number = 0;

        for(link of this.linkSet){
            if(link.getSourceNodeIndex() == index) {
                ret++
            }
        }

        return(ret);
    }

    public getNodes(){
        return(this.nodeSet);
    }

    public getLinks(){
        return(this.linkSet);
    }

    public empty(){
        //TODO
    }
}