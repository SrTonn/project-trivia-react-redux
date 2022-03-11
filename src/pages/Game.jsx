import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header/Header';
import updateData, { UPDATE_TOKEN } from '../redux/action';
import getQuestions from '../services/getQuestions';
import getToken from '../services/getToken';
import Questions from '../components/questions/Questions';

class Game extends Component {
  state = {
    index: 0,
    questions: [],
    isAnswered: false,
  }

  componentDidMount = async () => {
    const { token, dispatch } = this.props;
    const INVALID_TOKEN = 3;
    let data = await getQuestions(token);
    if (data.response_code === INVALID_TOKEN) {
      const { token: newToken } = await getToken();
      localStorage.setItem('token', newToken);
      dispatch(updateData(UPDATE_TOKEN, newToken));
      data = await getQuestions(newToken);
    }

    this.setState({
      questions: data.results,
    });
  }

  handleClickChooseAnswer = () => {
    this.setState({
      isAnswered: true,
    });
  }

  handleClickNextQuestion = async () => {
    this.setState((prevState) => ({
      index: prevState.index + 1,
      isAnswered: false,
    }));
  }

  render() {
    const { questions, index, isAnswered } = this.state;
    return (
      <>
        <Header />
        {questions[index] && <Questions
          category={ questions[index].category }
          type={ questions[index].type }
          question={ questions[index].question }
          correctAnswer={ questions[index].correct_answer }
          incorrectAnswer={ questions[index].incorrect_answers }
          handleClickChooseAnswer={ this.handleClickChooseAnswer }
          currentIndex={ index }
          handleClickNextQuestion={ this.handleClickNextQuestion }
          isAnswered={ isAnswered }
        />}
      </>
    );
  }
}

const mapStateToProps = ({ reducerPlayer, token }) => ({
  ...reducerPlayer,
  token,
});

export default connect(mapStateToProps)(Game);

Game.propTypes = {
  token: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};
