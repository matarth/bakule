import DataReceiver from "../DataReceiver";
import MapNode from "../Model/MapNode";
import MyLogger from "../Logger";
import Board from "../View/Board";

class Controller {

        private d3: Object;
        private node: Object;

        constructor(d3: any, node: any) {

            this.d3 = d3;
            this.node = node;

            MyLogger.log("Controller constructor");
            
            var dr = new DataReceiver();
            var mp: MapNode = dr.getRootNode();
            var board: Board = new Board(d3, node);



            
        }
}

export = Controller;