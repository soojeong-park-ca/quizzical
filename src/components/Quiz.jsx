import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Option from "./Option";

export default function Quiz(props) {
  const [allOptions, setAllOptions] = useState(settingOptionObject());
  const [score, setScore] = useState(0);

  // Fns
  // 1. setting data for each option (init)
  function settingOptionObject() {
    return props.allChoices.map(choice => ({
      id: nanoid(),
      value: choice,
      isCorrect: choice === props.correctAnswer ? true : false,
      isChosen: false,
    }));
  }

  console.log("allOptions: ", allOptions);

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
  useEffect(() => {
    allOptions.forEach(option => {
      if (option.isChosen && option.isCorrect) {
        if (score === 1) {
          setScore(1);
        } else if (score === 0) {
          setScore(1);
        }
      } else if (option.isChosen && !option.isCorrect) {
        if (score === 1) {
          setScore(0);
        } else if (score === 0) {
          setScore(0);
        }
      } else if (!option.isChosen && option.isCorrect) {
        setScore(0);
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
