import React, { Component } from 'react';
import Form from '../components/Form/Form';
import logo from '../trivia.png';

export default class Home extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <Form { ...this.props } />
        </header>
      </div>
    );
  }
}
