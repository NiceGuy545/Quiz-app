import { act, createContext, useReducer } from "react";
import { shuffleAnswers, decodedResults } from "../helper";

const initialState = {
    currentQuestionIndex: 0,
    questions: [],
    showResults: false,
    answers: [],
    currentAnswer: '',
    correctAnswerCount: 0,
    error: null,
};

const reducer = (state, action) => {
    switch (action.type) {
        case "SELECTED_ANSWER": {
            const correctAnswerCount = action.payload === state.questions[state.currentQuestionIndex].correctAnswer ? state.correctAnswerCount + 1 : state.correctAnswerCount;
            return {
                ...state,
                currentAnswer: action.payload,
                correctAnswerCount,
            }
        }
        case "NEXT_QUESTION": {
            const showResults = state.currentQuestionIndex === state.questions.length - 1;
            const currentQuestionIndex = showResults ? state.currentQuestionIndex : state.currentQuestionIndex + 1;
            const answers = showResults ? [] : shuffleAnswers(state.questions[currentQuestionIndex]);
            return {
                ...state,
                currentQuestionIndex,
                showResults,
                answers,
                currentAnswer: '',
            };
        }
        case "RESTART": {
            return initialState;
        }
        case "LOADED_QUESTIONS": {
            const decodeResults = decodedResults(action.payload);

            return {
                ...state,
                questions: decodeResults,
                answers: (decodeResults) ? shuffleAnswers(decodeResults[0]) : [],
            }
        }
        case "SERVER_ERROR": {
            return {
                ...state,
                error: action.payload,
            }
        }
        default: return state;
    }
}

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
    const value = useReducer(reducer, initialState);
    return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>
};