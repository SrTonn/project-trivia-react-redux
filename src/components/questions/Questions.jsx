import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Button from '../Button/Button';
import styles from './styles.module.css';

export default class Questions extends Component {
  state = {
    initialTimer: 3,
    timer: 3,
    answerList: [],
    localIndex: 0,
  }

  componentDidMount = () => {
    const { correctAnswer, incorrectAnswer } = this.props;
    this.startTimer();
    this.shuffleArrayAndUpdateState([correctAnswer, ...incorrectAnswer]);
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
    const { correctAnswer, incorrectAnswer, currentIndex } = this.props;

    if (timer === 0) {
      clearInterval(intervalTimer);
    }

    if (localIndex !== currentIndex) {
      this.setState((prevState) => ({
        localIndex: currentIndex,
        timer: prevState.initialTimer,
      }));
      this.shuffleArrayAndUpdateState([correctAnswer, ...incorrectAnswer]);
      clearInterval(intervalTimer);
      this.startTimer();
    }
  }

  shuffleArrayAndUpdateState = (array) => {
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
      type,
      // difficulty,
      question,
      correctAnswer,
      incorrectAnswer,
      handleClick,
    } = this.props;

    return (
      <>
        <div className={ styles.ContainerQuestion }>
          <div
            className={ styles.Category }
            data-testid="question-category"
          >
            <p title={ category.replace(/.+:/i, '') }>
              {category.replace(/:.+/i, '')}
            </p>
          </div>
          <p
            data-testid="question-text"
          >
            {question}
          </p>
        </div>
        <p className={ styles.Timer }>{`Tempo: ${timer}`}</p>
        <div className={ styles.ContainerAnswer }>
          {answerList.map((answer) => (
            <Button
              key={ answer }
              label={ answer }
              name={ answer }
              onClick={ handleClick }
            />
          ))}
          {/* {type === 'boolean' ? '2 questions - type bool' : '5 questions'} */}
        </div>
      </>
    );
  }
}

Questions.propTypes = {
  handleClick: PropTypes.func.isRequired,
  category: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
  correctAnswer: PropTypes.string.isRequired,
  incorrectAnswer: PropTypes.string.isRequired,
  currentIndex: PropTypes.number.isRequired,
};
