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
        onClick={ (e) => onClick(e) }
        name={ name }
        className={ className }
      >
        {label}
      </button>
    );
  }
}

Button.defaultProps = {
  className: '',
  dataTestId: '',
  disabled: false,
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  dataTestId: PropTypes.string,
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
};
