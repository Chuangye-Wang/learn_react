import React, { Component } from 'react';
// Note {} is required to wrap the imported class if they are not default.
// And {} is not needed for the default class
// import logo from './logo.svg';
import './App.css';
import TaskManager from "./components/learning_examples/TaskManager";

class App extends Component {
    render() {
        return (
            <div className="App">
            <TaskManager></TaskManager>
            </div>
        );
    }
}

export default App;
