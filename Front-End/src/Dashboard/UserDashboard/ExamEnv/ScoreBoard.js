import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import styled from 'styled-components';
import { Divider, Tag, Progress, Table } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ScoreBoard(props) {
    const userData = useSelector(state => state.auth.userData)
    const examActivity = useSelector(state => state.examActivity)
    const [score, setScore] = useState("NotPassed");
    const [correctQuestionNum, setCorrectQuestionsNum] = useState(0)
    useEffect(() => {
        //const activity= examActivity
        var rateVal = -1;
        var count = 0;
        examActivity.finishedQuestionsIDsWithAnswers.forEach(
            q => {
                if (q.answer.isAnswer) {
                    count = count + 1;
                }
            })
        rateVal = (count / props.examInfo.examQuestionsIDs.length) * 100
        setScore(rateVal)
        setCorrectQuestionsNum(count)
    }, [])
    return (

        <MainContainer>
            <div style={{ display: "flex", alignItems: 'center', gap: "3px", color: "#969696" }}>
                {userData.fullName.toUpperCase()}
                <Divider type="vertical" style={{ borderWidth: "2px", height: "20px", backgroundColor: "#969696" }} />
                {props.examInfo.examName}
            </div>
            <div style={{ display: "flex", alignItems: 'center', gap: "3px", color: "#6c6c6c", fontWeight: "600" }}>
                Your Overall Result:
                {
                    score >= props.examInfo.examPasinRate ?
                        <Tag className="tagPassed" icon={<CheckCircleOutlined style={{ color: "#52c41a" }} className="icon" />} color="success">
                            PASSED
                        </Tag>
                        :
                        <Tag className="tagNotPassed" icon={<CloseCircleOutlined style={{ color: "#ff4d4f" }} className="icon" />} color="error">
                            NOT PASSED
                        </Tag>
                }
            </div>
            <ProgressBar>

                <Progress
                    className="prog"
                    color="info"
                    max={100}
                    percent={Math.floor(score)}
                    strokeColor={Math.floor(score) >= props.examInfo.examPasinRate ?
                        {
                            '0%': '#E7E7E7',
                            '100%': '#52c41a',
                        } :
                        {
                            '0%': '#E7E7E7',
                            '100%': '#ff4d4f',
                        }
                    }
                />
                <div className="label">
                    {
                        //console.log(score< props.examInfo.examPasinRate)
                        score <= 30 ? <div style={{ color: "#ff4d4f" }}>Need Improvment</div> : score < props.examInfo.examPasinRate ? <div style={{ color: "#ff4d4f" }}>Below Target</div> : <div style={{ color: "#52c41a" }}>Target Achived</div>
                    }
                </div>
            </ProgressBar>
            <div>
                <div style={{ fontWeight: "600", fontSize: "17px", color: "#444444" }}>
                    How is your score Determinated?
                </div>
                <div style={{ fontWeight: "400", fontSize: "14px", color: "#6c6c6c", marginTop: "5px" }}>
                    PMI uses subject matter experts—project professionals from around the world and from many
                    different disciplines—to determine how many questions you must answer correctly to pass the exam.
                    Each scored question on the exam is worth one point; and your final score is calculated by totaling
                    the points you have earned on the exam. The number of questions you answer correctly places you within
                    one of the performance rating categories you see on this report.
                </div>
            </div>
            <div style={{ fontWeight: "600", fontSize: "17px", color: "#444444" }}>
                Result Breakdown
            </div>
            <Table columns={[
                {
                    title: 'Exam',
                    dataIndex: 'examName',
                    width: "40%",
                },
                {
                    title: 'No. Questions',
                    dataIndex: 'questionNumber',
                },
                {
                    title: 'Correct Answers',
                    dataIndex: 'correctAnswersNumber',
                },
                {
                    title: '%Correct',
                    dataIndex: "score"
                },
                {
                    title: 'Time Spent',
                    dataIndex: "timeSpent",
                    render: e => `${e} Minutes`
                },
            ]} dataSource={[{
                examName: props.examInfo.examName,
                questionNumber: props.examInfo.examQuestionsIDs.length,
                correctAnswersNumber: correctQuestionNum,
                score: Math.floor(score),
                timeSpent: examActivity.timeSpent
            }]}
                size="middle"
                pagination={{ position: ["none"] }}
            />
            <div style={{ margin: "2vh 0 2vh 0" }}>
                <div style={{ fontWeight: "600", fontSize: "17px", color: "#444444", }}>
                    What Can You Do Next?
                </div>
                <ul style={{ fontWeight: "400", fontSize: "14px", color: "#6c6c6c", marginTop: "5px" }}>
                <li>Check your email. Look for more information on when your certificate will be delivered.</li>
                <li>Start thinking about your future professional development. Learning more about your exam performance is
                     a great way to start. See our web page for more details on how you performed in each area of
                    the exam and to get more ideas on what to do next.</li>

                </ul>
            </div>
        </MainContainer>

    )
}


const MainContainer = styled.div`
width: 75vw;
position: relative;
background-color: rgb(255, 255, 255, 0.95);
display: flex;
justify-content: flex-start;
flex-direction: column;
padding: 2vh 2vw 2vh 2vw;
gap: 2vh;
`
const ProgressBar = styled.div`
display: grid;
grid-template-columns: 86% 13%;
grid-column-gap: 1%;
width: 100%;
margin-top: 2vh;
margin-bottom: 2vh;

&> .label{
    justify-self: start;
    align-self: center;
    font-size: 17px;
    font-weight: 600;
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