import react from'react';
import styled from 'styled-components';
import PracticeTests from './Practicetests';
import img from "../../Images/PracticeTest_Header.jpg";
import img1 from "../../Images/PracticeTest_Header1.jpg";
import {Row, Col} from "antd";

function Header(){
    return(
        <MainContainer>
            <SubContainer >
                <Text xs={{ span: 24, offset: 0 }} lg={{ span: 12, offset: 0 }}>
                    <Title> 
                        Take Your Desired Tests Online
                    </Title>
                    <Brief>
                        You now have the option of taking it from your favorite computer at home or in the office.
                    </Brief>
                </Text>
                <Image xs={{ span: 24, offset: 0 }} lg={{ span: 12, offset: 0 }}>
                    <img src={img}></img>
                </Image>
            </SubContainer>
             <SubContainer style={{flexWrap:"wrap-reverse"}}>
            <Image xs={{ span: 24, offset: 0 }} lg={{ span: 12, offset: 0 }}>
                    <img src={img1}></img>
                </Image>
                <Text style={{backgroundColor:"#5BCAD6"}} xs={{ span: 24, offset: 0 }} lg={{ span: 12, offset: 0 }}>
                    <Title> 
                    Premium Project Management Tools and Templates
                    </Title>
                    <Brief>
                    We have tools, template and more created by experts, tested and ready to go. 
                    </Brief>
                </Text>
            </SubContainer> 
        </MainContainer>
    )
}
export default Header;

const MainContainer= styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap:20px;

`
const SubContainer= styled(Row)`
width: 100%;
justify-content: space-between;
`

const Text= styled(Col)`
color: white;
background-color: #303030;
display: flex;
flex-direction: column;
justify-content: center;
padding: 0 10px 0 20px;
gap: 30px;
min-height: 40vh;
`
const Title= styled.div`
    color: white;
    font-size: clamp(35px, 3vw, 60px);
`
const Brief= styled.div`
    font-size: clamp(15px, 1.3vw, 25px);
`

const Image= styled(Col)`
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 40vh;
    position: relative;
    overflow: hidden;
    & > img{
        width:100%;
    position: absolute;
    top: -9999px;
    left: -9999px;
    right: -9999px;
    bottom: -9999px;
    margin: auto;
    }
`
