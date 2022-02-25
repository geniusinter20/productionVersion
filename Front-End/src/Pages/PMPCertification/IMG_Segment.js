import React, { Component } from 'react';
import styled from 'styled-components';

import image from "../../Images/PMPpage_Header.jpeg";
import {Row, Col,Button } from "antd";
import { useNavigate } from 'react-router-dom';


export default function Segment() {
    const navigate= useNavigate();
        return (
                <HomeSection>
                    <Fill>
                    <div className="container">
                        <HomeInformation>
                                <div style={{fontSize:'70%', fontWeight:300, color:"white"}}>Supercharge Your Skills and</div>
                                <div style={{fontSize:'60%',fontWeight:600, color:'#5BCAD6'}}> Work Smarter</div>
                            <div style={{color:"white",fontSize:'40%', fontWeight:"200"}}>Earn the New PMP Certificate</div>
                            <Buttons>
                                <Col1 xs={{ span: 22, offset: 0 }} lg={{ span: 6, offset: 0 }} xl={{ span: 5, offset: 0 }} >
                                <Button1 shape="round" onClick={()=>navigate("/practicetests")} type="primary">Practice Tests</Button1>
                                </Col1>
                                {/* <Col1 xs={{ span: 22, offset: 0 }} lg={{ span: 6, offset: 0 }} xl={{ span: 5, offset: 0 }}>
                                <Button1 shape="round" type="primary">Our Courses</Button1>
                                </Col1> */}
                            </Buttons>
                        </HomeInformation>
                    </div>
                    </Fill>
                 </HomeSection>
        )
}

const Button1 = styled(Button)`
background: none;
color: white;
font-size: 22px;
height: 50px;
border: solid 1px white ;
width: 100%;
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
gap: 60px;
@media( max-width: 1000px){
    gap: 15px;
}
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
padding: 30px 4vw 30px 4vw;
@media( min-width: 1000px){
    padding: 90px 4vw 90px 4vw;
}
`