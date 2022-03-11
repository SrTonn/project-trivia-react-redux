import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header/Header';
import updateData, { UPDATE_TOKEN } from '../redux/action';
import getQuestions from '../services/getQuestions';
import getToken from '../services/getToken';
import Questions from '../components/questions/Questions';
import Button from '../components/Button/Button';

class Game extends Component {
  state = {
    index: 0,
    questions: [],
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

  handleClickChooseAnswer = ({ target: { name: answer } }) => {
    const { questions, index } = this.state;
    const correctAnswer = questions[index].correct_answer;
    console.log('clicado=>', answer);
    console.log('res correta=>', correctAnswer);
    console.log('a resposta está correta?', correctAnswer === answer);
  }

  handleClickNextQuestion = async () => {
    this.setState((prevState) => ({
      index: prevState.index + 1,
    }));
    if (index === 5) {
      const { history: { push } } = this.props;
      push('/feedback');
    } 
    }
  }

  render() {
    const { questions, index } = this.state;
    const { token, dispatch } = this.props;
    return (
      <>
        <Header />
        {questions[index] && <Questions
          category={ questions[index].category }
          type={ questions[index].type }
          question={ questions[index].question }
          correctAnswer={ questions[index].correct_answer }
          incorrectAnswer={ questions[index].incorrect_answers }
          handleClick={ this.handleClickChooseAnswer }
        />}

        <Button
          label="Próximo"
          name="next"
          onClick={ this.handleClickNextQuestion }
        />
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
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
