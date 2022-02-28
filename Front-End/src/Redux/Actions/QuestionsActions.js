import { QuestionActionTypes } from "../Constants/QuestionActionTypes"
import axios from "axios";


export const fetchQuestions = () => {
    return (dispatch) => {
        
        axios
            .get("http://localhost:5000/questions")
            .then(({ data }) => {
                setTimeout(() => {
                    dispatch({
                        type: QuestionActionTypes.FETCH_QUESTIONS,
                        payload: data
                    })
                }, 1000)
            })
            .catch(function (error) {
            });
    }
}
