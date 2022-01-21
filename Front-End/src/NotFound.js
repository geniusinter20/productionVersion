import React from 'react';
import styled from 'styled-components';
import Notfound from "./Images/404NotFound.svg";
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
    const navigate= useNavigate();
    return (
        <Container>
            <Image><object data={Notfound} type="image/svg+xml" /></Image>
            <WButton onClick={()=>navigate(-1)} shape="round" size="lg">Go Back</WButton>
        </Container>
    );
}
const Container= styled.div`
display: flex;
flex-direction: column ;
align-items: center;
justify-content: center;
height: 100vh;
width: 100vw;
gap: 30px;
`
const Image = styled.div`
display: flex; 
align-items: center;
justify-content: center;
width: 100%;
&>object{
  width: 50%;
}
`
const WButton = styled(Button)`
height: 50px;
font-weight: 500;
color: white;
background-color: #444444;
font-size: 23px;
border: solid 3px #444444;
&:hover{
    animation: mmm1 0.5s;
    animation-fill-mode: forwards;
}
@keyframes mmm1 {
    100% {
        color: #444444;
    background-color: white;
    border: solid 3px #444444;
   }
     
   0% {
    color: white;
    background-color: #444444;
    border: solid 3px #444444;
   }
}
`