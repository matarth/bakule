/**
 * Created by mata on 11.12.16.
 */
import MyLogger from '../Logger';


export default class Node {

    private index :number = NaN;

    private uri:string;

    constructor(index: number, uri :string) {
        MyLogger.log("View/Node constructor");

        this.uri = uri;
        this.index = index;

    }

    /*
        returns the index of this node
     */
    public getIndex() {
        return (this.index);
    }

    public equals(node: Node) :boolean{

        var ret :boolean = false;

        if(this.index == node.index){
            ret = true;
        }

        return(ret);
    }
}