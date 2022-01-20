import { React, Component } from "react";
import 'antd/dist/antd.css';
import "./AboutPMP.css";
import styled from "styled-components"
import img1 from '../../Images/pmp1.jpg';
import img2 from '../../Images/pmp2.jpeg';
import { Typography, Row, Col, Button} from 'antd';

const { Paragraph, Text } = Typography;
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
            <div>
                <Row className="mainContainer1">
                    <Col className="pic1"  xs={{ span: 24, offset: 0 }} lg={{ span: 11, offset: 0 }} ><img src={img1}/></Col>
                    <TextContainer  xs={{ span: 24, offset: 0 }} lg={{ span: 11, offset: 0 }}>
                        <Header>What is PMP</Header>
                        <Paragraph style={{ fontSize: "25px", transition: "width 2s, height 4s" }} ellipsis={this.state.toggled ? { rows: 5 } : false}>
                            The Project Management Professional (PMP)® is the world's leading project management certification.
                            Now including predictive, agile and hybrid approaches, the PMP® proves project leadership experience and
                            expertise in any way of working. It supercharges careers for project leaders across industries and helps
                            organizations find the people they need to work smarter and perform better.dsffsdfsdgfdgdfgsgshfdghfhdfsgdfgfsgdghfg
                            hfdghfdhfhfhfhfdghgfdhfhfhfhfdgxcvxcbxvcbfdbcbxzdfbcxbcbcxvbggggggggggggggggggggggggggggggggggggggggg
                            ggggggggggggggggggggggggggggggggggg
                        </Paragraph>
                        <MyButton type="primary"  onClick={this.toggle} >Read{this.state.toggled ? ' more' : ' less'}</MyButton>
                    </TextContainer>
                    </Row>
                <Row className="mainContainer1">
                    
                    <TextContainer xs={{ span: 24, offset: 0 }} lg={{ span: 11, offset: 0 }}>
                        <Header>What is PMP</Header>
                        <Paragraph style={{ fontSize: "25px", transition: "width 2s, height 4s" }} ellipsis={this.state.toggled ? { rows: 5 } : false}>
                            The Project Management Professional (PMP)® is the world's leading project management certification.
                            Now including predictive, agile and hybrid approaches, the PMP® proves project leadership experience and
                            expertise in any way of working. It supercharges careers for project leaders across industries and helps
                            organizations find the people they need to work smarter and perform better.dsffsdfsdgfdgdfgsgshfdghfhdfsgdfgfsgdghfg
                            hfdghfdhfhfhfhfdghgfdhfhfhfhfdgxcvxcbxvcbfdbcbxzdfbcxbcbcxvbggggggggggggggggggggggggggggggggggggggggg
                            ggggggggggggggggggggggggggggggggggg
                        </Paragraph>
                        <MyButton type="primary"  onClick={this.toggle} >Read{this.state.toggled ? ' more' : ' less'}</MyButton>
                    </TextContainer>
                    <Col className="pic1" xs={{ span: 24, offset: 0 }} lg={{ span: 11, offset: 0 }} ><img src={img2}/></Col>
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
transition: width 2s, height 4s;
`
const Header = styled.div`
width: 100%;
font-size: 45px;
color:#303030;
font-weight: 300;
margin: 0px;
`
const MyButton= styled(Button)`
width: 120px;
&:hover{
    animation: mymove0033 0.8s;
    animation-fill-mode: forwards;
}
@keyframes mymove0033 {
    0% {
   }
     
100% {
    background: white;
    color: #404040;
    border-style: none;
   }
}
`
export default Aboutpmp;