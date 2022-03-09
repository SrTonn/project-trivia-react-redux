import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Input from '../Input/Input';

class Form extends Component {
  state = {
    emailInput: '',
    textInput: '',
    isDisabled: true,
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState(() => ({
      [name]: value,
    }), this.checkConditions);
  }

  checkConditions = () => {
    const { emailInput, textInput } = this.state;
    const conditions = [
      /^\w+@[a-z]+\.[a-z]{2,3}$/i.test(emailInput),
      !!textInput,
    ];

    this.setState({
      isDisabled: conditions.includes(false),
    });
  }

  render() {
    const { emailInput, textInput, isDisabled } = this.state;

    return (
      <form>
        <Input
          id="email"
          type="email"
          label="E-mail"
          name="emailInput"
          value={ emailInput }
          handleChange={ this.handleChange }
          onKeyPress={ this.handleClick }
          dataTestId="input-gravatar-email"
        />
        <Input
          id="text"
          type="text"
          label="Nome"
          name="textInput"
          value={ textInput }
          handleChange={ this.handleChange }
          onKeyPress={ this.handleClick }
          dataTestId="input-player-name"
        />
        <button
          type="submit"
          data-testid="btn-play"
          disabled={ isDisabled }
        >
          Jogar
        </button>
      </form>
    );
  }
}

export default connect(null)(Form);

Form.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
