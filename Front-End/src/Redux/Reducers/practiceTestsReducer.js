import { PracticeTestActionTypes } from "../Constants/practiceTestsActionTypes";
import axios from "axios";
const initialState = {
    practiceTests: [],
    loading: true,
    error: '',
    creating: false,
    creadted: false,
    purchasedPracticeTestsIDs: []
}

export const practiceTestsReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case PracticeTestActionTypes.FETCH_PURCHASED_PRACTICETESTS: {
            //console.log("asfasfdsdf")
            return {
                ...state,
                purchasedPracticeTestsIDs: payload.map(p=>(p.purchasedProductID),[])
            };
        }
        case PracticeTestActionTypes.FETCH_PRACTICETESTS_REQUEST: {
            return {
                ...state,
                creating: false,
                created: false,
            };
        }
        case PracticeTestActionTypes.FETCH_PRACTICETESTS_REQUEST: {
            return {
                ...state,
                loading: true
            };
        }
        case PracticeTestActionTypes.TOGGLE_PRACTICETESTSTATUS: {

            const temp = state.practiceTests.filter((e) => e._id !== payload.id)
            const temp1 = state.practiceTests.filter((e) => e._id === payload.id)
            temp1[0].testStatus = !temp1[0].testStatus
            temp.push(temp1[0])
            temp.sort((a, b) => (a.testCreateDate > b.testCreateDate) - (a.testCreateDate < b.testCreateDate))
            return {
                ...state,
                practiceTests: temp
            }
        }
        case PracticeTestActionTypes.FETCH_PRACTICETESTS_FALIURE: {
            return {
                ...state,
                loading: false,
                practiceTests: [],
                error: payload
            }
        }
        case PracticeTestActionTypes.FETCH_PRACTICETESTS_SUCCESS: {
            return {
                ...state,
                loading: false,
                practiceTests: payload,
                error: ''
            }
        }
        case PracticeTestActionTypes.DELETE_PRACTICETEST: {
            const temp = state.practiceTests.filter((e) => e._id !== payload);
            //console.log(temp)
            axios.delete(`https://exporagenius.com:5000/practicetests/delete/${payload}`)
            return {
                ...state,
                practiceTests: temp
            }
        }
        case PracticeTestActionTypes.EDIT_PRACTICETEST_START: {
            return {
                ...state,
                editing: true,
            }
        }
        case PracticeTestActionTypes.EDIT_PRACTICETEST_FAIL: {
            return {
                ...state,
                creating: false,
                created: false,
            }
        }
        case PracticeTestActionTypes.EDIT_PRACTICETEST: {
            const index = state.practiceTests.findIndex(e => e._id === payload.key)
            const temp = state.practiceTests.filter((e) => e._id !== payload.key);
            temp.splice(index, 1, payload)
            //console.log(temp)
            return {
                ...state,
                practiceTests: temp,
                creating: false,
                created: false,
            }
        }
        case PracticeTestActionTypes.CREATE_PRACTICETEST_START: {
            return {
                ...state,
                creating: true,
            }
        }
        case PracticeTestActionTypes.CREATE_PRACTICETEST_FAIL: {
            return {
                ...state,
                creating: false,
                created: false,
            }
        }
        case PracticeTestActionTypes.CREATE_PRACTICETEST: {
            const temp = [...state.practiceTests];
            temp.push(payload);
            //console.log("payload", payload)
            //console.log("temp", temp)
            return {
                ...state,
                practiceTests: temp,
                creating: false,
                created: true,
            }
        }
        default:
            return state;
    }
}

const selectedPracticeTestInitialState={
    testExamsIDs:[],
    loadingTest: false,
    testLoaded: false,
    editing: false,
    edited: false,
    testExams: [],
    testExamsLoaded: false,
}
export const selectedPracticeTestReducer = (state = selectedPracticeTestInitialState, { type, payload }) => {
    switch (type) {
        
        case PracticeTestActionTypes.SELECTED_PRACTICETEST_RESET: 
            return ({
                ...state,
                editing: false, 
                edited: false
            });
        case PracticeTestActionTypes.SELECTED_PRACTICETEST_REQUESTED:{ 
            return ({
                loadingTest: true,
            });}
        case PracticeTestActionTypes.SELECTED_PRACTICETEST_FETCHED:{ 
            //console.log(payload);
            return ({
                ...payload,
                loadingTest: false,
                editing: false, 
                edited: false,
                testLoaded: true,
                testExamsLoaded: true,
            });}
        case PracticeTestActionTypes.SELECTED_PRACTICETEST_ADDEXAM:
            const temp = state.testExamsIDs
            temp.push(payload)
            //console.log("ids:", temp)
            return ({
                ...state,
                testExamsIDs: [...temp]
            });
        case PracticeTestActionTypes.SELECTED_PRACTICETEST_ADDWSWP:
            const wswp = state.whatStudentWillPractice
            wswp.push(payload)
            //console.log("ids:", wswp)
            return ({
                ...state,
                whatStudentWillPractice: [...wswp]
            });
        case PracticeTestActionTypes.REMOVE_SELECTED_PRACTICETEST_EXAM:
            const temp1 = state.testExamsIDs.filter(e => e !== payload)
            //console.log("state", state)
            return ({
                ...state,
                testExamsIDs: [...temp1]
            });
        case PracticeTestActionTypes.SELECTED_PRACTICETEST_UPDATE_START:
            return (
                {
                    ...state,
                    editing: true,
                }
            )
        case PracticeTestActionTypes.SELECTED_PRACTICETEST_UPDATE_FAIL:
            return (
                {
                    ...state,
                    editing: false,
                    edited: false,
                }
            )
        case PracticeTestActionTypes.SELECTED_PRACTICETEST_UPDATE:
            return (
                {
                    ...payload,
                    editing: false,
                    edited: true,
                }
            )

        default:
            return state;
    }
}