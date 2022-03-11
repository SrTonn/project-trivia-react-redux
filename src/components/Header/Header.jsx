import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getGravatarPicture from '../../services/getGravatarPicture';

class Header extends Component {
  componentDidMount = () => {
    const { name, score, gravatarEmail } = this.props;
    console.log('componentDidMount -> HEADER');
    console.log('gravatarEmail=>', gravatarEmail);
    const oldStorage = JSON.parse(localStorage.getItem('ranking'));
    const hasEmail = oldStorage.some(({ email }) => email === gravatarEmail);
    console.log('oldStorage=>', oldStorage);
    console.log('hasEmail=>', hasEmail);
  }

  componentDidUpdate = () => {
    const { name, score, gravatarEmail } = this.props;
    console.log('componentDidUpdate -> HEADER');
    // [
    //   { name: nome-da-pessoa, score: 10, picture: url-da-foto-no-gravatar }
    // ]
    const newStorage = {
      name,
      score,
      picture: gravatarEmail,
    };
  }

  render() {
    const {
      gravatarEmail,
      name,
      score,
    } = this.props;

    return (
      <header>
        <img
          src={ getGravatarPicture(gravatarEmail) }
          data-testid="header-profile-picture"
          alt="Imagem do Gravatar"
        />
        <h3
          data-testid="header-player-name"
        >
          Nome:
          { name }
        </h3>
        <h3
          data-testid="header-score"
        >
          Pontos:
          { score }
        </h3>
      </header>
    );
  }
}

Header.propTypes = {
  gravatarEmail: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = ({ reducerPlayer }) => ({
  ...reducerPlayer.player,
});

export default connect(mapStateToProps)(Header);
