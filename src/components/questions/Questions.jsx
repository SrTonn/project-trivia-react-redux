import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Button from '../Button/Button';
import styles from './styles.module.css';

export default class Questions extends Component {
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
    const { correctAnswer, incorrectAnswer, currentIndex, isAnswered } = this.props;

    if (timer === 0 || isAnswered) {
      clearInterval(intervalTimer);
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
      // correctAnswer,
      // incorrectAnswer,
      handleClickChooseAnswer,
      handleClickNextQuestion,
      isAnswered,
    } = this.props;

    return (
      <>
        <div className={ styles.ContainerQuestion }>
          <div
            className={ styles.Category }
            data-testid="question-category"
          >
            <p>
              {category}
            </p>
          </div>
          <p
            data-testid="question-text"
          >
            {question}
          </p>
        </div>

        <p className={ styles.Timer }>{`Tempo: ${timer}`}</p>

        <div data-testid="answer-options" className={ styles.ContainerAnswer }>
          {answerList.map(({ question: questionToButton, typeOfAnswer }) => (
            <Button
              key={ questionToButton }
              label={ questionToButton }
              name={ questionToButton }
              dataTestId={ typeOfAnswer }
              className={ timer <= 0 || isAnswered
                ? `${styles[typeOfAnswer.replace(/-\d/, '')]}` : null }
              onClick={ handleClickChooseAnswer }
              disabled={ timer <= 0 || isAnswered }
            />
          ))}
        </div>
        {isAnswered
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

Questions.propTypes = {
  handleClickChooseAnswer: PropTypes.func.isRequired,
  handleClickNextQuestion: PropTypes.func.isRequired,
  category: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
  correctAnswer: PropTypes.string.isRequired,
  incorrectAnswer: PropTypes.string.isRequired,
  currentIndex: PropTypes.number.isRequired,
  isAnswered: PropTypes.bool.isRequired,

};
