import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../components/Button/Button';

export default class Ranking extends Component {
  handleClick = () => {
    const { history: { push } } = this.props;
    push('/');
  }

  render() {
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
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
