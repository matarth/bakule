/**
 * Created by mata on 7.12.16.
 */
import MyLogger from '../Logger';
import MapNode from '../Model/MapNode';
import Node from '../Model/Node';
import Link from '../Model/Link';
import DataStorage from "../Model/DataStorage";


export default class Board {

    private d3:any;
    private HTMLnode:any;
    private width:number = 800;
    private height:number = 500;
    private nodeRadius = 5;

    private nodeElement;
    private linkElement;
    private simulation;

    private nodeArray;
    private linkArray;


    constructor(d3:any, node:any, nodeArray:any, linkArray:any) {

        MyLogger.log("Board Constructor");

        this.d3 = d3;
        this.HTMLnode = node;

        this.nodeArray = nodeArray;
        this.linkArray = linkArray;



        // var n0 = new Node(0);
        // var n1 = new Node(1);
        // var n2 = new Node(2);
        // var n3 = new Node(3);
        // var n4 = new Node(4);
        // var n5 = new Node(5);
        // var n6 = new Node(6);
        // var n7 = new Node(7);
        // var n8 = new Node(8);
        //
        // this.nodeSet.add(n0);
        // this.nodeSet.add(n1);
        // this.nodeSet.add(n2);
        // this.nodeSet.add(n3);
        // this.nodeSet.add(n4);
        // this.nodeSet.add(n5);
        // this.nodeSet.add(n6);
        // this.nodeSet.add(n7);
        // this.nodeSet.add(n8);
        //
        // n1.addChild(n2);
        // n1.addChild(n4);
        // n2.addChild(n5);
        // n2.addChild(n3);
        // n2.addChild(n6);
        // n6.addChild(n7);

        this.drawByApi();
    }

    private drawByApi() {

        // this.nodeArray = [
        //     {"index": 1, "name": "server 1"},
        //     {"index": 2, "name": "server 2"},
        //     {"index": 3, "name": "server 3"},
        //     {"index": 4, "name": "server 4"},
        //     {"index": 5, "name": "server 5"},
        //     {"index": 6, "name": "server 6"},
        //     {"index": 7, "name": "server 7"},
        //     {"index": 8, "name": "server 8"},
        //     {"index": 9, "name": "server 9"}
        // ];
        //
        // this.linkArray = [
        //     {source: 1, target: 2},
        //     {source: 1, target: 3},
        //     {source: 1, target: 4},
        //     {source: 2, target: 5},
        //     {source: 2, target: 6},
        //     {source: 3, target: 7},
        //     {source: 5, target: 8},
        //     {source: 6, target: 8},
        // ];

        var svg = this.d3.select(this.HTMLnode).append("svg")
            .attr('width', this.width)
            .attr('height', this.height);


        this.nodeElement = svg.selectAll(".node")
            .data(this.nodeArray);

        this.linkElement = svg.selectAll(".link")
            .data(this.linkArray);

        this.simulation = null;
        // .force("center", this.d3.forceCenter(this.width / 2, this.height / 2))
//      return arguments.length > 1 ? ((_ == null ? forces.remove(name) : forces.set(name, initializeForce(_))), simulation) : forces.get(name);


        this.update();
    }

    private update() {

        MyLogger.log("update");

        this.linkElement = this.linkElement.enter()
            .append("line")
            .attr("class", "link");


        this.nodeElement = this.nodeElement.enter()
            .append("g");

        this.nodeElement.append("circle")
            .attr("r", this.nodeRadius)


        // this.nodeElement.attr("transform", function (d) {
        //     return ("translate(" + 150 + ", " + 150 + ")");
        // });

        this.nodeElement.on("click", this.ticked.bind(this));

        if (this.simulation == null) {
            var that = this;

            this.simulation = this.d3.forceSimulation()
                .nodes(this.nodeArray)
                .force("charge", this.d3.forceManyBody())
                .force("center", this.d3.forceCenter(this.width/2, this.height/2))
                .force("border", this.borderForce.bind(this))
                .force("link", this.d3.forceLink().id(function (d) {
                    return (d.index);
                }).links(this.linkArray).distance(function(d){
                    return(70);
                }))
                .on("tick", this.ticked.bind(this));

            this.simulation.stop();
            this.simulation.tick();
        }


        var alpha:number = 1;
        this.nodeElement
            .attr("class", "node")
            .attr("transform", function (d) {
                return ("translate(" + alpha * d.x + ", " + alpha * d.y + ")");
            });

        this.linkElement
            .attr("x1", function (d, i) {
                return (alpha * d.source.x);
            })
            .attr("y1", function (d, i) {
                return (alpha * d.source.y);
            })
            .attr("x2", function (d, i) {
                return (alpha * d.target.x);
            })
            .attr("y2", function (d, i) {
                return (alpha * d.target.y);
            })
            .attr("style", function (d, i) {
                return ("stroke:rgb(255,0,0);stroke-width:2");
            });
    }


    private borderForce(alpha) {
        this.nodeArray.forEach(function (d) {
            if (d.x > this.width - this.nodeRadius) {
                d.x = this.width - this.nodeRadius;
                d.vx *= -1;
            }

            if (d.x < this.nodeRadius) {
                d.x = this.nodeRadius;
                d.vx *= -1;
            }


            if (d.y > this.height - this.nodeRadius) {
                d.y = this.height - this.nodeRadius;
                d.vy *= -1;
            }

            if (d.y < this.nodeRadius) {
                d.y = this.nodeRadius;
                d.vy *= -1;
            }
        }.bind(this));
    }


    private ticked() {
        MyLogger.log("ticked");

        this.nodeElement.attr("transform", function (d) {
            return ("translate(" + (d.x) + ", " + (d.y) + ")");
        })
            .enter();

        this.linkElement
            .attr("x1", function (d, i) {
                return (d.source.x);
            })
            .attr("y1", function (d, i) {
                return (d.source.y);
            })
            .attr("x2", function (d, i) {
                return (d.target.x);
            })
            .attr("y2", function (d, i) {
                return (d.target.y);
            })
            .attr("style", function (d, i) {
                return ("stroke:rgb(255,0,0);stroke-width:2");
            });


        MyLogger.log(this.nodeElement.attr("transform"));

    }

    public tick() {
        this.simulation.tick();
        this.ticked();
    }

}