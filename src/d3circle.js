var d3 = require('d3');
var node = document.createElement('div');

var width = 100,
    height = 100;

var svg = d3.select(node).append("svg")
    .attr("width", width)
    .attr("height", height);

svg.append("rect")
    .attr("x", 35)
    .attr("y", 20)
    .attr("height", 100)
    .attr("width", 100);

module.exports = node;

/*
import d3 from 'd3';
var node = document.createElement('p');

d3.select('App').append('p').text("Halo!")

var width = 960,
    height = 500;

module.exports = node
*/