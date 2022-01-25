import { ExamActionTypes } from "../Constants/ExamActionTypes";
const initialState = {
    exams: [],
    loading: true,
    error:'',
    creating: false,
    created: false,
}

export const examsReducer = (state = initialState, { type, payload }) => {

    switch (type) {
        case ExamActionTypes.RESET: {
            return {
                ...state,
               creating: false,
               created: false,
            }
        }
        case ExamActionTypes.START_CREATING_EXAM: {
            return {
                ...state,
               creating: true,
               created: false,
            }
        }
        case ExamActionTypes.FINISH_CREATING_EXAM: {
            return {
                ...state,
               creating: false,
            }
        }
        case ExamActionTypes.CREATE_EXAM: {
            const temp = [...state.exams];
            temp.push(payload);
            //console.log("temp", temp)
            return {
                ...state,
                exams: temp,
                creating: false,
                created: true,
            }
        }
        case ExamActionTypes.FETCH_EXAMS_REQUEST: {
            return {
                ...state,
                loading: true
            };
        }
        case ExamActionTypes.TOGGLE_EXAMSTATUS:{
            const temp=[...state.exams]
            const index= state.exams.findIndex(x => x.key ===payload[0].key)
            const temp11=  !payload[0].examStatus
            payload[0].examStatus= temp11
            temp.splice(index,1, payload[0])
            return{
                ...state,
                exams: temp
            }
        }
        case ExamActionTypes.DELETE_EXAM:{
            const temp=state.exams.filter((e)=>e.key !== payload);
            //console.log("remexams", temp)
            return{
                ...state,
                exams: temp
            }
        }
        case ExamActionTypes.UPDATE_EXAM_START:{
            return{
                ...state,
                creating:true,
                created: false,
            }
        }
        case ExamActionTypes.UPDATE_EXAM_FAIL:{
            return{
                ...state,
                creating: false,
                created:false,
            }
        }
        case ExamActionTypes.UPDATE_EXAM:{
            const temp=[...state.exams]
            const index= state.exams.findIndex(x => x.key ===payload.key)
            temp.splice(index,1, payload)
            return{
                ...state,
                exams: temp,
                created:true,
                creating: false,
            }
        }
        case ExamActionTypes.FETCH_EXAMS_SUCCESS: {
            return {
                ...state,
                exams:payload,
                loading: false
            };
        }
        case ExamActionTypes.FETCH_EXAMS_FALIURE: {
            return {
                ...state,
                loading: false
            };
        }
        default: {
            return state;
        }
    }
}