import React, { Component } from 'react';

//class component
export default class FirstComponent extends Component {
    render() {
        return (
            <div className="FirstComponent">
                My First Component.
            </div>
        );
    }
}


export class FirstSubComponent extends Component {
    render() {
        return (
            <div className="FirstSubComponent">
                My First Sub Component.
            </div>
        );
    }
}