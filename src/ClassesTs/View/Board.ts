/**
 * Created by mata on 7.12.16.
 */
import MyLogger from '../Logger';


export default class Board{

    private d3: any;
    private node: any;

    constructor(d3: any, node: any) {

        MyLogger.log("Board Constructor");

        this.d3 = d3;
        this.node = node;

        this.drawCircle();

    }

    private drawCircle(){

        var svg = this.d3.select(this.node).append("svg")
            .attr("width", 500)
            .attr("height", 500);

        svg.append("circle")
            .attr("cx", 20)
            .attr("cy", 20)
            .attr("r", 20)
            .attr("fill", "red");
    }

}