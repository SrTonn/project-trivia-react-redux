import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header/Header';

class Game extends Component {
  render() {
    return (
      <Header />
    );
  }
}

const mapStateToProps = ({ reducerToken, reducerPlayer }) => ({
  ...reducerToken,
  ...reducerPlayer,
});

export default connect(mapStateToProps)(Game);
