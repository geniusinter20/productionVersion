import react from 'react';
import styled from 'styled-components';
import PracticeTests from './Practicetests';
import img from "../../Images/PracticeTest_Header.jpg";
import img1 from "../../Images/PracticeTest_Header1.jpg";
import { Row, Col } from "antd";

function Header() {
    return (
        <MainContainer>
            <SubContainer gutter={[20, 20]} >
                <Text xs={{ span: 24, offset: 0 }} lg={{ span: 11, offset: 0 }}>
                    <Title>
                        Take Your Desired Tests Online
                    </Title>
                    <Brief>
                        Now you have the opportunity to take tests online from your most suitable place
                    </Brief>
                </Text>
                <Image xs={{ span: 24, offset: 0 }} lg={{ span: 12, offset: 0 }}>
                    <img src={img}></img>
                </Image>
            </SubContainer>
            <SubContainer style={{ flexWrap: "wrap-reverse" }}>
                <Image xs={{ span: 24, offset: 0 }} lg={{ span: 11, offset: 0 }}>
                    <img src={img1}></img>
                </Image>
                <Text style={{ backgroundColor: "#5BCAD6" }} xs={{ span: 24, offset: 0 }} lg={{ span: 12, offset: 0 }}>
                    <Title>
                        The broad variety of Project management tests and exams
                    </Title>
                    <Brief>
                        Our tests and exams are subdivided into PMBOK knowledge areas so you can access exams and test your skill in the particular Project Management knowledge area.
                    </Brief>
                </Text>
            </SubContainer>
        </MainContainer>
    )
}
export default Header;

const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap:20px;

`
const SubContainer = styled(Row)`
width: 100%;
justify-content: space-between;
align-items: center;
`

const Text = styled(Col)`
color: white;
background-color: #303030;
display: flex;
flex-direction: column;
justify-content: center;
padding: 30px 10px 30px 20px;
gap: 20px;
min-height: 40vh;
`
const Title = styled.div`
    color: white;
    font-size: clamp(35px, 3vw, 60px);
    line-height: clamp(45px, 4vw, 80px);
`
const Brief = styled.div`
    font-size: clamp(15px, 1.3vw, 25px);
`

const Image = styled(Col)`
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 40vh;
    position: relative;
    overflow: hidden;
    @media (max-width:425px){
        & > img{
    height: 100%;
        }
    }
    @media (min-width:425px){
        & > img{
    width: 100%;
        }
    }
    & > img{
    position: absolute;
    top: -9999px;
    left: -9999px;
    right: -9999px;
    bottom: -9999px;
    margin: auto;
    }
`
