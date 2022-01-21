import { PracticeTestActionTypes } from "../Constants/practiceTestsActionTypes";
import axios from "axios";
const initialState = {
    practiceTests: [],
    loading: true,
    error: '',
}

export const practiceTestsReducer = (state = initialState, { type, payload }) => {

    switch (type) {
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
                loading: false,
                practiceTests: [],
                error: payload
            }
        }
        case PracticeTestActionTypes.FETCH_PRACTICETESTS_SUCCESS: {
            return {
                loading: false,
                practiceTests: payload,
                error: ''
            }
        }
        case PracticeTestActionTypes.DELETE_PRACTICETEST: {
            const temp = state.practiceTests.filter((e) => e._id !== payload);
            //console.log(temp)
            axios.delete(`http://localhost:5000/practicetests/delete/${payload}`)
            return {
                ...state,
                practiceTests: temp
            }
        }
        case PracticeTestActionTypes.EDIT_PRACTICETEST: {
            const index = state.practiceTests.findIndex(e => e._id === payload.key)
            const temp = state.practiceTests.filter((e) => e._id !== payload.key);
            temp.splice(index, 1, payload)
            //console.log(temp)
            return {
                ...state,
                practiceTests: temp
            }
        }
        case PracticeTestActionTypes.CREATE_PRACTICETEST: {
            const temp = [...state.practiceTests];
            temp.push(payload);
            //console.log("payload", payload)
            console.log("temp", temp)
            return {
                ...state,
                practiceTests: temp
            }
        }
        default:
            return state;
    }
}


export const selectedPracticeTestReducer = (state = {loadingTest: true}, { type, payload }) => {
    switch (type) {
        case PracticeTestActionTypes.SELECTED_PRACTICETEST:
            const {
                testTitle,
                testType,
                testCategory,
                testImageID,
                testPrice,
                testRate,
                testValidationPeriod,
                testDescription,
                testExamsIDs,
                testBrief,
                testInstructorID,
                whatStudentWillPractice,
                testNo,
                testStatus,
                testExamsNumber,
                testCreatedDate,
                loadingTest,
            } = payload
            return (
                {
                    testTitle,
                    testType,
                    testCategory,
                    testImageID,
                    testPrice,
                    testRate,
                    testValidationPeriod,
                    testDescription,
                    testExamsIDs,
                    testBrief,
                    testInstructorID,
                    whatStudentWillPractice,
                    testNo,
                    testStatus,
                    testExamsNumber,
                    testCreatedDate,
                    loadingTest
                }
            );
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
            console.log("ids:", wswp)
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
        case PracticeTestActionTypes.SELECTED_PRACTICETEST_UPDATE:
            console.log("payload:", payload)
                axios.post(`http://localhost:5000/practicetests/update/${payload.key}`
                    ,
                    {
                        ...state,
                        key: payload.key,
                        testTitle: payload.testTitle,
                        testPrice: payload.testPrice,
                        testType: payload.testType,
                        testCategory: payload.testCategory,
                        testImageID: payload.testImageID,
                        testValidationPeriod: payload.testValidationPeriod,
                        testDescription: payload.testDescription,
                        testBrief: payload.testBrief,
                        whatStudentWillPractice: payload.whatStudentWillPractice
                    }
                )
           
            return (
                {
                    ...state,
                    key: payload.key,
                    testTitle: payload.testTitle,
                    testPrice: payload.testPrice,
                    testType: payload.testType,
                    testCategory: payload.testCategory,
                    testImageID: payload.testImageID,
                    testValidationPeriod: payload.testValidationPeriod,
                    testDescription: payload.testDescription,
                    testBrief: payload.testBrief,
                    whatStudentWillPractice: payload.whatStudentWillPractice
                }
            )

        default:
            return state;
    }
}