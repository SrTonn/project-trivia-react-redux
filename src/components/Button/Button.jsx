import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class Button extends Component {
  render() {
    const { label, onClick, disabled, dataTestId, name, className } = this.props;
    return (
      <button
        type="button"
        data-testid={ dataTestId }
        disabled={ disabled }
        onClick={ onClick }
        name={ name }
        className={ className }
      >
        {label}
      </button>
    );
  }
}

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.string.isRequired,
  dataTestId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};
