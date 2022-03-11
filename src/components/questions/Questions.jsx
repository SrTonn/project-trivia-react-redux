import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Button from '../Button/Button';
// import styles from './styles.module.css';

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

    const listWrong = incorrectAnswer.map((answer, index) => ({ question: answer, datatestid: `wrong-answer-${index}` }));
    const listAnswer = [...listWrong, { question: correctAnswer, datatestid: 'correct-answer' }];
    const answerList = this.shuffleArray(listAnswer);
    console.log(listAnswer);
    console.log(answerList);

    return (
      <>
        <div /* className={ styles.ContainerQuestion } */>
          <div
            /* className={ styles.Category } */
            data-testid="question-category"
          >
            {category}
          </div>
          <p
            data-testid="question-text"
          >
            {question}

          </p>
        </div>
        <div data-testid="answer-options"/* className={ styles.ContainerAnswer } */>
          {answerList.map((answer) => (
            <Button
              key={ answer.question }
              label={ answer.question }
              name={ answer.question }
              dataTestId={answer.datatestid}
              onClick={ handleClick }
            />
          ))}
          {/* {type === 'boolean' ? '2 questions - type bool' : '5 questions'} */}
        </div>
      </>
    );
  }
}
