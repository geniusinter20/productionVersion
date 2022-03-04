import React from 'react'
import { Button } from "antd";
import styled from 'styled-components';
import getStartedBackground from "../../Images/getStartedBackground.png"
import getStartedBackgroundM from "../../Images/getStartedBackgroundM.png"
import getStartedBackgroundM1 from "../../Images/getStartedBackgroundM1.png"
import NavBar from '../../Components/AppNavbar/Navbar';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
export default function GetStarted() {
    const navigate = useNavigate();
    const auth = useSelector(state => state.auth)
    return (
        <div>
            <NavBar></NavBar>
            <MainContainer>

                <Section style={{ padding: "8vh 2vw 4vh 2vw", display: "flex", flexDirection: "column", gap: 10 }}>
                    <Header color="white">ENROLL NOW, YOUR JOURNEY {<div style={{ color: "#5BCAD6" }}>STARTS NOW</div>} </Header>
                    <SubText>Nowadays, with the benefits of the worldwide web, we are not having a problem accessing the information. However,
                        we are facing trust issues. Internet is full of different preparation programs which is hard to choose from. Genius is a
                        privately held company specializing in providing robust examination preparation materials used by individuals, businesses,
                        academic institutions and government entities around the world. Each test is based on respective vendors' published exam objectives
                        and designed to help attain certification.
                        Several question types are supported to provide actual exam experience to the Users. </SubText>
                    <SubText>We are Genius, We are here to help in your journey of getting professional certification.</SubText>
                    {/*<SubText>simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since.</SubText>
                    <SubText>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.</SubText> */}
                    {
                        auth.loggedIn ? <Button1 onClick={() => navigate("/register")} shape='round'>Practice Tests</Button1>
                            : <Button1 onClick={() => navigate("/register")} shape='round'>Register Now</Button1>
                    }
                </Section>
            </MainContainer>
        </div>
    )
}
const MainContainer = styled.div`
min-height: 91vh;
color: white;
position: relative;
background-image: url(${getStartedBackground});
  background-size: cover;
  background-position: center;
  @media (max-width: 768px){
    background-image: url(${getStartedBackgroundM});
}
@media (max-width: 534px){
    background-image: url(${getStartedBackgroundM1});
}
`
const SubText = styled.div`
font-size: 25px;
color: ${props => props.color};
font-weight: 300;
@media (max-width: 768px){
    font-size: 20px;
    text-align: center;
}

`
const Header = styled.div`
font-size: 60px;
color: ${props => props.color};
font-weight: 500;
line-height: 80px;
margin-bottom: 10px;
@media (max-width: 768px){
    text-align: center;
    line-height: 70px;
    font-size: 55px;
}
@media (max-width: 532px){
    text-align: center;
    line-height: 60px;
    font-size: 40px;
}
`
const Section = styled.div`
min-height: 91vh;
height: 100%;
width: 100%;
background: linear-gradient(90deg, rgba(0, 0, 0, 0.83) -1.55%, rgba(42, 64, 66, 0.83) 62.93%, rgba(88, 166, 174, 0.83) 120%);
@media (max-width: 1024px){
background:  rgba(0, 0, 0, 0.83);
}
`
const Button1 = styled(Button)`
width: 150px;
height: 47px;
margin-top: 10px;
font-weight: 500;
font-size: 16px;
color: #444444;
@media (max-width: 532px){
    width: 100%;
}
&:hover{
    animation: mmm1 0.5s;
    animation-fill-mode: forwards;
}
@keyframes mmm1 {
    0% {
        color: #444444;
    background-color: white;
    border-color: white;
   }
     
   100% {
    color: white;
    background-color: #444444;
    border-color: #444444;
   }
}
`