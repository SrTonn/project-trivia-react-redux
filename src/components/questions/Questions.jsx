import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Button from '../Button/Button';
import styles from './styles.module.css';

export default class Questions extends Component {
  shuffleArray = (array) => {
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

    return array;
  }

  render() {
    const {
      category,
      type,
      // difficulty,
      question,
      correctAnswer,
      incorrectAnswer,
      handleClick,
    } = this.props;
    const answerList = this.shuffleArray([correctAnswer, ...incorrectAnswer]);

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
