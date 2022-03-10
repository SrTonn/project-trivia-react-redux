import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Input from '../Input/Input';
import getToken from '../../services/getToken';
import updateData, { PLAYER_INFOS, UPDATE_TOKEN } from '../../redux/action';
import Button from '../Button/Button';

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
      /^[a-z._]+@[a-z]+\.[a-z]{2,3}$/i.test(emailInput),
      !!textInput,
    ];

    this.setState({
      isDisabled: conditions.includes(false),
    });
  }

  handleClick = async () => {
    const { history: { push }, dispatch } = this.props;
    const { token } = await getToken();
    const { emailInput, textInput } = this.state;
    localStorage.setItem('token', token);
    dispatch(updateData(UPDATE_TOKEN, token));
    dispatch(updateData(PLAYER_INFOS, {
      name: textInput,
      gravatarEmail: emailInput,
    }));
    push('/game');
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
        <Button
          dataTestId="btn-play"
          disabled={ isDisabled }
          onClick={ this.handleClick }
          label="Jogar"
        />
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  textInput: state.player,
  emailInput: state.gravatarEmail,
  score: state.score,
});

export default connect(mapStateToProps)(Form);

Form.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
