import { ExamActionTypes } from "../Constants/ExamActionTypes"
import axios from "axios";
import { message } from "antd";
const fetchExams = () => {

    // return async(dispatch) => {
    //     const response = await axios.get("http://localhost:5000/practicetests");
    //     dispatch
    return ({
        type: ExamActionTypes.FETCH_EXAMS_REQUEST,
    })

}
export const resetExams = () => {

    return ({
        type: ExamActionTypes.RESET,
    })

}

export const fetchExamsSuccess = () => {
    return (dispatch) => {
        dispatch(fetchExams());
        axios
            .get("http://localhost:5000/exams")
            .then(({ data }) => {
                dispatch({
                    type: ExamActionTypes.FETCH_EXAMS_SUCCESS,
                    payload: data
                })
            })
            .catch(function (error) {
                dispatch(fetchExamsFailure(error))
            });
    }
}
const fetchExamsFailure = (error) => {
    return ({
        type: ExamActionTypes.FETCH_EXAMS_FALIURE,
        payload: error
    })
}
export const createExam = (exam) => {
    return (
        dispatch => {
            dispatch({
                type: ExamActionTypes.START_CREATING_EXAM
            })
            axios.post("http://localhost:5000/exams/add", exam)
                .then(res => {
                    if (res.data.msg === "408") {
                        message.error({ content: "Request time out try again", className: "message" });
                        dispatch({
                            type: ExamActionTypes.FINISH_CREATING_EXAM
                        })
                    }
                    else if (res.data.msg === "exam created") {
                        message.success({ content: "Exam Created", className: "message" });
                        dispatch({
                            type: ExamActionTypes.CREATE_EXAM,
                            payload: { ...exam, key: res.data.id }
                        })
                    }
                }).catch(err => {
                    console.log(err);
                    dispatch({
                        type: ExamActionTypes.FINISH_CREATING_EXAM
                    })
                })
        }

    )
}
export const updateExam = (exam) => {
    return (
        dispatch => {
            dispatch({
                type: ExamActionTypes.UPDATE_EXAM_START,
            })
            axios.post(`http://localhost:5000/exams/update/${exam.key}`, exam)
                .then(res => {
                    if (res.data.msg === "exam updated") {
                        message.success({ content: "Exam Updated", className: "message" });
                        dispatch({
                            type: ExamActionTypes.UPDATE_EXAM,
                            payload: exam
                        })
                    }

                    else {
                        message.error({ content: res.data.msg, className: "message" });
                        dispatch({
                            type: ExamActionTypes.UPDATE_EXAM_FAIL,
                        })
                    }
                })
        }

    )
}
export const toggleExamStatus = (exam) => {
    return (
        {
            type: ExamActionTypes.TOGGLE_EXAMSTATUS,
            payload: exam
        }
    )
}
export const deleteExam = (id) => {
    console.log("deleting:", id)
    return (
        dispatch => {
            axios.delete(`http://localhost:5000/exams/delete/${id}`)
                .then(res => {
                    //console.log(res.data)
                    dispatch({
                        type: ExamActionTypes.DELETE_EXAM,
                        payload: res.data
                    })
                })
        }

    )
}