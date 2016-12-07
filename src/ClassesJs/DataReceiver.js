"use strict";
/**
 * Created by mata on 4.12.16.
 */
const Logger_1 = require("./Logger");
const MapNode_1 = require("./Model/MapNode");
class DataReceiver {
    constructor() {
        this.rootNode = new MapNode_1.default();
        Logger_1.default.log("DataReceiver constructor");
        var json = require('../../data/node.json');
        var data = JSON.parse(JSON.stringify(json));
        this.data = data;
        this.jsonToNode(data);
    }
    getData() {
        return (this.data);
    }
    getRootNode() {
        return (this.rootNode);
    }
    validateNode(node) {
        var ret = true;
        if (!node.hasOwnProperty("forms"))
            ret = false;
        if (!node.hasOwnProperty("_id")) {
            ret = false;
        }
        else {
            if (!node['_id'].hasOwnProperty("$oid")) {
                ret = false;
            }
        }
        if (!node._id.hasOwnProperty("$oid"))
            ret = false;
        return (ret);
    }
    jsonToNode(data) {
        Logger_1.default.log(this.validateNode(data).toString());
        Logger_1.default.log(data['uri']);
        Logger_1.default.log(data['_id']['$oid']);
        Logger_1.default.log(data['forms'][0]['action']);
        Logger_1.default.log(data['linkGroups'][0]['links'][0]['location']);
        Logger_1.default.log(data['linkGroups'][0]['links'][1]['location']);
        this.rootNode['url'] = data['uri'];
        var childNode1 = new MapNode_1.default();
        childNode1['url'] = data['forms'][0]['action'];
        var childNode2 = new MapNode_1.default();
        childNode2['url'] = data['linkGroups'][0]['links'][0]['location'];
        var childNode3 = new MapNode_1.default();
        childNode3['url'] = data['linkGroups'][0]['links'][1]['location'];
        this.rootNode.addChild(childNode1);
        this.rootNode.addChild(childNode2);
        this.rootNode.addChild(childNode3);
        this.printNodeStructure(data['forms'][0]);
    }
    printNodeStructure(data) {
        var ii = 0;
        for (var item in data) {
            Logger_1.default.log(ii++ + " - " + item);
        }
    }
    getNodeById(id) {
        // TODO
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DataReceiver;
