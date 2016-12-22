"use strict";
/**
 * Created by mata on 4.12.16.
 */
const Logger_1 = require("./Logger");
const DataStorage_1 = require('./Model/DataStorage');
const Link_1 = require("./Model/Link");
const NodeFactory_1 = require("./Factories/NodeFactory");
class DataReceiver {
    constructor() {
        this.nodeSet = new Set();
        Logger_1.default.log("DataReceiver constructor");
        this.dataStorage = new DataStorage_1.default();
        this.getData();
        this.populateDataStorage();
    }
    getData() {
        var json = require('../../data/mongo_export.json');
        var data = JSON.parse(JSON.stringify(json));
        this.data = data;
    }
    populateDataStorage() {
        var ii = 1;
        Logger_1.default.logAllProperties(this.data);
        for (ii = 1; ii <= 3; ii++) {
            this.jsonToNode(this.data["node" + ii]); //TODO jinej nazev
        }
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
        var node;
        var source;
        var uri;
        var id;
        var ii, jj, nodeId;
        //MyLogger.log(this.validateNode(data).toString());
        Logger_1.default.log(data['uri']);
        Logger_1.default.log(data['_id']['$oid']);
        Logger_1.default.log(data['forms'][0]['action']);
        Logger_1.default.log(data['linkGroups'][0]['links'][0]['location']);
        Logger_1.default.log(data['linkGroups'][0]['links'][1]['location']);
        Logger_1.default.log(data['linkGroups'].length);
        Logger_1.default.logAllPropertyNames(data['linkGroups'][0]['links'][0]);
        uri = data['uri'];
        id = data['_id']['$oid'];
        source = NodeFactory_1.default.createNode(id, uri);
        this.dataStorage.addNode(source);
        nodeId = id;
        for (ii = 0; ii < data['linkGroups'].length; ii++) {
            for (jj = 0; jj < data['linkGroups'][ii]['links'].length; jj++) {
                node = NodeFactory_1.default.createNode(++nodeId, data['linkGroups'][ii]['links'][jj]['location']);
                node = this.dataStorage.addNode(node);
                this.dataStorage.addLink(new Link_1.default(source, node));
            }
        }
    }
    getNodeById(id) {
        // TODO
    }
    getDataStorage() {
        return (this.dataStorage);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DataReceiver;
