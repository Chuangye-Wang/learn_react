import React, { Component } from 'react';
// Note {} is required to wrap the imported class if they are not default.
// And {} is not needed for the default class
import FirstComponent, { FirstSubComponent } from './components/learning_examples/FirstComponent'
import SecondComponent from './components/learning_examples/SecondComponent'
import ThirdComponent from './components/learning_examples/ThirdComponent'
// import logo from './logo.svg';
import './App.css';
import TaskManager from "./components/learning_examples/TaskManager";

class App extends Component {
    render() {
        return (
            <div className="App">
            My Hello World!
            <FirstComponent></FirstComponent>
            <FirstSubComponent></FirstSubComponent>
            <SecondComponent></SecondComponent>
            <ThirdComponent></ThirdComponent>
            <TaskManager></TaskManager>
            </div>
        );
    }
}

export default App;
