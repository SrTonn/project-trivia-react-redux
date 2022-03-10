import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getGravatarPicture from '../../services/getGravatarPicture';

class Header extends Component {
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
  score: PropTypes.string.isRequired,
};

const mapStateToProps = ({ reducerPlayer }) => ({
  ...reducerPlayer.player,
});

export default connect(mapStateToProps)(Header);
