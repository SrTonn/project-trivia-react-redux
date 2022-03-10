import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Form from '../components/Form/Form';
import logo from '../trivia.png';

class Home extends Component {
  handleClick = () => {
    const { history: { push } } = this.props;
    push('/settings');
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <button
            type="button"
            data-testid="btn-settings"
            onClick={ this.handleClick }
          >
            Configurações
          </button>
          <img src={ logo } className="App-logo" alt="logo" />
          <Form { ...this.props } />
        </header>
      </div>
    );
  }
}
export default Home;

Home.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
