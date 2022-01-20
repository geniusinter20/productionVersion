import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import StartScreen from "./StartScreen";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {fetchUserExamInfo} from "../../../Redux/Actions/UserDashboardActions"
import { useDispatch, useSelector} from 'react-redux'
import examEnvBackground from "../../../Images/examEnvBackground.jpg";
import QuestionsForm from "./QuestionsForm"
import ReviewForm from "./ReviewForm"
import "./examEnv.css";
import { startExam } from '../../../Redux/Actions/UserDashboardActions';
import { fetchActivity } from '../../../Redux/Actions/UserDashboardActions';
import FinishScreen from './FinishScreen';
import { Tabs } from 'antd';
import ScoreBoard from './ScoreBoard';

const { TabPane } = Tabs;
function ExamEnv(props) {
    const examSession = window.sessionStorage;
    const dispatch= useDispatch();
    const params = useParams();
    const navigate= useNavigate()
    const {state}= useLocation();
    const [started, setStarted]= useState(examSession.getItem("started")? examSession: false);
    const [finished, setFinished]= useState(false);
    const examInfo= useSelector(state => state.ExamEnv.examInfo);
    const questions= useSelector(state => state.ExamEnv.questions);
    useEffect(() => {
        //console.log(params.id)
        dispatch(fetchUserExamInfo(params.id))
    }, [])
    useEffect(() => {
       dispatch(fetchActivity(params.id, state.testID))
    }, [questions])
    useEffect(() => {
        
    }, [])

    const setExamStarted= ()=>{
        examSession.setItem("started", 1)
        window.location.reload()
        //setStarted(true);
        dispatch(startExam({
        clientID: null,
        examID: params.id,
        finished: false,
        started:true,
        finishedQuestionsIDsWithAnswers: [],
        timeSpent: 0,
        testID: state.testID,
        }))
    }
    useEffect(() => {
        if(examSession.getItem("finished")) setFinished(true)
    }, [examSession.getItem("finished")])
    //console.log("started", started)
    if(state.envType==="review") {
        return (
            <MainContainer>
                    <img src={examEnvBackground} />
                    <Gradient/>
               {/* <div style={{position:"absolute", width:"100%", height:"100%", overflow:"hidden", margin:0}}>

                     <div className='pageBackground'>
                       <div className='gradient'></div>
                       
                   </div> 
                   </div>*/}
                 
         <MyTabs defaultActiveKey="1" onChange={null} style={{backgroundColor: "white", position:"relative"}}>
    <TabPane tab="Review" key="review">
      {<ReviewForm setFinished={setFinished} examSession={examSession} 
                   questions={questions !== undefined? questions: []} examInfo={examInfo} 
                   envType={state.envType} navigate={navigate} examID={params.id}
                   testID={state.testID}
                   />}
    </TabPane>
    <TabPane tab="Score Board" key="scoreboard">
    {<ScoreBoard setFinished={setFinished} examSession={examSession} 
                   questions={questions !== undefined? questions: []} examInfo={examInfo} 
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
              <div className='pageBackground'>
                    <div className='gradient'></div>
                    <img src={examEnvBackground} />
                </div>
                {started && !finished ? 
                <QuestionsForm examID={examInfo.key} navigate={navigate} setFinished={setFinished} examSession={examSession} questions={questions !== undefined? questions: []} examInfo={examInfo} /> 
                : !finished? <StartScreen setStarted={setExamStarted} examInfo={examInfo}/>
                :<FinishScreen testID={state.testID} examID={examInfo.key} navigate={navigate} examInfo={examInfo} examSession={examSession}></FinishScreen>}
         </MainContainer>
    );
}

export default ExamEnv;

const PageBackground= styled.div`
position: absolute;
overflow: hidden;
width:102%;
height: 102%;
top: -9999px;
    left: -9999px;
    right: -9999px;
    bottom: -9999px;
    margin: auto;
    object-fit: cover;
    object-position: 50% 0;
`

const Gradient= styled.div`
position: absolute;
width: 100%;
height: 100%;
background-image: linear-gradient(to right, #3c3c3c , #5bcad6);
mix-blend-mode: multiply;
backdrop-filter: grayscale(100%) blur(8px);
`
const MainContainer = styled.div`
display: flex;
position: relative;
align-items: center;
justify-content: center;
min-height: 100vh;
overflow: hidden;
&>img{
    width:102%;
    height: 102%;
    position: fixed;
    top: -9999px;
    left: -9999px;
    right: -9999px;
    bottom: -9999px;
    margin: auto;
    object-fit: cover;
    object-position: 50% 0;
    z-index: -1;   
}
`
const MyTabs = styled(Tabs)`
position: relative;
background-color: white;
margin: 30px;
&>*:nth-child(1){
    padding-left: 2vw;
    padding-top: 1vh;
}
`

// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import styled from 'styled-components';
// import StartScreen from "./StartScreen";
// import {fetchUserExamInfo} from "../../../Redux/Actions/UserDashboardActions"

// function mapStateToProps(state) {
//     return {

//     };
// }

// function mapDispatchToProps(dispatch) {
//     return {
//         fetchUserExamInfo: (id)=> dispatch(fetchUserExamInfo(id))
//     };
// }



// class ExamEnv extends Component {

// componentDidMount(){
    
//     //this.props.fetchUserExamInfo(this.props.match.params.id)
// }

//     state = {
//         started: false,
//     }
    
//     render() {
//         console.log(this.props)
//         //console.log("exam:", )
//         return (
//             <div>
//                 {this.state.started ? <div>started !</div> : <StartScreen/>}
//             </div>

//         );
//     }
// }



// export default connect(mapStateToProps, mapDispatchToProps)(ExamEnv);