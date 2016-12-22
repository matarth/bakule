import React, {Component} from 'react';
import logo from './logo.svg';
import node from './d3circle';
import './App.css';
var rd3 = require('react-d3-library');

const RD3Component = rd3.Component;

class D3Div extends React.Component{

    constructor(props){
        super(props);
        this.state={d3: ''};
    }

    componentDidMount(){
        this.setState({d3: node['node']});

        this.timer = setInterval(function(d){
            console.log("React timer");
            this.setState({d3: node['updateFunction']()});
        }.bind(this), 1);
    }

    componentWillUnmount(){
       clearInterval(this.timer);
    }

    tick(){
        var xyz = node['updateFunction']();

        this.setState({d3: xyz});
    }

    render(){

        return(
                <RD3Component data={this.state.d3} />
        );
    }

    checkNode(){

        console.log("checkNode START -----------");

        console.log("checkNode STOP -----------");


    }
}

class App extends Component {


    render() {

        console.log("REACT APP render() started");


        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h2>Matova bakule</h2>
                </div>
                <p className="App-intro">
                    To get startded, edit <code>src/App.js</code> and save to reload.
                </p>
                <D3Div />
            </div>
        );

        console.log("REACT APP render() ended");

    }



}

export default App;
