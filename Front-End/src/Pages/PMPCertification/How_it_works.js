import {React, Component} from "react";
import styled from'styled-components';
import { CgSmileMouthOpen } from 'react-icons/cg';
import { BiCheckShield } from 'react-icons/bi';
import { MdManageAccounts } from 'react-icons/md';
import './How_it_works.css';


class HowItWorks extends Component{
    render(){
        return(
            <MainContainer>
                <Header>
                    How It <div style={{color:"#3CA9E7", fontWeight:"600"}}>Works</div>
                </Header>
                <Sections>
                    <SubSection><MdManageAccounts className='icon1'/><div className="subTitle1">Create an account</div>
                    <div className="subDiscription">Register in the system.</div></SubSection>
                    <SubSection><BiCheckShield className='icon1'/><div className="subTitle1">Get authorization</div>
                    <div className="subDiscription">Get an email with a confirmation link.</div></SubSection>
                    <SubSection><CgSmileMouthOpen className='icon1'/><div className="subTitle1">Enjoy the app</div>
                    <div className="subDiscription">Start your PMI certification preparation.</div></SubSection>
                </Sections>
            </MainContainer>
        )
    }
}
const MainContainer= styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
background-color:#F8F8F8 ;
gap: 1.5vw;
padding:30px 4vw 30px 4vw;


`
const Header= styled.h1`
display: flex;
gap: 1.3vw;
font-size: clamp(35px, 4vw, 80px);
font-weight: 300;
color: #444444;
`
const Sections= styled.div`
display: flex;
gap: 4vw;
flex-wrap:wrap;
align-items: center;
justify-content: center;
`
const SubSection= styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
gap: 1vw;
`
export default HowItWorks;