import { React, Component } from "react";
import 'antd/dist/antd.css';
import "./AboutPMP.css";
import styled from "styled-components"
import img1 from '../../Images/pmp1.jpg';
import img2 from '../../Images/pmp2.jpeg';
import { Typography, Row, Col, Button } from 'antd';

const { Paragraph } = Typography;
class Aboutpmp extends Component {

    state = { toggled: true, toggled1: true }

    toggle = () => {
        this.setState(prevState => ({
            toggled: !prevState.toggled,
            toggled1: prevState.toggled1
        }));
    }
    toggle1 = () => {

        this.setState(prevState => ({
            toggled: prevState.toggled,
            toggled1: !prevState.toggled1
        }));
    }
    render() {
        return (
            <div style={{display: "flex", flexDirection:"column", gap:30, marginBottom: 40}}>
                <Row className="mainContainer1">
                    <Col className="pic1" xs={{ span: 24, offset: 0 }} lg={{ span: 11, offset: 0 }} ><img src={img1} /></Col>
                    <TextContainer xs={{ span: 24, offset: 0 }} lg={{ span: 11, offset: 0 }}>
                        <Header>What is PMP</Header>
                        <Paragraph style={{ fontSize: "25px", transition: "width 2s, height 4s" }} ellipsis={this.state.toggled ? { rows: 5 } : false}>
                            The Project Management Professional (PMP) is the world's leading project management certification. Now including predictive, agile, and hybrid approaches, the PMP proves project leadership experience and expertise in any way of working. It supercharges careers for project leaders across industries and helps organizations find the people they need to work smarter and perform better. The PMP certification is designed by project professionals, for project professionals and validates that you are among the best—highly skilled in:
                            People: emphasizing the soft skills you need to effectively lead a project team in today's changing environment.
                            Process: reinforcing the technical aspects of successfully managing projects.
                            Business Environment: highlighting the connection between projects and organizational strategy.
                        </Paragraph>
                        <MyButton onClick={this.toggle} >Read{this.state.toggled ? ' more' : ' less'}</MyButton>
                    </TextContainer>
                </Row>
                <Row style={{ flexWrap: "wrap-reverse", flexDirection: "row-reverse" }} className="mainContainer1">
                    <Col className="pic1" xs={{ span: 24, offset: 0 }} lg={{ span: 11, offset: 0 }} style={{alignSelf:"flex-end"}}><img src={img2} /></Col>
                    <TextContainer xs={{ span: 24, offset: 0 }} lg={{ span: 11, offset: 0 }}>
                        <Header>Why the PMP</Header>
                        <Paragraph style={{ fontSize: "25px" }} ellipsis={this.state.toggled1 ? { rows: 5 } : false}>
                            The PMP adds value. CIO magazine ranked the PMP as the top project management certification in North America because it demonstrates you have the specific skills employers seek, dedication to excellence and the capacity to perform at the highest levels.
                            The PMP delivers benefits. The median salary for project professionals in North America is 25% higher than
                            those without it.
                            The PMP proves you work smarter. It shows you have the skills to drive business results and increase your organization’s impact in the office and around the world.
                        </Paragraph>
                        <MyButton onClick={this.toggle1} >Read{this.state.toggled1 ? ' more' : ' less'}</MyButton>
                    </TextContainer>
                </Row>
            </div>
        )

    }

}
/*style={{width:"44vw",position: "absolute",top: "-9999px",left: "-9999px",right: "-9999px",bottom: "-9999px",margin: "auto"}}*/
const TextContainer = styled(Col)`
display: flex;
flex-direction: column;
width: 44vw;
gap: 10px;
`
const Header = styled.div`
width: 100%;
font-size: 45px;
color:#303030;
font-weight: 300;
margin: 0px;
`
const MyButton = styled(Button)`
height: 42px;
width: 120px;
font-weight: 600;
color: #444444;
&:hover{
    animation: mmm1333 0.5s;
    animation-fill-mode: forwards;
}
@keyframes mmm1333 {
    0% {
        color: #444444;
    background-color: white;
   }
     
   100% {
    color: white;
    background-color: #444444;
    border-color: #444444;
   }
}
`
export default Aboutpmp;