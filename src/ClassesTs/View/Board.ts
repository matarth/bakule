/**
 * Created by mata on 7.12.16.
 */
import MyLogger from '../Logger';
import MapNode from '../Model/MapNode';
import Node from './Node';
import Link from './Link';


export default class Board {

    private d3:any;
    private HTMLnode:any;
    private nodeSet:Set<Node> = new Set();
    private linkSet:Set<Link> = new Set();
    private width:number = 960;
    private height:number = 720;


    private nodeElement;
    private linkElement;
    private simulation;

    private nodeArray;
    private linkArray;

    constructor(d3:any, node:any) {

        MyLogger.log("Board Constructor");

        this.d3 = d3;
        this.HTMLnode = node;

        var n1, n2, n3:Node;

        n1 = new Node(0, 100, 100, 0, 0);
        n2 = new Node(1, 200, 200, 0, 0);
        n3 = new Node(2, 300, 300, 0, 0);
        this.nodeSet.add(n1);
        this.nodeSet.add(n2);
        this.nodeSet.add(n3);

        this.linkSet.add(new Link(n1, n2));
        this.linkSet.add(new Link(n1, n3));


        this.drawByApi();
    }

    private drawByApi() {


        this.nodeArray = [
            {"index": 1, "name": "server 1", "fx": 200, "fy": 200},
            {"index": 2, "name": "server 2"},
            // {"index": 3, "name": "server 3"},
            // {"index": 4, "name": "server 4"},
            // {"index": 5, "name": "server 5"},
            // {"index": 6, "name": "server 6"},
            // {"index": 7, "name": "server 7"},
            // {"index": 8, "name": "server 8"},
            // {"index": 9, "name": "server 9"}
        ];

        this.linkArray = [
            //{source: 1, target: 2},
            // {source: 1, target: 3},
            // {source: 1, target: 4},
            // {source: 2, target: 5},
            // {source: 2, target: 6},
            // {source: 3, target: 7},
            // {source: 5, target: 8},
            // {source: 6, target: 8},
        ];

        // var nodeArray = [
        //     {"id": 1, "name": "server 1", "x": 10, "y": 10},
        //     {"id": 2, "name": "server 2", "x": 10, "y": 20},
        //     {"id": 3, "name": "server 3", "x": 10, "y": 30},
        //     {"id": 4, "name": "server 4", "x": 10, "y": 40},
        //     {"id": 5, "name": "server 5", "x": 10, "y": 50},
        //     {"id": 6, "name": "server 6", "x": 10, "y": 60},
        //     {"id": 7, "name": "server 7", "x": 10, "y": 70},
        //     {"id": 8, "name": "server 8", "x": 10, "y": 80},
        //     {"id": 9, "name": "server 9", "x": 10, "y": 90}
        // ]

        var svg = this.d3.select(this.HTMLnode).append("svg")
            .attr('width', this.width)
            .attr('height', this.height);


        this.nodeElement = svg.selectAll(".node")
            .data(this.nodeArray);

        this.linkElement = svg.selectAll(".link")
            .data(this.linkArray);

        this.simulation = null;
        // .force("center", this.d3.forceCenter(this.width / 2, this.height / 2))


        this.update();
    }

    private update() {

        this.linkElement = this.linkElement.enter()
            .append("line")
            .attr("class", "link");

        this.nodeElement = this.nodeElement.enter()
            .append("g")
            .attr("class", "node");

        this.nodeElement.append("circle")
            .attr("r", 10);

        // this.nodeElement.attr("transform", function (d) {
        //     return ("translate(" + 150 + ", " + 150 + ")");
        // });


        if (this.simulation == null) {
            var that = this;
            this.simulation = this.d3.forceSimulation()
                .nodes(this.nodeArray)
                .force("link", this.d3.forceLink().id(d => d.index).links(this.linkArray))
                .force("charge", this.d3.forceManyBody())
                .force("center", this.d3.forceCenter(200, 200))
                .on("tick", function (that) {
                    that.ticked();
                }(that));
        }
    }



    private ticked() {


        this.nodeElement.attr("transform", function (d) {
            return ("translate(" + d.x + ", " + d.y + ")");
         });
        
    }


    private drawByExample() {
        var nodes = [
            {"id": 1, "name": "server 1"},
            {"id": 2, "name": "server 2"},
            {"id": 3, "name": "server 3"},
            {"id": 4, "name": "server 4"},
            {"id": 5, "name": "server 5"},
            {"id": 6, "name": "server 6"},
            {"id": 7, "name": "server 7"},
            {"id": 8, "name": "server 8"},
            {"id": 9, "name": "server 9"}
        ]

        var links = [
            {source: 1, target: 2},
            {source: 1, target: 3},
            {source: 1, target: 4},
            {source: 2, target: 5},
            {source: 2, target: 6},
            {source: 3, target: 7},
            {source: 5, target: 8},
            {source: 6, target: 9},
        ]

        var index = 10;
        var svg = this.d3.select(this.HTMLnode).append("svg"),
            width = 900,
            height = 700,
            node,
            link;

        svg.attr("width", width)
            .attr("height", height);

        var simulation = this.d3.forceSimulation()
            .force("link", this.d3.forceLink().id(function (d) {
                return d.id;
            }))
            .force("charge", this.d3.forceManyBody())
            .force("center", this.d3.forceCenter(width / 2, height / 2));

        update();
        function update() {
            link = svg.selectAll(".link")
                .data(links, function (d) {
                    return d.target.id;
                })

            link = link.enter()
                .append("line")
                .attr("class", "link");

            node = svg.selectAll(".node")
                .data(nodes, function (d) {
                    return d.id;
                })

            node = node.enter()
                .append("g")
                .attr("class", "node")
                .on("click", click)
                .attr("testAttribute", "update");

            node.append("circle")
                .attr("r", 2.5)

            node.append("title")
                .text(function (d) {
                    return d.id;
                });

            node.append("text")
                .attr("dy", 3)
                .text(function (d) {
                    return d.name;
                });

            simulation
                .nodes(nodes)
                .on("tick", ticked);

            simulation.force("link")
                .links(links);

            this.d3.select(node).attr("testAttribute", "node - end")
            MyLogger.log("node - end");
        }

        function click(d) {
            nodes.push({id: index, name: "server " + index});
            links.push({source: d.id, target: index});
            index++;
            update();
        }

        function ticked() {
            link
                .attr("x1", function (d) {
                    return d.source.x;
                })
                .attr("y1", function (d) {
                    return d.source.y;
                })
                .attr("x2", function (d) {
                    return d.target.x;
                })
                .attr("y2", function (d) {
                    return d.target.y;
                });

            node.exit().attr("testAttribute", "tick");
            MyLogger.log("ticked");
        }

        function dragstarted(d) {
            if (!this.d3.event.active) simulation.alphaTarget(0.3).restart()
        }

        function dragged(d) {
            d.fx = this.d3.event.x;
            d.fy = this.d3.event.y;
        }

        function dragended(d) {
            if (!this.d3.event.active) simulation.alphaTarget(0);
            d.fx = undefined;
            d.fy = undefined;
        }
    }

    private getNodeById(id:number) {
        var node:Node;

        for (node of this.nodeSet) {
            if (node.getIndex() == id) {
                return (node);
            }
        }
    }

}