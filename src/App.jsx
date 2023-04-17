import { useState, useEffect } from "react";
import StartPage from "./components/StartPage";
import QuizPage from "./components/QuizPage";

const TRIVIA_API_URL = "https://opentdb.com/api.php?category=10&type=multiple";

function App() {
  const [quizOn, setQuizOn] = useState(false);
  const [quizData, setQuizData] = useState([]);
  const [shouldFetchNewQuiz, setShouldFetchNewQuiz] = useState(true);

  useEffect(() => {
    async function getTriviaData(numQuestions) {
      const res = await fetch(`${TRIVIA_API_URL}&amount=${numQuestions}`);
      const data = await res.json();

      setQuizData(data.results);
      setShouldFetchNewQuiz(false);
    }

    shouldFetchNewQuiz && getTriviaData(5);
  }, [shouldFetchNewQuiz]);

  const quizCategory = quizData.length > 0 ? quizData[0].category : "";

  function toggleQuizMode() {
    setQuizOn(prevQuizOn => !prevQuizOn);
  }

  function makeNewQuiz() {
    setShouldFetchNewQuiz(true);
  }

  return (
    <div className="App">
      {!quizOn && (
        <StartPage
          dataCategory={quizCategory}
          toggleQuizMode={toggleQuizMode}
        />
      )}
      {quizOn && <QuizPage data={quizData} makeNewQuiz={makeNewQuiz} />}
    </div>
  );
}

export default App;
