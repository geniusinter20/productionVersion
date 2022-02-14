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
    //     const response = await axios.get("https://exporagenius.com:5000/practicetests");
    //     dispatch
    return ({
        type: PracticeTestActionTypes.FETCH_PRACTICETESTS_REQUEST,
    })

}

export const fetchPracticeTestsSuccess = () => {
    return (dispatch) => {
        dispatch(fetchPracticeTests());
        axios
            .get("https://exporagenius.com:5000/practicetests")
            .then(({ data }) => {
                dispatch({
                    type: PracticeTestActionTypes.FETCH_PRACTICETESTS_SUCCESS,
                    payload: data
                })
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
            axios.post("https://exporagenius.com:5000/practicetests/add"
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
    var exams = [];
    return (
        dispatch => {
            dispatch({
                type: PracticeTestActionTypes.SELECTED_PRACTICETEST_REQUESTED
            })
            axios
                .get(`https://exporagenius.com:5000/practicetests/${id}`)
                .then(({ data }) => {
                    //console.log(data);
                    var test= data[0]
                    test.testExamsIDs.forEach(i => {
                        axios.get(`https://exporagenius.com:5000/exams/${i}`).then(({ data }) => {
                            exams.push(data[0])
                            if (exams.length === test.testExamsIDs.length) {
                                dispatch({
                                    type: PracticeTestActionTypes.SELECTED_PRACTICETEST_FETCHED,
                                    payload: {
                                        ...test,
                                        testExams: exams,
                                    },
                                })
                            }
                        })

                    })
                    //console.log("fetched:",data[0])
                })
                .catch(function (error) {
                    console.log(error);
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
            axios.post(`https://exporagenius.com:5000/practicetests/update/${test.key}`, test)
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

