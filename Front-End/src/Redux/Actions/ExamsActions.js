import { ExamActionTypes } from "../Constants/ExamActionTypes"
import axios from "axios";
const fetchExams = () => {

    // return async(dispatch) => {
    //     const response = await axios.get("http://localhost:5000/practicetests");
    //     dispatch
    return ({
        type: ExamActionTypes.FETCH_EXAMS_REQUEST,
    })

}

export const fetchExamsSuccess = () => {
    return (dispatch) => {
        dispatch(fetchExams());
        axios
            .get("http://localhost:5000/exams")
            .then(({ data }) => {
                setTimeout(() => {
                    dispatch({
                        type: ExamActionTypes.FETCH_EXAMS_SUCCESS,
                        payload: data
                    })
                }, 1000)
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
            axios.post("http://localhost:5000/exams/add",exam)
            .then(res=>{
                dispatch({
                    type:ExamActionTypes.CREATE_EXAM,
                    payload:exam
                })
            })
        }
        
    )
}
export const updateExam = (exam) => {
    return (
        dispatch => {
            axios.post(`http://localhost:5000/exams/update/${exam.key}`,exam)
            .then(res=>{
                dispatch({
                    type:ExamActionTypes.UPDATE_EXAM,
                    payload:res.data
                })
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
    //console.log("deleting:", id)
    return (
        dispatch => {
            axios.delete(`http://localhost:5000/exams/delete/${id}`)
            .then(res=>{
                //console.log(res.data)
                dispatch({
                    type:ExamActionTypes.DELETE_EXAM,
                    payload:res.data
                })
            })
        }
        
    )
}