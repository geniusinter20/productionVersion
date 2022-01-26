import { UserDashboardActionTypes } from "../Constants/UserDashboardActionTypes"
import axios from "axios";

export const fetchuserpracticetests = (IDs) => {
    return (dispatch) => {
        IDs.forEach(element => {
            let promiseA = axios.get(`https://exporagenius.com:5000/practicetests/${element}`)
            let promiseB = promiseA.then(({ data }) => {
                setTimeout(() => {
                    dispatch({
                        type: UserDashboardActionTypes.FETCH_PRACTICETESTS,
                        payload: data[0]
                    })
                }, 200)
            })
            return Promise.all([promiseA, promiseB]).then(function ([responseA, responseB]) {
                promiseB.then(() => {
                    //console.log("secondThenResponse:", responseA.data[0].testExamsIDs)
                    setTimeout(() => {
                        dispatch(fetchuserpracticetestExams([...responseA.data[0].testExamsIDs], responseA.data[0]._id))
                    }, 500)
                })
            });
        });
    }
}
const fetchuserpracticetestExams = (IDs, testID) => {
    //console.log("Expanding:", testID)
    //console.log("Expanding:", IDs)
    var exams = []
    var examsActivities = []
    return (dispatch) => {
        IDs.forEach(element => {
            //console.log("fetchingexam:", element)
            axios.
            get(`https://exporagenius.com:5000/activityexamstate/exam/${element}/${testID}`)
            .then(({data})=>{
                //console.log("activity:", data[0])
                if(data[0] !== undefined)
                dispatch({
                    type: UserDashboardActionTypes.SET_PRACTICETEST_EXAMS_ACTIVITY,
                    payload: data[0]
                })
            })
            axios
                .get(`https://exporagenius.com:5000/exams/${element}`)
                .then(({ data }) => {
                    //console.log("data[0]", data[0])
                    exams.push(data[0])
                    //console.log(exams.length)
                    if (exams.length === IDs.length) {
                        //console.log("exams:", exams)
                        dispatch({
                            type: UserDashboardActionTypes.SET_PRACTICETEST_EXAMS,
                            payload: {
                                exams: exams,
                                testID: testID,
                                totalExamsPeriod: exams.map(a => a.examPeriod).reduce(function (a, b) { return parseInt(a) + parseInt(b); }, 0)
                            }
                        })
                    }
                })
                .catch(function (error) {
                });
        });
    }
}
export const fetchUserExamInfo = (ID) => {
    //console.log("Expanding:", testID)
    //console.log("Expanding:", ID)
    return (dispatch) => {
        dispatch({
            type: UserDashboardActionTypes.EXAMENV_LOADINGDATA_REQUESTED,
        })
        let promiseA = axios.get(`https://exporagenius.com:5000/exams/${ID}`)
        let promiseB = promiseA.then(({ data }) => {
            setTimeout(() => {
                dispatch({
                    type: UserDashboardActionTypes.EXAMENV_FETCH_EXAMINFO,
                    payload: data[0]
                })
            }, 200)
        })
        return Promise.all([promiseA, promiseB]).then(function ([responseA, responseB]) {
            promiseB.then(() => {
                //console.log("secondThenResponse:", responseA)
                setTimeout(() => {
                    dispatch(fetchExamQuestions(responseA.data[0].examQuestionsIDs))
                }, 500)
            })
        });
    }
}

const fetchExamQuestions = (IDs) => {
    var questions = []
    return (dispatch) => {
        IDs.forEach(element => {
            axios
                .get(`https://exporagenius.com:5000/question/${element}`)
                .then(({ data }) => {
                    questions.push(data[0])
                    if (questions.length === IDs.length) {
                        dispatch({
                            type: UserDashboardActionTypes.EXAMENV_FETCH_EXAMQUESTIONS,
                            payload: [...questions]
                        })
                    }
                }).then(
                    dispatch({
                        type: UserDashboardActionTypes.EXAMENV_LOADINGDATA_FINISHED,
                    })
                )
                .catch(function (error) {
                });
        });
    }
}
export const questionSolved = (answithid, finished, time ) => {
    //console.log("finished", answithid)
    //console.log("timeSpent", time)
    return (dispatch) => {
        dispatch({
            type: UserDashboardActionTypes.EXAMENV_QUESTION_SOLVE,
            payload: {answithid: answithid, finished: finished, timeSpent: time}
        })
    }
}
export const startExam = (activity) => {
    console.log("started:", activity)
    return (dispatch) => {
        axios.post("https://exporagenius.com:5000/activityexamstate/add", activity)
            .then(res => {
                //console.log("res:", res.data)
                dispatch({
                    type: UserDashboardActionTypes.EXAMENV_START_EXAM,
                    payload: {...activity, activityID: res.data}
                })
            }
        )
    }
}
export const fetchActivity = (examID, testID) => {
    //console.log(qid)
    return (dispatch) => {
        axios.get(`https://exporagenius.com:5000/activityexamstate/exam/${examID}/${testID}`)
            .then(res => {
                //console.log("res:", res.data)
                 dispatch({
                     type: UserDashboardActionTypes.EXAMENV_FETCH_ACTIVITY,
                     payload: res.data[0]
                 })
            }
        )
    }
}