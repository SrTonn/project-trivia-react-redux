import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getGravatarPicture from '../../services/getGravatarPicture';
import styles from './styles.module.css';

class Header extends Component {
  render() {
    const {
      gravatarEmail,
      name,
      score,
    } = this.props;

    return (
      <header className={ styles.ContainerHeader }>
        <img
          src={ getGravatarPicture(gravatarEmail) }
          data-testid="header-profile-picture"
          alt="Imagem do Gravatar"
          className={ styles.Picture }
        />
        <div className={ styles.ContainerPlayer }>
          <h3
            data-testid="header-player-name"
          >
            Nome:
            {' '}
            { name }
          </h3>
          <h3>
            Pontos:
            {' '}
            <span data-testid="header-score">{ score }</span>
          </h3>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  gravatarEmail: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = ({ player }) => ({
  ...player,
});

export default connect(mapStateToProps)(Header);
