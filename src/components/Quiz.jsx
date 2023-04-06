import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Option from "./Option";

export default function Quiz(props) {
  const [allOptions, setAllOptions] = useState(settingOptionObject());
  const [score, setScore] = useState(0);

  // Fns
  // 1. setting data for each option (init)
  // array of option objects
  function settingOptionObject() {
    return props.allChoices.map(choice => ({
      id: nanoid(),
      value: choice,
      isCorrect: choice === props.correctAnswer ? true : false,
      isChosen: false,
    }));
  }

  // 2. toggle clicked / unclicked option as chosen option
  function toggleChoice(optionId) {
    setAllOptions(prevOptions =>
      prevOptions.map(prevOption => {
        if (prevOption.id === optionId) {
          return { ...prevOption, isChosen: !prevOption.isChosen };
        } else return { ...prevOption, isChosen: false };
      })
    );
  }

  // 3. updating score of current quiz
  // whenever something from the state allOptions changes
  useEffect(() => {
    allOptions.forEach(option => {
      if (option.isChosen && option.isCorrect) {
        // correct answer chosen
        if (score === 1) {
          // if it was already chosen score stays the same
          setScore(prevScore => prevScore);
        } else if (score === 0) {
          // if it wasn't chosen already score + 1
          setScore(prevScore => prevScore + 1);
        }
      } else if (option.isChosen && !option.isCorrect) {
        // wrong answer chosen
        if (score === 1) {
          // if correct answer was chosen before but usesr changes to wrong answer
          setScore(prevScore => prevScore - 1);
        } else if (score === 0) {
          // if wrong answer was chosen before and usesr changes to a different wrong answer
          setScore(prevScore => prevScore);
        }
      } else setScore(prevScore => prevScore);
    });
  }, [allOptions]);

  // 4. send score data to parent component ONLY when submit btn clicked
  useEffect(() => {
    if (props.submitted) {
      props.bringUpScore(score);
    }
  }, [props.submitted]);

  ///// RENDER
  const options = allOptions.map(option => {
    return (
      <Option
        key={option.id}
        id={option.id}
        value={option.value}
        isChosen={option.isChosen}
        isCorrect={option.isCorrect}
        toggleChoice={toggleChoice}
        submitted={props.submitted}
      />
    );
  });

  return (
    <div className="quiz">
      <h1 className="question">{props.question}</h1>
      <div className="multipleChoices">{options}</div>
    </div>
  );
}
