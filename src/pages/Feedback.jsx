import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header/Header';
import Button from '../components/Button/Button';

class Feedback extends Component {
  handleClick = ({ target: { name } }) => {
    const { history: { push } } = this.props;
    if (name === 'playAgain') push('/');
    if (name === 'Ranking') push('/ranking');
  }

  render() {
    const { assertions, score } = this.props;
    const NUMBER_THREE = 3;

    return (
      <>
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
        <Button
          dataTestId="btn-ranking"
          label="Ranking"
          name="Ranking"
          onClick={ (e) => this.handleClick(e) }
        />
        <Button
          dataTestId="btn-play-again"
          label="Play Again"
          name="playAgain"
          onClick={ (e) => this.handleClick(e) }
        />
      </>
    );
  }
}

const mapStateToProps = ({ player }) => ({
  ...player,
});

export default connect(mapStateToProps)(Feedback);

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
