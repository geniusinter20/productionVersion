import React, { Component } from 'react';
import styled from 'styled-components';
import logo from "../../../Images/Logo1.svg";
import { Button, Row, Col } from "antd";
import "./FinishScreen.css"

function FinishScreen(props) {
    return (
        <MainContainer>
            <Col xs={{span: 0}} xl={{span: 8}} className='side1'>
                <object className='logo' data={logo} type="image/svg+xml"></object>
                <div className='background' >
                </div>
            </Col>
            <Side2 xs={{ span: 24 }} md={{ span: 20 }} xl={{ span: 12 }}>
                <Header>
                    <div style={{ color: "#30b8c7", fontWeight: "600", fontSize: "2.0rem", textAlign: "center" }}>Congratulations you have just finished</div>
                    {props.examInfo.examName} Exam
                </Header>
                {/*
                    <div style={{ alignSelf: "flex-start", fontSize: "14px", color: "#6C6C6C", fontWeight:"600" }}>
                        {`Exam Period: ${Math.floor(this.props.examInfo.examPeriod/60)}:${this.props.examInfo.examPeriod}:00`}</div>
                    <div style={{ alignSelf: "flex-start", fontSize: "14px", color: "#6C6C6C" }}>Please read the following instruction carefuly before proceding to the exam</div>
                
                     */}
                <Button type="primary"
                    className='button1'
                    shape="round"
                    onClick={() => {
                        props.examSession.removeItem("finished")
                        props.examSession.removeItem("started")
                        props.navigate("/mydashboard/practicetests", {
                            state: {
                                finishedExamID: props.examID,
                                finishedExamTestID: props.testID
                            }
                        })
                    }
                    }
                    style={
                        { height: "40px", display: "flex", alignItems: "center", justifyContent: "Space-evenly", padding: "5px" }
                    }>Go to dashboard</Button >

            </Side2>
        </MainContainer>
    );
}
export default FinishScreen;

const MainContainer = styled(Row)`
display: flex;
align-items: center;
height: 100vh;
width: 100vw;
justify-content: center;
overflow: hidden;
`
const Side2 = styled(Col)`
background: rgb(241, 241, 241, 0.90);
height: 90vh;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
gap: 4vh;
@media  (max-width: 576px) {
    height: 100%; 
}
`
const Header = styled.h1`
display: flex;
gap: 10px;
font-size: 2.0rem;
font-weight: 300;
color: #444444;
flex-direction: column;
justify-content: center;
align-items: center;
width: 85%;
text-align: center;
`
const Sections = styled.div`
display: flex;
gap: 4%;
flex-wrap:wrap;
align-items: center;
justify-content: center;
margin-top: 2vh;
`
const SubSection = styled.div`
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: center;
height: 22vh;
width: 30%;
gap: 1vw;
`
