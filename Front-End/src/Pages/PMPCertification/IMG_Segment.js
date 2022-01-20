import React, { Component } from 'react';
import styled from 'styled-components';

import image from "../../Images/PMPpage_Header.jpeg";
import {Row, Col,Button } from "antd";


class Segment extends Component {
    render() {
        return (
                <HomeSection>
                    <Fill>
                    <div className="container">
                        <HomeInformation>
                                <div style={{fontSize:'60%', fontWeight:300, color:"white"}}>Supercharge Your Skills and</div>
                                <div style={{fontSize:'60%',fontWeight:600, color:'#5BCAD6'}}> Work Smarter</div>
                            <div style={{color:"white",fontSize:'30%', fontWeight:"400"}}>Earn the New PMP Certification</div>
                            <Buttons gutter={[20, 20]}>
                                <Col1 xs={{ span: 22, offset: 0 }} lg={{ span: 4, offset: 0 }}>
                                <Button1 type="primary">Practice Tests</Button1>
                                </Col1>
                                <Col1 xs={{ span: 22, offset: 0 }} lg={{ span: 4, offset: 0 }}>
                                <Button1 type="primary">Our Courses</Button1>
                                </Col1>
                            </Buttons>
                        </HomeInformation>
                    </div>
                    </Fill>
                 </HomeSection>
        )
    }
}

const Button1 = styled(Button)`
margin: 0px !important;
background: none;
color: white;
width: 100%;
font-size: 22px;
height: 50px;
border: solid 1px white ;
border-radius: 200px;
&:hover{
    animation: btnmove27 0.8s;
    animation-fill-mode: forwards;
    background: none;
    color: white;
    border: solid 1px #5BCAD6;
}

@keyframes btnmove27 {
   100% {
    background-color: #5BCAD6 ;
    color: white;
   }
   0% {
        background: none;
        color: white;
   }
}

`
const Fill= styled.div`
    background-color: rgba(30,30,30,0.87); 
    height:100%;
    width: 100%;

`
const Buttons= styled(Row)`
width: 100%;
display:flex;
align-items: center;
justify-content: center;
padding: 0px 0px 0px 0px !important;
margin-top: 30px;
gap: 30px;
`
const Col1= styled(Col)`
margin:  0px 0px 0px 0px !important;
padding:  0px 0px 0px 0px !important;
display: flex;
`
const HomeSection = styled.div`
   
    background: url(${image});
    background-size: cover;
    background-position: center;
    text-align: center;
    position: relative;
`

const HomeInformation = styled.div`
font-size: clamp(70px, 7vw, 160px);
height: 100%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 50px 30px 50px 30px;
`
const HomeTitle = styled.h2`
margin-top: 5vh;
    align-self:stretch;
    margin-bottom: 0vh;
    font-weight: bold;
    color: white;
  
`

const HomeInfo = styled.h4`
    font-size: 35px;
    color: white;
    margin-bottom: 200px;
`

const HomeDesc = styled.p`
    font-size: 20px;
    line-height: 1.5;
    color: white;
    margin-bottom: 5px
`


export default Segment;