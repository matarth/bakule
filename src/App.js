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
        this.setState({d3: node});
    }

    render(){
        return(
                <RD3Component data={this.state.d3} />
        );
    }
}

class App extends Component {


    render() {
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
    }


}

export default App;
