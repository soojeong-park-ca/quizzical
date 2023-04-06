import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Quiz from "./Quiz.jsx";

// function for decoding html entities for render
// https://stackoverflow.com/questions/1912501/unescape-html-entities-in-javascript
// https://stackoverflow.com/a/34064434
function htmlDecode(input) {
  const doc = new DOMParser().parseFromString(input, "text/html");
  return doc.documentElement.textContent;
}

// function for shuffling elements of array following Durstenfeld Shuffle
// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array/12646864#12646864
// https://stackoverflow.com/a/12646864
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export default function QuizPage(props) {
  const [data, setData] = useState(createQuizPageData());
  const [submitted, setSubmitted] = useState(false);

  const [quizScoreData, setQuizScoreData] = useState([]);
  const [totalScore, setTotalScore] = useState(0);

  // initializing data for QuizPages
  function createQuizPageData() {
    const quizPageData = props.data.map(item => ({
      id: nanoid(),
      question: htmlDecode(item.question),
      correct_answer: htmlDecode(item.correct_answer),
      incorrect_answers: item.incorrect_answers.map(el => htmlDecode(el)),
      allChoices: shuffleArray(
        [item.correct_answer, ...item.incorrect_answers].map(el =>
          htmlDecode(el)
        )
      ),
    }));
    return quizPageData;
  }

  function handleSubmit() {
    setSubmitted(true);
    props.makeNewQuiz(); // changing state -> new API data fetch
  }

  function handleReset() {
    setData(createQuizPageData());
    setSubmitted(false);
    setQuizScoreData([]);
    setTotalScore(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // bring each score from Quiz and gather it in an array (state)
  function bringUpScore(quizScore) {
    setQuizScoreData(prevScoreData => [...prevScoreData, { score: quizScore }]);
  }

  // when scores array changes, calculate total score
  useEffect(() => {
    const allScoresArr = quizScoreData.map(el => el.score);
    setTotalScore(allScoresArr.reduce((acc, cur) => acc + cur, 0));
  }, [quizScoreData]);

  ///// RENDER
  const quizzes = data.map(item => {
    return (
      <Quiz
        key={item.id}
        question={item.question}
        correctAnswer={item.correct_answer}
        incorrectAnswersArr={item.incorrect_answers}
        allChoices={item.allChoices}
        submitted={submitted}
        bringUpScore={bringUpScore}
      />
    );
  });

  return (
    <div className="quizPageMain">
      {quizzes}
      {!submitted && (
        <button className="quizPageBtn btnNotSubmit" onClick={handleSubmit}>
          Check answers
        </button>
      )}
      {submitted && (
        <div className="afterSubmit">
          <p className="displayedScore">
            You scored {totalScore}/{props.data.length} correct answers
          </p>
          <button className="quizPageBtn btnSubmit" onClick={handleReset}>
            Play again
          </button>
        </div>
      )}
    </div>
  );
}
