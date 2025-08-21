import { useContext } from "react";
import Answer from "./Answer";
import { QuizContext } from "../context/quiz";

const Question = () => {
    const [quizState, dispatch] = useContext(QuizContext);
    const currentQuestion = quizState.questions[quizState.currentQuestionIndex];

    return (
        <div>
            <div className="question">{currentQuestion.question}</div>
            <div className="answers">
                {quizState.answers.map((answer, index) =>
                (<Answer
                    answerText={answer}
                    key={index}
                    index={index}
                    currentAnswer={quizState.currentAnswer}
                    correctAnswer={currentQuestion.correctAnswer}
                    onSelectAnswer={(answerText) => dispatch({
                        type: "SELECTED_ANSWER",
                        payload: answerText,
                    })} />)
                )}
            </div>
        </div>
    );
}

export default Question;