import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import sanitizeHtml from 'sanitize-html';
import updateData, { UPDATE_SCORE } from '../../redux/action';
import Button from '../Button/Button';
import styles from './styles.module.css';

class Questions extends Component {
  state = {
    initialTimer: 30,
    timer: 30,
    answerList: [],
    localIndex: 0,
  }

  componentDidMount = () => {
    const { correctAnswer, incorrectAnswer } = this.props;
    this.startTimer();
    this.shuffleArrayAndUpdateState(correctAnswer, incorrectAnswer);
  }

  startTimer = () => {
    const ONE_SECOND = 1000;

    const intervalTimer = setInterval(() => {
      this.setState((prevState) => ({
        timer: prevState.timer - 1,
      }));
    }, ONE_SECOND);

    this.setState({
      intervalTimer,
    });
  }

  componentDidUpdate = () => {
    const { timer, intervalTimer, localIndex } = this.state;
    const {
      correctAnswer,
      incorrectAnswer,
      currentIndex,
      isAnswered,
      selectedAnswer,
    } = this.props;

    if (timer === 0 || isAnswered) {
      clearInterval(intervalTimer);
      this.calculateScore(selectedAnswer);
    }

    if (localIndex !== currentIndex) {
      this.setState((prevState) => ({
        localIndex: currentIndex,
        timer: prevState.initialTimer,
      }));
      this.shuffleArrayAndUpdateState(correctAnswer, incorrectAnswer);
      clearInterval(intervalTimer);
      this.startTimer();
    }
  }

  getDifficulty = () => {
    const { difficulty } = this.props;
    const HARD = 3;
    const MEDIUM = 2;
    const EASY = 1;

    switch (difficulty) {
    case 'hard':
      return HARD;
    case 'medium':
      return MEDIUM;
    case 'easy':
      return EASY;
    default:
      return 0;
    }
  }

  calculateScore = (answer) => {
    const { timer } = this.state;
    const { dispatch, correctAnswer } = this.props;
    if (answer === correctAnswer) {
      const TEEN = 10;
      const difficulty = this.getDifficulty();
      const score = TEEN + (difficulty * timer);
      dispatch(updateData(UPDATE_SCORE, score));
    }
  }

  shuffleArrayAndUpdateState = (correctAnswer, incorrectAnswer) => {
    const listWrong = incorrectAnswer.map((answer, index) => (
      { question: answer, typeOfAnswer: `wrong-answer-${index}` }));
    const array = [
      ...listWrong,
      { question: correctAnswer, typeOfAnswer: 'correct-answer' },
    ];
    let currentIndex = array.length;
    let randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
    // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [array[randomIndex],
        array[currentIndex]];
    }

    this.setState({ answerList: array });
  }

  render() {
    const { timer, answerList } = this.state;
    const {
      category,
      // type,
      // difficulty,
      question,
      correctAnswer,
      // incorrectAnswer,
      handleClickChooseAnswer,
      handleClickNextQuestion,
      isAnswered,
    } = this.props;

    return (
      <>
        <div className={ styles.ContainerQuestionAndCategory }>
          <div
            className={ styles.ContainerCategory }
            data-testid="question-category"
          >
            <p>{category}</p>
          </div>
          <div className={ styles.ContainerQuestion }>
            { correctAnswer === 'Dirk the Daring' ? (
              <p data-testid="question-text">
                {question}
              </p>)
              : (
                <p
                  data-testid="question-text"
                  dangerouslySetInnerHTML={ { __html: sanitizeHtml(question) } }
                />
              )}
          </div>
        </div>

        <p className={ styles.Timer }>{`Tempo: ${timer}`}</p>

        <div data-testid="answer-options" className={ styles.ContainerAnswer }>
          {answerList.map(({ question: questionToButton, typeOfAnswer }) => {
            const cleanQuestion = sanitizeHtml(questionToButton);
            return (
              <Button
                key={ cleanQuestion }
                label={ cleanQuestion }
                name={ cleanQuestion }
                dataTestId={ typeOfAnswer }
                className={ timer <= 0 || isAnswered
                  ? `${styles[typeOfAnswer.replace(/-\d/, '')]}` : null }
                onClick={ handleClickChooseAnswer }
                disabled={ timer <= 0 || isAnswered }
              />
            );
          })}
        </div>
        {(timer <= 0 || isAnswered)
          && <Button
            label="Próximo"
            name="next"
            dataTestId="btn-next"
            onClick={ handleClickNextQuestion }
            className={ styles.ButtonNext }
          />}
      </>
    );
  }
}

export default connect(null)(Questions);

Questions.propTypes = {
  handleClickChooseAnswer: PropTypes.func.isRequired,
  handleClickNextQuestion: PropTypes.func.isRequired,
  category: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
  correctAnswer: PropTypes.string.isRequired,
  incorrectAnswer: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedAnswer: PropTypes.string.isRequired,
  difficulty: PropTypes.string.isRequired,
  currentIndex: PropTypes.number.isRequired,
  isAnswered: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};
