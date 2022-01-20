import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Progress } from 'antd';
import { Button, Statistic, message } from 'antd';
import { ArrowRightOutlined, ArrowLeftOutlined } from '@ant-design/icons'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./QuestionForm.css";
import MultipleChoiceQuestion from './MultipleChoiceQuestion';
import OrderingQuestion from './OrderingQuestion';
import { questionSolved } from '../../../Redux/Actions/UserDashboardActions';
import MatchingQuestion from "./MatchingQuestion"
function mapStateToProps(state) {
    const examActivity= state.examActivity
    const len= state.examActivity.finishedQuestionsIDsWithAnswers;
    return {
        examActivity: examActivity,
        len: len,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        questionSolved: (answithid, finished, time)=> dispatch(questionSolved(answithid, finished, time))
    };
}
const { Countdown } = Statistic;
//deadline = Date.now() + 1000 * 60 * this.state.examInfo.examPeriod;
class QuestionsForm extends Component {
    state = {
        //currentQuestionNo: 1,
        loadingData: true,
        examInfo: this.props.examInfo,
        questions: this.props.questions,
        loadingQuestions: true,
        answerwithid:null,
    }
    componentDidMount() {
        const session = this.props.examSession
        if (!session.getItem("currentQuestionNo")) {
            session.setItem("currentQuestionNo", 1)
        }
        //console.log(JSON.parse(session.getItem("questionsAnswers")))
        this.setState({
            currentQuestionNo: session.getItem("currentQuestionNo") ? parseInt(session.getItem("currentQuestionNo"), 10) : 1,
        })
    }

    static getDerivedStateFromProps(props, state) {
        const session = props.examSession
        if (state.examInfo !== props.examInfo) {
            //console.log("currentQuestionNo", parseInt(session.getItem("remainingTime")))
            return {
                examInfo: props.examInfo,
                examPeriod: session.getItem("remainingTime") ? Date.now() + 1000 * parseInt(session.getItem("remainingTime")) : Date.now() + 1000 * 60 * props.examInfo.examPeriod,
                loadingData: false,
                currentQuestionNo: session.getItem("currentQuestionNo") ? parseInt(session.getItem("currentQuestionNo"), 10) : 1,
            }

        }

        if (state.questions !== props.questions) {
            return {
                questions: props.questions,
                loadingQuestions: false,
            }
        }
    }
    handleNext = () => {
        const session = this.props.examSession;
        const timeSpent= (this.props.examInfo.examPeriod-(Math.floor(parseInt(session.getItem("remainingTime"))/60)))
        
        if(this.state.answerwithid!== null || this.props.len.length> this.state.currentQuestionNo-1){
            this.setState(prevState => ({
            currentQuestionNo: prevState.currentQuestionNo + 1
        }))
        if(this.state.answerwithid!== null){
            //console.log("time",timeSpent)
            this.props.questionSolved(this.state.answerwithid, false, timeSpent)
        }
        this.setState({answerwithid: null})
        session.setItem("currentQuestionNo", parseInt(session.getItem("currentQuestionNo"), 10) + 1)
        }
        //this.setState({answerwithid: null})
        //console.log("currentQuestionNo", session.getItem("currentQuestionNo"))
    }
    handlePrevious = () => {
        const session = this.props.examSession;

        this.setState(prevState => ({
            currentQuestionNo: prevState.currentQuestionNo - 1
        }))
        session.setItem("currentQuestionNo", parseInt(session.getItem("currentQuestionNo"), 10) - 1)
        this.setState({answerwithid: null})
        //this.setState({answerwithid: this.props.len[this.state.currentQuestionNo]})
    }
    handleFinish = () => {
        const session = this.props.examSession;
        const timeSpent= (this.props.examInfo.examPeriod-(Math.floor(parseInt(session.getItem("remainingTime"))/60)))
        session.setItem("finished",1);
        if(this.state.answerwithid!== null){
            this.props.questionSolved(this.state.answerwithid, true , timeSpent)
        }
        this.props.setFinished(true);
        //this.setState({answerwithid: this.props.len[this.state.currentQuestionNo]})
        session.removeItem("currentQuestionNo")
        
    }
    handleTimeFinish= ()=>{
        this.timeRunsUp()
        const session = this.props.examSession;
        session.setItem("finished",1);
        session.removeItem("currentQuestionNo")
    }
    setAnswerToNull=()=>{
        this.setState({answerwithid: null})
    }
    setAnswer= (id,ans)=>{
        //console.log("ans:", { questionID: id, answer: ans[0] })
        this.setState({answerwithid: { questionID: id, answer: ans }})
    }
     timeRunsUp = () => {
        message.info(<div>Exam Period Finished, You will be redirected to the dashborad after <Countdown onFinish={()=>
            {this.props.navigate("/mydashboard/practicetests", {
                state:{
                    finishedExamID: this.props.examID
                }
            })
        }} value={Date.now() + 10 * 1000} /> </div>, 10);
      };
      renderQuestion=(question)=>{
          switch (question.qesType) {
              case "ordering":
                  return(
                       <OrderingQuestion setAnswerToNull={this.setAnswerToNull}
                    setAnswer={this.setAnswer} question={question} 
                    currentQuestionNo={this.state.currentQuestionNo}
                    ></OrderingQuestion>
                    )
              case "multipleChoice":  
                  return(
                    <MultipleChoiceQuestion  setAnswerToNull={this.setAnswerToNull}
                    setAnswer={this.setAnswer} question={question}  
                    currentQuestionNo={this.state.currentQuestionNo}
                    ></MultipleChoiceQuestion>
                  )
              case "matching":
                return(
                    <MatchingQuestion setAnswerToNull={this.setAnswerToNull}
                    setAnswer={this.setAnswer} question={question}  
                    currentQuestionNo={this.state.currentQuestionNo}
                    ></MatchingQuestion>
                  )
              default:
                  return(<div/>)
          }
      }
    render() {
        //console.log("answers:", this.state.questionsAnswers)
        //console.log("questions", this.props.examActivity)
        //console.log(this.state.answerwithid)
        const { examInfo, loadingData, loadingQuestions, currentQuestionNo } = this.state;
        const question = this.state.questions[this.state.currentQuestionNo - 1];
        const questionSolved= this.state.answerwithid !== null || this.props.len.length> this.state.currentQuestionNo-1
        //console.log(questionSolved)
        return (
            <MainContainer>
                <ProgressBar>

                    <Progress
                        className="prog"
                        showInfo={false}
                        percent={this.state.currentQuestionNo/this.state.questions.length*100}
                        strokeColor={
                            {
                                '0%': '#E7E7E7',
                                '100%': '#5BCAD6',
                            }
                        }
                    />
                    <div className="label">
                        {`Question ${this.state.currentQuestionNo} of ${this.state.questions.length}`}
                    </div>
                </ProgressBar>
                <QHead >
                    {`Question #${this.state.currentQuestionNo}`}
                </QHead>
                {!loadingQuestions && this.renderQuestion(question)}
                <Buttons>
                    {
                        currentQuestionNo > 1 ? <Button type="primary"
                            className='button3'
                            shape="round"
                            onClick={this.handlePrevious}
                            style={
                                { height: "40px", width: "100px", display: "flex", alignItems: "center", justifyContent: "center", padding: "5px" }
                            }>
                            <ArrowLeftOutlined style={{
                                color: "white"
                            }} />
                            Previous
                        </Button >
                            : <Button type="primary"
                                className='button3'
                                shape="round"
                                onClick={this.handlePrevious}
                                style={
                                    { height: "40px", width: "100px", display: "flex", alignItems: "center", justifyContent: "center", padding: "5px" }
                                }
                                disabled
                            >
                                <ArrowLeftOutlined style={{
                                    color: "white"
                                }} />
                                Previous
                            </Button >
                    }
                    {
                        !loadingData &&  questionSolved ?(
                        currentQuestionNo < examInfo.examQuestionsIDs.length?
                        <Button type="primary"
                            className='button2'
                            shape="round"
                            onClick={this.handleNext}
                            style={
                                { height: "40px", width: "100px", display: "flex", alignItems: "center", justifyContent: "center", padding: "5px" }
                            }>Next
                            <ArrowRightOutlined style={{
                                color: "white"
                            }} /></Button >
                            :
                            <Button type="primary"
                            className='button2'
                            shape="round"
                            onClick={this.handleFinish}
                            style={
                                { height: "40px", width: "100px", display: "flex", alignItems: "center", justifyContent: "center", padding: "5px" }
                            }>Finish
                            <ArrowRightOutlined style={{
                                color: "white"
                            }} /></Button >
                        ):
                        !loadingData && currentQuestionNo < examInfo.examQuestionsIDs.length ?
                            <Button type="primary"
                                className='button2'
                                shape="round"
                                onClick={this.handleNext}
                                style={
                                    { height: "40px", width: "100px", display: "flex", alignItems: "center", justifyContent: "center", padding: "5px" }
                                }
                                disabled
                            >Next
                                <ArrowRightOutlined style={{
                                    color: "white"
                                }} />
                            </Button >:
                            <Button type="primary"
                                className='button2'
                                shape="round"
                                onClick={this.handleFinish}
                                style={
                                    { height: "40px", width: "100px", display: "flex", alignItems: "center", justifyContent: "center", padding: "5px" }
                                }
                                disabled
                            >Finish
                                <ArrowRightOutlined style={{
                                    color: "white"
                                }} />
                            </Button >
                            
                    }
                </Buttons>
                <SubHeader>
                    <div style={{
                        color: "#6C6C6C",
                        fontSize: "14px",

                    }}
                    >Make sure to finish all question befor time runs up!</div>
                    <Countdown valueStyle={{
                        fontSize: "16px",
                        color: "#49a9ee",
                        fontWeight: "600"
                    }} value={ this.state.examPeriod}
                        onChange={(value) => this.props.examSession.setItem("remainingTime", Math.floor(value / 1000))}
                        onFinish={this.handleTimeFinish}
                        prefix={<div style={{ color: "#444444" }}>Remaining time:</div>} />
                </SubHeader>

            </MainContainer>
        );
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(QuestionsForm);


const MainContainer = styled.div`
width: 75vw;
position: relative;
background-color: rgb(255, 255, 255, 0.95);
display: flex;
justify-content: flex-start;
align-items: center;
flex-direction: column;
padding: 2vh 2vw 2vh 2vw;
gap: 2vh;
`
const Buttons = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
justify-self: flex-end;
width: 100%;
margin-top: 2vh;
margin-bottom: 2vh;
`
const SubHeader = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
width: 100%;
`
const ProgressBar = styled.div`
display: grid;
grid-template-columns: 85% 13%;
grid-column-gap: 2%;
width: 100%;

&> .label{
    justify-self: start;
    align-self: center;
    font-size: 16px;
    font-weight: 500;
    color: #6c6c6c;
}
&> .prog{
    align-self: center;
    &>*:nth-child(2){
        font-weight: 600;
    }
    &>*>*>*{
        height: 35px !important;
        border-radius: 5px;
    }
    &>*>*{
        height: 35px;
        border-radius: 5px;
    }
}
`
const QHead = styled.div`
font-size: clamp(17px,1.5vw,28px);
align-self: flex-start;
`

const Options = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
flex-wrap: wrap;
width: 100%;
padding: 10px;
gap: 2vh;
`
const Option = styled.div`
display: flex;
justify-content: flex-start;
border-style: solid;
width: 100%;
font-size: clamp(11px, 15, 18px);
border-color: #ABABAB;
padding: 10px;
border-width: 1px;
border-radius: 10px;
color: #444444;
font-weight: 600;

`