import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import logo from "../../../Images/Logo1.svg";

import { CgMouse } from 'react-icons/cg';
import { IoIosLaptop } from 'react-icons/io';
import { BsListCheck } from 'react-icons/bs';
import { RiTerminalWindowLine } from 'react-icons/ri';
import { ImConnection } from 'react-icons/im';
import { BsPlusSquareDotted } from "react-icons/bs";
import { Button } from "antd";
import "./StartScreen.css"

class StartScreen extends Component {

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
                        Welcome to <div style={{ color: "#30b8c7", fontWeight: "600", fontSize: "2.4rem", textAlign: "center" }}>{this.props.examInfo.examName}</div>
                    </Header>
                    <div style={{ alignSelf: "flex-start", fontSize: "14px", color: "#6C6C6C", fontWeight:"600" }}>
                        {`Exam Period: ${Math.floor(this.props.examInfo.examPeriod/60)}:${this.props.examInfo.examPeriod}:00`}</div>
                    <div style={{ alignSelf: "flex-start", fontSize: "14px", color: "#6C6C6C" }}>Please read the following instruction carefuly before proceding to the exam</div>
                    <Sections>
                        <SubSection><ImConnection className='icon' /><div className="subTitle">Make sure to have a stable internet connection</div></SubSection>
                        <SubSection><BsListCheck className='icon' /><div className="subTitle">Read questions carefuly</div></SubSection>
                        <SubSection><RiTerminalWindowLine className='icon' /><div className="subTitle">Do not close the browser window or you will be disqualified from the exam</div></SubSection>
                        <SubSection><IoIosLaptop className='icon' /><div className="subTitle">Make sure to finish the exam in one sitting</div></SubSection>
                        <SubSection><CgMouse className='icon' /><div className="subTitle">Make Sure to click on the next button to save your Progress</div></SubSection>
                    </Sections>
                    
                    <Buttons>
                    <Button type="primary"
                            className='button1'
                            shape="round"
                            style={
                                { height: "40px", width: "100px", display: "flex", alignItems: "center", justifyContent: "Space-evenly", padding: "5px" }
                            }>Back</Button >
                        <Button type="primary"
                            className='button'
                            shape="round"
                            onClick={this.props.setStarted}
                            style={
                                { height: "40px", width: "100px", display: "flex", alignItems: "center", justifyContent: "Space-evenly", padding: "5px" }
                            }>Start</Button >
                    </Buttons>
                </Side2>
            </MainContainer>
        );
    }
}
export default StartScreen;

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
justify-content: space-around;
align-items: center;
flex-direction: column;
padding-top: 3vh;
padding-left: 1vw;
padding-right: 1vw;
`
const Buttons = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
justify-self: end;
width: 100%;
margin-bottom: 2vh;
margin-top: 2vh;
`
const Header = styled.h1`
display: flex;
gap: 0.5vw;
font-size: clamp(15px, 3vw, 35px);
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
