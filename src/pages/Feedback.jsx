import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header/Header';

class Settings extends Component {
  render() {
    const { assertions } = this.props;
    const NUMBER_THREE = 3;

    return (
      <div>
        <Header />
        <p data-testid="feedback-text">
          {assertions < NUMBER_THREE ? 'Could be better...' : 'Well Done!'}
        </p>
      </div>
    );
  }
}

const mapStateToProps = ({ player }) => ({
  ...player,
});

export default connect(mapStateToProps)(Settings);

Settings.propTypes = {
  assertions: PropTypes.number.isRequired,
};
