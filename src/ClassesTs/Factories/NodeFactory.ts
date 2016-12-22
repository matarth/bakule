/**
 * Created by mata on 20.12.16.
 */
import MyLogger from "../Logger";
import Node from "../Model/Node";

export default class NodeFactory{


    private static nodeCount = 0;

    constructor(){
        MyLogger.log("NodeFactory constructor");
    }

    public static createNode(index: number, uri: string) :Node{
        //return(new Node(++this.nodeCount, index, uri));
        return(new Node(this.nodeCount++, uri));

    }


    /*
     http://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
     */
    private static hash(string :string) :number{
        var hash :number = 0;
        var ii :number;

        if (string.length == 0) return hash;
        for (ii = 0; ii < string.length; ii++) {
            var char = string.charCodeAt(ii);
            hash = ((hash<<5)-hash)+char;
        }
        return hash;

    }

}