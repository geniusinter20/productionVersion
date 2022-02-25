import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import StartScreen from "./StartScreen";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { fetchUserExamInfo } from "../../../Redux/Actions/UserDashboardActions"
import { useDispatch, useSelector } from 'react-redux'
import examEnvBackground from "../../../Images/examEnvBackground.jpg";
import QuestionsForm from "./QuestionsForm"
import ReviewForm from "./ReviewForm"
import "./examEnv.css";
import { startExam } from '../../../Redux/Actions/UserDashboardActions';
import { fetchActivity } from '../../../Redux/Actions/UserDashboardActions';
import FinishScreen from './FinishScreen';
import { Tabs, Row } from 'antd';
import ScoreBoard from './ScoreBoard';

const { TabPane } = Tabs;
function ExamEnv(props) {
    const examSession = window.sessionStorage;
    const dispatch = useDispatch();
    const params = useParams();
    const navigate = useNavigate()
    const { state } = useLocation();
    const [started, setStarted] = useState(examSession.getItem("started") ? true : false);
    const [finished, setFinished] = useState(false);
    const examInfo = useSelector(state => state.ExamEnv.examInfo);
    const questions = useSelector(state => state.ExamEnv.questions);
    const activityc = useSelector(state => state.examActivity.activityCreated);
    const auth = useSelector(state => state.auth)
    const [activityCreated, setActivityCreated] = useState(false)
    useEffect(() => {
        //console.log(params.id)
        dispatch(fetchUserExamInfo(params.id))
    }, [])
    useEffect(() => {
        if (state.envType === "review") dispatch(fetchActivity(params.id, state.testID, auth.userData._id))
        else if ((started || activityc) && auth.loggedIn) dispatch(fetchActivity(params.id, state.testID, auth.userData._id))
        //if(started||activityc) console.log("fetch",params.id, state.testID,auth.userData._id);
    }, [questions, started, activityc, auth.loggedIn])
    useEffect(() => {
        if (activityc) {
            examSession.setItem("started", 1)
            window.location.reload()
        }
    }, [activityc])

    const setExamStarted = () => {
        //
        dispatch(startExam({
            clientID: auth.userData._id,
            examID: params.id,
            finished: false,
            started: true,
            finishedQuestionsIDsWithAnswers: [],
            timeSpent: 0,
            testID: state.testID,
            startDate: new Date(),
        }))
    }
    useEffect(() => {
        if (examSession.getItem("finished")) setFinished(true)
    }, [examSession.getItem("finished")])
    //console.log("started", started)
    if (state.envType === "review") {
        return (
            <MainContainer>
                <MyTabs defaultActiveKey="1" onChange={null} style={{ backgroundColor: "white", position: "relative" }}>
                    <TabPane tab="Review" key="review">
                        {<ReviewForm setFinished={setFinished} examSession={examSession}
                            questions={questions !== undefined ? questions : []} examInfo={examInfo}
                            envType={state.envType} navigate={navigate} examID={params.id}
                            testID={state.testID}
                        />}
                    </TabPane>
                    <TabPane tab="Score Board" key="scoreboard">
                        {<ScoreBoard setFinished={setFinished} examSession={examSession}
                            questions={questions !== undefined ? questions : []} examInfo={examInfo}
                            envType={state.envType} navigate={navigate} examID={params.id}
                            testID={state.testID}
                        />}
                    </TabPane>

                </MyTabs>

            </MainContainer>
        );
    }
    //console.log(state)
    else return (
        <MainContainer>
            {started && !finished ?
                <QuestionsForm examID={examInfo.key} navigate={navigate} setFinished={setFinished} examSession={examSession} questions={questions !== undefined ? questions : []} examInfo={examInfo} />
                : !finished ? <StartScreen setStarted={setExamStarted} examInfo={examInfo} />
                    : <FinishScreen testID={state.testID} examID={examInfo.key} navigate={navigate} examInfo={examInfo} examSession={examSession}></FinishScreen>}
        </MainContainer>
    );
}

export default ExamEnv;


const MainContainer = styled(Row)`
display: flex;
align-items: center;
justify-content: center;
min-height: 100vh;
padding: 4vh 4vw 4vh 4vw !important;
@media  (max-width: 576px) {
    padding: 0 !important;
}
overflow: hidden;
background: linear-gradient(-45deg, #000000, #242424, #484848, #6C6C6C);
background-size: 400% 400%;
animation: gradient1 15s ease infinite;
@keyframes gradient1 {
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
}

`
const MyTabs = styled(Tabs)`
position: relative;
background-color: white;
width: 100%;
width: 85vw;
@media  (max-width: 876px) {
   width: 95vw;
}
@media  (max-width: 576px) {
   width: 100vw;
   padding: 2vh 2vw 2vh 2vw;
}
&>*:nth-child(1){
    padding-left: 2vw;
    padding-top: 1vh;
}
`

