import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class Input extends Component {
  render() {
    const {
      label,
      id,
      type,
      name,
      value,
      handleChange,
      className,
      dataTestId,
      onKeyPress,
    } = this.props;
    return (
      <label htmlFor={ id }>
        {`${label}:`}
        <input
          id={ id }
          type={ type }
          value={ value }
          name={ name }
          onChange={ handleChange }
          className={ className }
          data-testid={ dataTestId }
          onKeyPress={ (e) => e.key === 'Enter' && onKeyPress() }
        />
      </label>
    );
  }
}
Input.defaultProps = {
  className: '',
};

Input.propTypes = {
  handleChange: PropTypes.func.isRequired,
  onKeyPress: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  dataTestId: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
};
