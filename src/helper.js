import Answer from "./components/Answer";

export const shuffleAnswers = question => {
    const unshuffledAnsers = [
        question.correctAnswer,
        ...question.incorrectAnswers,
    ]

    return unshuffledAnsers
        .map((unshuffledAnser) => ({
            sort: Math.random(),
            value: unshuffledAnser,
        }))
        .sort((a, b) => a.sort - b.sort)
        .map((a) => a.value);
}

export const decodedResults = (encodedResult) => {
    return encodedResult?.map((result) => {
        const incorrectAnswers = result.incorrect_answers.map(incorrectAnswer => decodeURIComponent(incorrectAnswer));
        return {
            question: decodeURIComponent(result.question),
            correctAnswer: decodeURIComponent(result.correct_answer),
            incorrectAnswers,
        }
    })
}