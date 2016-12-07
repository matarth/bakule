/**
 * Created by mata on 4.12.16.
 */
import MyLogger from "./Logger";
import MapNode from "./Model/MapNode";

    export default class DataReceiver {

        data: Object;
        rootNode: MapNode = new MapNode();
        
        constructor() {
            MyLogger.log("DataReceiver constructor");

            var json = require('../../data/node.json');

            var data = JSON.parse(JSON.stringify(json));

            
            this.data = data;
            this.jsonToNode(data);
        }


        public getData(){
            return(this.data);
        }

        public getRootNode(){
            return(this.rootNode);
        }

        validateNode(node: any){

            var ret: boolean = true;

            if(!node.hasOwnProperty("forms"))
                ret = false;

            if(!node.hasOwnProperty("_id")){
                ret = false;
            }
            else{
                if(!node['_id'].hasOwnProperty("$oid")) {
                    ret = false;
                }
            }


            if(!node._id.hasOwnProperty("$oid"))
                ret = false;

            return(ret);

        }

        jsonToNode(data: any){
            MyLogger.log(this.validateNode(data).toString());
            MyLogger.log(data['uri']);
            MyLogger.log(data['_id']['$oid']);
            MyLogger.log(data['forms'][0]['action']);
            MyLogger.log(data['linkGroups'][0]['links'][0]['location']);
            MyLogger.log(data['linkGroups'][0]['links'][1]['location']);

            this.rootNode['url'] = data['uri'];

            var childNode1: MapNode = new MapNode();
            childNode1['url'] = data['forms'][0]['action'];


            var childNode2: MapNode = new MapNode();
            childNode2['url'] = data['linkGroups'][0]['links'][0]['location'];

            var childNode3: MapNode = new MapNode();
            childNode3['url'] = data['linkGroups'][0]['links'][1]['location'];
            

            this.rootNode.addChild(childNode1);
            this.rootNode.addChild(childNode2);
            this.rootNode.addChild(childNode3);

            this.printNodeStructure(data['forms'][0]);


        }

        private printNodeStructure(data: any){
            var ii: number = 0;

            for(var item in data){
                MyLogger.log(ii++ + " - " + item);
            }
        }
        
        getNodeById(id: number){
            // TODO
        }
    }
