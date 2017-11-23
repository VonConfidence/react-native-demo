import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    componentDidMount() {
        var myFetchOptions = {
            method: 'GET'
        }
        var url = 'http://localhost:8080/goods?page=1&pageSize=8&sort=1&priceLevel=all';
        console.log(url)
        fetch(url, myFetchOptions).then(response => response.json()).then(json => {
            console.log(json.data);
        })
    }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
