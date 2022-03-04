import React from 'react'
import NavBar from '../../Components/AppNavbar/Navbar'
import Footer from '../../Components/Footer/Footer'
import styled from 'styled-components'
import aboutusImage from "../../Images/aboutusImage.png"
import logo from "../../Images/Logo1.svg"
import person from "../../Images/person.jpg"
import { Row, Col, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet';
export default function Aboutus() {
    const navigate = useNavigate()
    return (
        <div>
            <Helmet>
                <title>About Us</title>
                <meta name="description" content=" About Genius" />
            </Helmet>
            <NavBar></NavBar>
            <MainContainer>
                <Header >
                    <Slogan >WE DELIVER VALUE</Slogan>
                    <object data={logo} type="image/svg+xml"></object>
                    <Fill></Fill>
                </Header>
                <Section>
                    <div style={{ fontSize: 18 }}>WELL HELLO THERE</div>
                    <Brief>We are here to help you to become a certified specialist in your area.</Brief>
                    <DText>We are Genius.
                        We are offering a broad variety of preparation materials, practice tests, and exams that will
                        help in the preparation for obtaining the worldwide recognized certificate. Our team consists
                        of certified project managers, business analysts, and software developers that work in a tide
                        collaboration with global professional certificates providers
                        to come up with the preparation programs that deliver maximum value to our customers.</DText>
                </Section>
                <Section background="#F3F3F3">
                    <Title>Meet The Team</Title>
                    <Row gutter={[0, 35]} style={{ marginTop: 10, justifyContent: "space-between", width: "100%", alignItems: "center" }}>
                        <Member xs={{ span: 24 }} md={{ span: 10 }} lg={{ span: 8 }} xl={{ span: 5 }} >
                            <Image url={person}></Image>
                            <div style={{ display: "flex", alignItems: "center", flexDirection: "column" }}><Name>john doe</Name>
                                <JobDes>UI/UX Designer</JobDes>
                            </div>
                        </Member>
                        <Member xs={{ span: 24 }} md={{ span: 10 }} lg={{ span: 8 }} xl={{ span: 5 }}>
                            <Image url={person}></Image>
                            <div style={{ display: "flex", alignItems: "center", flexDirection: "column" }}><Name>john doe</Name>
                                <JobDes>UI/UX Designer</JobDes>
                            </div>
                        </Member>
                        <Member xs={{ span: 24 }} md={{ span: 10 }} lg={{ span: 8 }} xl={{ span: 5 }}>
                            <Image url={person}></Image>
                            <div style={{ display: "flex", alignItems: "center", flexDirection: "column" }}><Name>john doe</Name>
                                <JobDes>UI/UX Designer</JobDes>
                            </div>
                        </Member>
                        <Member xs={{ span: 24 }} md={{ span: 10 }} lg={{ span: 8 }} xl={{ span: 5 }}>
                            <Image url={person}></Image>
                            <div style={{ display: "flex", alignItems: "center", flexDirection: "column" }}><Name>john doe</Name>
                                <JobDes>UI/UX Designer</JobDes>
                            </div>
                        </Member>
                    </Row>
                </Section>
                <Section>
                    <Title>What We do</Title>
                    <DText>Here at Genius, we strongly believe that everything is achievable if you have
                         the motivation and time to put effort into that direction. We understand that 
                         motivation has crucial meaning. Therefore, we create our program in a way to encourage 
                         our users and keep them motivated in preparation for obtaining professional certificates.
                          Genius provides robust examination preparation materials used by individuals, businesses, academic institutions,
                         and government entities around the world.</DText>
                </Section>
                <Row style={{ padding: "4vh 8vw 8vh 8vw", width: "100%", justifyContent: "center" }}>
                    <Col xs={{ span: 24 }} md={{ span: 5 }} xl={{ span: 3 }}>
                        <WButton onClick={() => navigate("/#contactus")}>Contact Us</WButton>
                    </Col>
                </Row>
                <Footer></Footer>
            </MainContainer>
        </div>
    )
}
const MainContainer = styled.div`

`
const WButton = styled(Button)`
height: 45px;
font-weight: 600;
color: white;
display: flex;
align-items: center;
justify-content: center;
background-color: #444444;
width: 100%;
&>:nth-child(1){
display: flex;
align-items: center;
justify-content: center;
}
&:hover{
    animation: mmm2 0.5s;
    animation-fill-mode: forwards;
}
@keyframes mmm2 {
    100% {
        color: #444444;
    background-color: white;
    border-color: #444444;
   }
     
   0% {
    color: white;
    background-color: #444444;
    border-color: #444444;
   }
}
`
const Image = styled.div`
background-image: url(${props => props.url});
background-size: cover;
background-position: center;
width: 250px;
height: 250px;
border-radius: 50%;
`
const Name = styled.div`
font-size: 30px;
font-weight: 500;
color: #3c3c3c;
`
const JobDes = styled.div`
font-size: 20px;
font-weight: 600;
color: #6c6c6c;
`
const Member = styled(Col)`
display: flex;
flex-direction: column;
align-items: center;
gap: 15px;
`
const Slogan = styled.div`
color : white;
font-size: 50px;
position: relative;
z-index: 2;
letter-spacing: 10px;
word-spacing: 10px;
font-weight: 500;
text-align: center;
@media (max-width: 532px){
    line-height: 50px;
    font-size: 35px;
    word-spacing: 0px;
}
`
const Header = styled.div`
display: flex;
flex-direction: column;
align-items: center;
background-image: url(${aboutusImage});
background-size: cover;
background-position: center;
overflow: hidden;
position: relative;
min-height: 60vh;
justify-content: center;
&>object{
    position: absolute;
    z-index: 3;
    width: 80px;
    height: 80px;
    top: 20px;
    right: 30px;
}
`;
const Brief = styled.div`
font-size: 25px;
font-weight: 500;
width: 40%;
text-align: center;
@media (max-width: 764px){
    width: 100&;
}
`;
const DText = styled.div`
font-size: 21px;
text-align: center;
@media (max-width: 532px){
    font-size: 20px;
}
`;
const Title = styled.div`
font-size: 45px;
font-weight: 500; 
color: #3c3c3c;
@media (max-width: 532px){
    line-height: 50px;
    font-size: 35px;
}
`;
const Section = styled.div`
display: flex;
flex-direction: column;
align-items: center;
gap: 15px;
padding: 8vh 8vw 8vh 8vw;
background: ${props => props.background};
color: #3c3c3c;
@media (max-width: 532px){
    padding: 4vh 4vw 4vh 4vw;
}
`;
const Fill = styled.div`
position: absolute;
height: 100%;
width: 100%;
background: linear-gradient(180deg, rgba(0, 0, 0, 0.90) -1.55%, rgba(42, 64, 66, 0.90) 50%, rgba(88, 166, 174, 1) 100%);
mix-blend-mode: multiply;
z-index: 1;
`;