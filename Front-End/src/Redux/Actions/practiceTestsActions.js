import { PracticeTestActionTypes } from "../Constants/practiceTestsActionTypes"
import axios from "axios";
import { message } from "antd";


export const resetTest = () => {

    return ({
        type: PracticeTestActionTypes.TEST_RESET,
    })

}
export const resetSelectedTest = () => {

    return ({
        type: PracticeTestActionTypes.SELECTED_PRACTICETEST_RESET
    })

}

const fetchPracticeTests = () => {

    // return async(dispatch) => {
    //     const response = await axios.get("https://localhost:5000/practicetests");
    //     dispatch
    return ({
        type: PracticeTestActionTypes.FETCH_PRACTICETESTS_REQUEST,
    })

}

export const fetchPracticeTestsSuccess = () => {
    return (dispatch) => {
        dispatch(fetchPracticeTests());
        axios
            .get("https://localhost:5000/practicetests")
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
    //console.log("adding:", test)

    return (
        dispatch => {
            dispatch({
                type: PracticeTestActionTypes.CREATE_PRACTICETEST_START,
            })
            axios.post("https://localhost:5000/practicetests/add"
                , test)
                .then(res => {
                    if (res.data.msg === "test created") {
                        dispatch({
                            type: PracticeTestActionTypes.CREATE_PRACTICETEST,
                            payload: res.data
                        })
                        message.success({ content: "Test Created", className: "message" });
                    }
                    else {
                        message.error({ content: res.data.msg === 408 ? "Request time out try again" : res.data.msg, className: "message" });
                        dispatch({
                            type: PracticeTestActionTypes.CREATE_PRACTICETEST_FAIL,
                        })
                    }
                })
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
                .get(`https://localhost:5000/practicetests/${id}`)
                .then(({ data }) => {
                    //console.log(data);
                    setTimeout(() => {
                        dispatch({
                            type: PracticeTestActionTypes.SELECTED_PRACTICETEST,
                            payload: data[0],
                        })
                    }, 1000)
                    //console.log("fetched:",data[0])
                })
                .catch(function (error) {
                })

        })
}
export const editSelectedPracticeTest = (test) => {
    //console.log("fetching:", id)
    return (
        dispatch => {
            dispatch({
                type: "SELECTED_PRACTICETEST_UPDATE_START",
            })
            console.log(test);
            axios.post(`https://localhost:5000/practicetests/update/${test.key}`, test)
                .then(res => {
                    if (res.data.msg === "test updated") {
                        message.success({ content: "Test Updated", className: "message" });
                        dispatch({
                            type: "SELECTED_PRACTICETEST_UPDATE",
                            payload: test
                        })
                    }
                    else {
                        message.error({ content: res.data.msg === 408 ? "Request time out try again" : res.data.msg, className: "message" });
                        dispatch({
                            type: "SELECTED_PRACTICETEST_UPDATE_FAIL",
                        })
                    }
                })

        }
    )
}

