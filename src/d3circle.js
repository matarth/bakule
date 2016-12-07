var d3 = require('d3');
import Controller from "./ClassesJs/Controller/Controller";

var node = document.createElement('div');
var controller = new Controller(d3, node);



// var svg = d3.select(node).append("svg")
//     .attr("width", 500)
//     .attr("height", 500);
// var width = 100,
//     height = 100;
//
// var createCircle = function(x, y, r){
//     //var svg = d3.select(node).a}ppend("svg")
//
//     svg.append("circle")
//         .attr("cx", x)
//         .attr("cy", y)
//         .attr("r", r)
//         .attr("fill", "red");
//
// }
//
// var alpha = 0;
// var step = (Math.PI*2)/10;
// var ii = 0;
// for(ii = 0; ii < 10; ii++){
//
//     var x = Math.cos(alpha);
//     var y = Math.sin(alpha);
//
//     createCircle(50 + 30*x,50 + 30*y,5);
//     alpha += step;
// }
//
//


module.exports = node;