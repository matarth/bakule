import DataReceiver from "../DataReceiver";
import Node from "../Model/Node";
import MyLogger from "../Logger";
import Board from "../View/Board";
import DataStorage from "../Model/DataStorage";
import Link from "../Model/Link";



var customNodes:any[] =[
    {"index": 0},
    {"index": 1},
    {"index": 2},
    {"index": 3},
    {"index": 4},
    {"index": 5},
    {"index": 6},
    {"index": 7},
    {"index": 8},
    {"index": 9},
    {"index": 10},
    {"index": 11},
    {"index": 12},
    {"index": 13},
    {"index": 14},
    {"index": 15},
    {"index": 16},
    {"index": 17},
    {"index": 18},
    {"index": 19},
    {"index": 20},
    {"index": 21},
    {"index": 22},
    {"index": 23},
    {"index": 24},
    {"index": 25},
    {"index": 26},
    {"index": 27},
    {"index": 28},
    {"index": 29},
    {"index": 30},
    {"index": 31},
    {"index": 32},
    {"index": 33},
    {"index": 34},
    {"index": 35},
    {"index": 36},
    {"index": 37},
    {"index": 38},
    {"index": 39},
]

var customLinks:any[] = [
    {"source": 0,  "target": 2, "distance": 70},
    {"source": 1,  "target": 2, "distance": 70},
    {"source": 3,  "target": 2, "distance": 70},
    {"source": 4,  "target": 2, "distance": 70},
    {"source": 5,  "target": 2, "distance": 70},
    {"source": 6,  "target": 10, "distance": 70},
    {"source": 7,  "target": 2, "distance": 70},
    {"source": 8,  "target": 2, "distance": 70},
    {"source": 9,  "target": 2, "distance": 70},
    {"source": 10, "target": 2, "distance": 70},
    {"source": 11, "target": 3, "distance": 70},
    {"source": 12, "target": 3, "distance": 70},
    {"source": 13, "target": 3, "distance": 70},
    {"source": 14, "target": 3, "distance": 70},
    {"source": 15, "target": 3, "distance": 70},
    {"source": 16, "target": 3, "distance": 70},
    {"source": 17, "target": 3, "distance": 70},
    {"source": 18, "target": 3, "distance": 70},
    {"source": 19, "target": 3, "distance": 70},
    {"source": 20, "target": 3, "distance": 70},
    {"source": 21, "target": 2, "distance": 70},
    {"source": 22, "target": 5, "distance": 70},
    {"source": 23, "target": 5, "distance": 70},
    {"source": 24, "target": 19, "distance": 70},
    {"source": 25, "target": 5, "distance": 70},
    {"source": 26, "target": 5, "distance": 70},
    {"source": 27, "target": 5, "distance": 70},
    {"source": 28, "target": 5, "distance": 70},
    {"source": 29, "target": 5, "distance": 70},
    {"source": 30, "target": 5, "distance": 70},
    {"source": 31, "target": 6, "distance": 70},
    {"source": 32, "target": 6, "distance": 70},
    {"source": 33, "target": 6, "distance": 70},
    {"source": 34, "target": 6, "distance": 70},
    {"source": 35, "target": 23, "distance": 70},
    {"source": 36, "target": 6, "distance": 70},
    {"source": 37, "target": 6, "distance": 70},
    {"source": 38, "target": 6, "distance": 70},
    {"source": 39, "target": 24, "distance": 70},
]


class Controller {

        private d3: Object;
        private node: Object;

        private dataReceiver: DataReceiver;
        private dataStorage: DataStorage;
        private board: Board;

        constructor(d3: any, node: any) {

            this.d3 = d3;
            this.node = node;

            MyLogger.log("Controller constructor");
            
            this.dataReceiver = new DataReceiver();
            this.dataStorage = this.dataReceiver.getDataStorage();

            this.board = new Board(this.d3, this.node, this.generateNodeArray(this.dataStorage.getNodes()), this.generateLinkArray(this.dataStorage.getLinks()));
            this.dataStorage.empty();
        }

    private generateNodeArray(nodeSet :Set<Node>){

        var node :Node;
        var ret:any[] = [];

        // // TODO fingovany data
        // var ii :number = 0;
        //
        // for(ii = 0; ii < 50; ii++){
        //     ret.push({"index": ii})
        // }
        //
        // if(true)
        //  return(ret);

        // TODO realny DATA


        for(node of nodeSet){

            // if(ii++ == 0){
            //     ret.push({"index": node.getIndex(), "x": 250, "y": 250});
            //     continue;
            // }

            //ret.push({"index": node.getIndex(), "x": Math.random()*600, "y": Math.random()*500});
            ret.push({"index": node.getIndex(), "newIndex": node.getIndex()}); // TODO zmenit zpatky.
        }

        return(customNodes);
    }

    private generateLinkArray(linkSet :Set<Link>){

        var link :Link;
        var ret:any[] = [];

        var sourceIdx, targetIdx, childCount: number;

        // // TODO fingovany data
        // var ii, random, random2 :number;
        //
        // for(ii = 0; ii < 60; ii++){
        //     random = Math.floor(Math.random()*50);
        //     random2 = Math.floor(Math.random()*50);
        //     ret.push({"source": random, "target": random2, "distance": Math.random()*300});
        // }
        //
        //  return(ret);

        // TODO realny DATA




        for(link of linkSet){

            sourceIdx = link.getSourceNodeIndex();
            targetIdx = link.getTargetNodeIndex();
            childCount = this.dataStorage.getChildrenCount(sourceIdx) + this.dataStorage.getChildrenCount(targetIdx);

            ret.push(({"source": link.getSourceNodeIndex(),
                       "target": link.getTargetNodeIndex(),
                       "distance": childCount,
            }));
        }

        return(customLinks);
    }

    public updateBoard(){
        this.board.tick();
    }
        
}

export = Controller;