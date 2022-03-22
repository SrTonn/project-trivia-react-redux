import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../components/Button/Button';
import getGravatarPicture from '../services/getGravatarPicture';

export default class Ranking extends Component {
  handleClick = () => {
    const { history: { push } } = this.props;
    push('/');
  }

  render() {
    const storage = JSON.parse(localStorage.getItem('ranking'));
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        {storage && storage.map((player, index) => (
          <div key={ index }>
            <img
              src={ getGravatarPicture(player.gravatarEmail) }
              alt="Imagem do Gravatar"
            />
            <p data-testid={ `player-name-${index}` }>
              {player.name}
            </p>
            <p data-testid={ `player-score-${index}` }>
              {player.score}
            </p>
          </div>
        ))}
        <Button
          dataTestId="btn-go-home"
          label="Go home"
          onClick={ this.handleClick }
        />
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
