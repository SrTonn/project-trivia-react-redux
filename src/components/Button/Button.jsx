import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class Button extends Component {
  render() {
    const { label, onClick, disabled, dataTestId, name } = this.props;
    return (
      <button
        type="button"
        data-testid={ dataTestId }
        disabled={ disabled }
        onClick={ onClick }
        name={ name }
      >
        {label}
      </button>
    );
  }
}
