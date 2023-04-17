export default function Option(props) {
  function setClassNames() {
    if (!props.submitted) {
      if (props.isChosen) {
        return "choiceContainer clicked";
      } else return "choiceContainer";
    } else {
      if (props.isCorrect) {
        return "choiceContainer correct";
      } else {
        if (props.isChosen) {
          return "choiceContainer wrong";
        } else {
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
