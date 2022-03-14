import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header/Header';

class Settings extends Component {
  render() {
    const { assertions, score } = this.props;
    const NUMBER_THREE = 3;

    return (
      <div>
        <Header />
        <h2 data-testid="feedback-text">
          {assertions < NUMBER_THREE ? 'Could be better...' : 'Well Done!'}
        </h2>
        <p>
          Você acertou
          {' '}
          <span data-testid="feedback-total-question">{assertions}</span>
          {' '}
          questões
        </p>
        <p>
          Um total de
          {' '}
          <span data-testid="feedback-total-score">{score}</span>
          {' '}
          pontos
        </p>
      </div>
    );
  }
}

const mapStateToProps = ({ player }) => ({
  ...player,
});

export default connect(mapStateToProps)(Settings);

Settings.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};
