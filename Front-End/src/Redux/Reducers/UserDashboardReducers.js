import { UserDashboardActionTypes } from "../Constants/UserDashboardActionTypes"
import axios from "axios";

const testsInitialState = {
    practiceTests: [],
    examsActivities: [],
    ActivityPraticalTestState: [],
    examsForExpandedTests: [],
}
const examEnvInitialState = {
    examInfo: {},
    questions: [],
    finishedQuestionsIDsWithAnswers: [],
    loadingData: true,
}
const examActivityInitialState = {
    clientID: "",
    examID: "",
    finished: false,
    started: false,
    finishedQuestionsIDsWithAnswers: [],
    timeSpent: 0,
    testID: ""
}

export const UserDashboardPracticeTestsData = (state = testsInitialState, { type, payload }) => {
    switch (type) {
        case UserDashboardActionTypes.FETCH_PRACTICETESTS: {
            if (state.practiceTests.filter(e => e._id === payload._id).length === 0) {
                return {
                    ...state,
                    practiceTests: [...state.practiceTests, payload],
                    examsForExpandedTests: [...state.examsForExpandedTests, { testID: payload._id, exams: [], totalExamsPeriod: 0 }]
                }
            }
            else return state
        }
        case UserDashboardActionTypes.SET_PRACTICETEST_EXAMS: {
            //console.log("examsForExpandedTests:", state.examsForExpandedTests)
            //console.log("payload:", payload.testID)
            const index = state.examsForExpandedTests.findIndex(e => e.testID === payload.testID)
            const temptests = [...state.examsForExpandedTests]


            temptests.splice(index, 1, payload)
            //console.log("temptests", temptests)
            return {
                ...state,
                examsForExpandedTests: temptests
            }
        }
        case UserDashboardActionTypes.SET_PRACTICETEST_EXAMS_ACTIVITY: {
            const temp= [...state.examsActivities]
            temp.push(payload)
            return{
                ...state,
                examsActivities: temp
            }
            

        }
        case UserDashboardActionTypes.CLEAR_PRACTICETEST_EXAMS: {
            //console.log("addingExam:", payload)
            return {
                ...state,
                examsForExpandedTest: []
            }
        }
        default:
            return state;
    }
}
export const UserDashboardExamEnv = (state = examEnvInitialState, { type, payload }) => {
    switch (type) {
        case UserDashboardActionTypes.EXAMENV_FETCH_EXAMINFO: {
            return {
                ...state,
                examInfo: payload,
            }
        }
        case UserDashboardActionTypes.EXAMENV_FETCH_EXAMQUESTIONS: {
            return {
                ...state,
                questions: payload,
            }
        }
        case UserDashboardActionTypes.EXAMENV_FETCH_EXAMQUESTIONS: {
            return {
                ...state,
                questions: payload,
            }
        }
        case UserDashboardActionTypes.EXAMENV_LOADINGDATA_REQUESTED: {
            return {
                ...state,
                loadingData: true,
            }
        }
        default:
            return state;
    }
}
export const examActivityReducer = (state = examActivityInitialState, { type, payload }) => {
    switch (type) {
        case UserDashboardActionTypes.EXAMENV_QUESTION_SOLVE: {
            //console.log([...state.finishedQuestionsIDsWithAnswers, payload])
            //console.log(state.examID)
        const tempStateQ= [...state.finishedQuestionsIDsWithAnswers]
        const ind= state.finishedQuestionsIDsWithAnswers.findIndex(e=>e.questionID === payload.answithid.questionID)
        //console.log("payload", payload.questionID)
        //console.log("index:", ind)
        if(ind===-1){
            tempStateQ.push(payload.answithid)
        }
        else{
            tempStateQ.splice(ind, 1, payload.answithid)
        }
        
            axios.post(`https://localhost:5000/activityexamstate/update/${state.examID}/${state.testID}`, 
            {
                ...state,
                finished: payload.finished,
                timeSpent: payload.timeSpent,
                finishedQuestionsIDsWithAnswers: tempStateQ,
            })
            return {
                ...state,
                finished: payload.finished,
                timeSpent: payload.timeSpent,
                finishedQuestionsIDsWithAnswers: tempStateQ,
            }
        }
        case UserDashboardActionTypes.EXAMENV_START_EXAM: {
            return {
                ...state,
                started: true,
                examID: payload.examID,
                clientID: payload.clientID,
                testID: payload.testID,
            }
        }
        case UserDashboardActionTypes.EXAMENV_FETCH_ACTIVITY: {
            return {
                ...payload
            }
        }
        default:
            return state;
    }
}