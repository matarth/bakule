/**
 * Created by mata on 28.11.16.
 */

function Board(uzly){
    this.nodes = new Set();

    this.generateHtmlNodes = function(){
        this.nodes.forEach(function(key){
            alert(key);
        });
    };

    this.addNode = function(node){
        this.nodes.add(node);
    }

};

module.exports= Board;