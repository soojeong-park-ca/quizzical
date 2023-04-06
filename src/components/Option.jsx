export default function Option(props) {
  function setClassNames() {
    if (!props.submitted) {
      // when answers not submitted
      if (props.isChosen) {
        // answer is chosen
        return "choiceContainer clicked";
      } else return "choiceContainer";
    } else {
      // when answers submitted
      if (props.isCorrect) {
        // correct answer gets "correct" classs
        return "choiceContainer correct";
      } else {
        // wrong answers
        if (props.isChosen) {
          // wrong answer chosen gets "wrong" class
          return "choiceContainer wrong";
        } else {
          // wrong answers not chosen gets "rest" class
          return "choiceContainer rest";
        }
      }
    }
  }

  return (
    <button
      className={setClassNames()}
      onClick={() => props.toggleChoice(props.id)}
      disabled={props.submitted}
    >
      {props.value}
    </button>
  );
}
