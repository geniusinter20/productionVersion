import { QuestionActionTypes } from "../Constants/QuestionActionTypes";
const initialState = {
    questions: [],
    loading: true,
    error:'',
}

export const questionsReducer = (state = initialState, { type, payload }) => {

    switch (type) {
        case QuestionActionTypes.FETCH_QUESTIONS: {
            return {
                ...state,
                questions: payload
            };
        }
        default: {
            return state;
        }
    }
}