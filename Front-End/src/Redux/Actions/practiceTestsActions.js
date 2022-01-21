import { PracticeTestActionTypes } from "../Constants/practiceTestsActionTypes"
import axios from "axios";


const fetchPracticeTests = () => {

    // return async(dispatch) => {
    //     const response = await axios.get("http://localhost:5000/practicetests");
    //     dispatch
    return ({
        type: PracticeTestActionTypes.FETCH_PRACTICETESTS_REQUEST,
    })

}

export const fetchPracticeTestsSuccess = () => {
    return (dispatch) => {
        dispatch(fetchPracticeTests());
        axios
            .get("http://localhost:5000/practicetests")
            .then(({ data }) => {
                setTimeout(() => {
                    dispatch({
                        type: PracticeTestActionTypes.FETCH_PRACTICETESTS_SUCCESS,
                        payload: data
                    })
                }, 1000)
            })
            .catch(function (error) {
                dispatch(fetchPracticeTestsFailure(error))
            });
    }
}
const fetchPracticeTestsFailure = (error) => {
    return ({
        type: PracticeTestActionTypes.FETCH_PRACTICETESTS_FALIURE,
        payload: error
    })
}

export const deletePracticeTest = (id) => {
    return ({
        type: PracticeTestActionTypes.DELETE_PRACTICETEST,
        payload: id
    })
}

export const createPracticeTest = (test) => {
    console.log("adding:", test)
    return (
        dispatch => {
            axios.post("http://localhost:5000/practicetests/add"
                , test)
                .then(res =>
                    dispatch({
                        type: PracticeTestActionTypes.CREATE_PRACTICETEST,
                        payload: res.data
                    })
                )
        }
    )
}
export const togglePracticeTestStatus = (test) => {
    return (
        {
            type: PracticeTestActionTypes.TOGGLE_PRACTICETESTSTATUS,
            payload: test
        }
    )
}
export const selectedPracticeTest = (id) => {
    //console.log("fetching:", id)
    return (
        dispatch => {
    axios
        .get(`http://localhost:5000/practicetests/${id}`)
        .then(({ data }) => {
            setTimeout(() => {
                dispatch({
                    type: PracticeTestActionTypes.SELECTED_PRACTICETEST,
                    payload: {...data[0], loadingTest: false}
                })
            }, 1000)
            //console.log("fetched:",data[0])
        })
        .catch(function (error) {
        })

    })
}
    