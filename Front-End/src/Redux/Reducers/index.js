import { combineReducers } from "redux";
import {  practiceTestsReducer, selectedPracticeTestReducer } from "./practiceTestsReducer";
import {  examsReducer } from "./ExamsReducer";
import { questionsReducer } from './QuestionsReducer';
import { UserDashboardPracticeTestsData } from "./UserDashboardReducers";
import { UserDashboardExamEnv } from "./UserDashboardReducers";
import { examActivityReducer } from "./UserDashboardReducers";
import authReducer from "./UserAuthReducers";
import { cartReducer } from "./CartReducers";

const reducers = combineReducers({
  allPracticeTests: practiceTestsReducer,
  selectedPracticeTest: selectedPracticeTestReducer,
  allExams: examsReducer,
  fetchedQuestions: questionsReducer,
  userPracticeTests: UserDashboardPracticeTestsData,
  ExamEnv: UserDashboardExamEnv,
  examActivity: examActivityReducer,
  auth: authReducer,
  cart: cartReducer,
});
export default reducers;