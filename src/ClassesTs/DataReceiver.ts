/**
 * Created by mata on 4.12.16.
 */
import MyLogger from "./Logger";
import Node from "./Model/Node";
import DataStorage from './Model/DataStorage';
import Link from "./Model/Link";
import NodeFactory from "./Factories/NodeFactory";

    export default class DataReceiver {

        private data: Object;
        private nodeSet: Set<Node> = new Set<Node>();

        private dataStorage: DataStorage;

        constructor() {
            MyLogger.log("DataReceiver constructor");

            this.dataStorage = new DataStorage();
            this.getData();
            this.populateDataStorage();
        }

        private getData(){
            var json = require('../../data/mongo_export.json');
            var data = JSON.parse(JSON.stringify(json));

            this.data = data;
        }

        private populateDataStorage(){
            var ii :number = 1;

            MyLogger.logAllProperties(this.data);


            for(ii = 1; ii <= 3; ii++) {
                this.jsonToNode(this.data["node" + ii]); //TODO jinej nazev
            }
        }



        private validateNode(node: any){

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

        private jsonToNode(data: any){

            var node :Node;
            var source :Node;
            var uri: string;
            var id: number;
            var ii, jj, nodeId:number;


            //MyLogger.log(this.validateNode(data).toString());
            MyLogger.log(data['uri']);
            MyLogger.log(data['_id']['$oid']);
            MyLogger.log(data['forms'][0]['action']);
            MyLogger.log(data['linkGroups'][0]['links'][0]['location']);
            MyLogger.log(data['linkGroups'][0]['links'][1]['location']);
            MyLogger.log(data['linkGroups'].length);
            MyLogger.logAllPropertyNames(data['linkGroups'][0]['links'][0]);

            uri = data['uri'];
            id = data['_id']['$oid'];

            source = NodeFactory.createNode(id, uri);

            this.dataStorage.addNode(source);

            nodeId = id;

            for(ii = 0; ii < data['linkGroups'].length; ii++){
                for(jj = 0; jj < data['linkGroups'][ii]['links'].length; jj++) {
                    node = NodeFactory.createNode(++nodeId,data['linkGroups'][ii]['links'][jj]['location']);
                    node = this.dataStorage.addNode(node);
                    this.dataStorage.addLink(new Link(source, node));
                }
            }

        }
        getNodeById(id: number){
            // TODO
        }

        public getDataStorage(){
            return(this.dataStorage);
        }
    }

