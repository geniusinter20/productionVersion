import { ExamActionTypes } from "../Constants/ExamActionTypes";
const initialState = {
    exams: [],
    loading: true,
    error:'',
}

export const examsReducer = (state = initialState, { type, payload }) => {

    switch (type) {
        case ExamActionTypes.FETCH_EXAMS_REQUEST: {
            return {
                ...state,
                loading: true
            };
        }
        case ExamActionTypes.TOGGLE_EXAMSTATUS:{
            const temp= state.exams.filter((e)=>e.key!==payload[0].key)
            const index= state.exams.findIndex(x => x.key ===payload[0].key)
            const temp11=  !payload[0].examStatus
            payload[0].examStatus= temp11
            temp.splice(index,0, payload[0])
            return{
                ...state,
                exams: temp
            }
        }
        case ExamActionTypes.DELETE_EXAM:{
            const temp=state.exams.filter((e)=>e.key !== payload);
            console.log("remexams", temp)
            return{
                ...state,
                exams: temp
            }
        }
        case ExamActionTypes.UPDATE_EXAM:{
            console.log("payload",payload)
            // const index= state.exams.findIndex(x => x.key ===payload.key)
            // const temp=state.exams.filter((e)=>e._id !== payload);

            return{
                ...state,
                //exams: temp
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