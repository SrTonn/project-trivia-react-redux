import React, { Component } from 'react';
import Header from '../components/Header/Header';

export default class Settings extends Component {
  render() {
    return (
      <div>
        <Header />
        <p data-testid="feedback-text">...</p>
      </div>
    );
  }
}
