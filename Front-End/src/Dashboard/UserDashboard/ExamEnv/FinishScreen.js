import React, { Component } from 'react';
import styled from 'styled-components';
import logo from "../../../Images/Logo1.svg";

import { Button } from "antd";
import "./FinishScreen.css"

class FinishScreen extends Component {

    render() {
        return (
            <MainContainer>
                <div className='side1'>
                    <object className='logo' data={logo} type="image/svg+xml"></object>
                    <div className='background' >
                    </div>
                </div>
                <Side2>

                    <Header>
                        <div style={{ color: "#30b8c7", fontWeight: "600", fontSize: "2.0rem", textAlign: "center" }}>Congratulations you have just finished</div>
                        {this.props.examInfo.examName} Exam
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
                            this.props.examSession.removeItem("finished")
                            this.props.examSession.removeItem("started")
                            this.props.navigate("/mydashboard/practicetests", {
                            state: {
                                finishedExamID: this.props.examID,
                                finishedExamTestID: this.props.testID 
                            }
                        })}
                        }
                        style={
                            { height: "40px", display: "flex", alignItems: "center", justifyContent: "Space-evenly", padding: "5px" }
                        }>Go to dashboard</Button >

                </Side2>
            </MainContainer>
        );
    }
}
export default FinishScreen;

const MainContainer = styled.div`
display: flex;
align-items: center;
height: 100vh;
overflow: hidden;
`
const Side2 = styled.div`
background: rgb(241, 241, 241, 0.90);
height: 90vh;
width: 55vw;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
gap: 6vh;
`
const Header = styled.h1`
display: flex;
gap: 0.5vw;
font-size: clamp(12px, 2.5vw, 30px);
font-weight: 300;
color: #444444;
flex-direction: column;
justify-content: center;
align-items: center;
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
