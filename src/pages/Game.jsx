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
    selectedAnswer: '',
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

    const storage = localStorage.getItem('ranking');
    if (!storage) {
      localStorage.setItem('ranking', JSON.stringify([]));
    }
    this.setState({
      questions: data.results,
    });
  }

  handleClickChooseAnswer = ({ target: { name } }) => {
    // this.calculateScore(name);
    // const { questions, index } = this.state;
    this.setState({
      isAnswered: true,
      selectedAnswer: name,
    });
  }

  handleClickNextQuestion = () => {
    const { index } = this.state;
    this.setState((prevState) => ({
      index: prevState.index + 1,
      isAnswered: false,
    }));
    const INDEX_NUMBER = 4;
    if (index === INDEX_NUMBER) {
      const { history: { push } } = this.props;
      push('/feedback');
    }
  };

  render() {
    const { questions, index, isAnswered, selectedAnswer } = this.state;
    return (
      <>
        <Header />
        {questions[index] && <Questions
          category={ questions[index].category }
          type={ questions[index].type }
          difficulty={ questions[index].difficulty }
          question={ questions[index].question }
          correctAnswer={ questions[index].correct_answer }
          incorrectAnswer={ questions[index].incorrect_answers }
          handleClickChooseAnswer={ this.handleClickChooseAnswer }
          currentIndex={ index }
          handleClickNextQuestion={ this.handleClickNextQuestion }
          isAnswered={ isAnswered }
          selectedAnswer={ selectedAnswer }
        />}
      </>
    );
  }
}

const mapStateToProps = ({ player, token }) => ({
  ...player,
  token,
});

export default connect(mapStateToProps)(Game);

Game.propTypes = {
  token: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
