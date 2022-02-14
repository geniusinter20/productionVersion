import React, { Component } from 'react';
import styled from 'styled-components';
import examEnvBackground from "../../Images/examEnvBackground.jpg"
import { CloseCircleTwoTone } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import "./LogIn.css"
import { signIn } from '../../Redux/Actions/UserAuthActions';
import { useDispatch } from "react-redux"
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { useNavigate, useLocation } from "react-router-dom"
import { Helmet } from 'react-helmet';
import {
    Form,
    Input,
    Row,
    Col,
    Button,
} from 'antd';
export default function Registreation() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loggingIn, setLoggingIn] = useState(false);
    const auth = useSelector(state => state.auth)
    const { state } = useLocation();
    //dispatch(signUp({}))
    //localStorage.removeItem("userToken")
    const onFinish = () => {
        form.validateFields()
            .then(
                ({ email, password }) => {
                    //console.log("fullname:", fullName)
                    dispatch(signIn(email, password))

                })
            .catch((errorInfo) => { });
    };
    useEffect(() => {
        setLoggingIn(auth.loggingIn);
        console.log("logged:", auth.loggedIn);
        console.log("logging:", auth.loggingIn);
        setLoggedIn(auth.loggedIn);
        if (auth.loggedIn && !auth.loggingIn) {
            //console.log(state);
            if (state) navigate(state.previousPage)
            else navigate("/")
        }
    }, [auth])

    return (
        <MainContainer>
            <Helmet>
                <title>Sign In</title>
                <meta name="description" content="Genius logIn" />
            </Helmet>
            <div className='pageBackground'>
                <div className='gradient'></div>
                <img src={examEnvBackground} />
            </div>
            <Row style={{ minHeight: "90vh", position: "relative", width: "100%", alignItems: "center", justifyContent: "center" }}>
                <Side1 xs={{ span: 0, offset: 0 }} sm={{ span: 0, offset: 0 }} lg={{ span: 8, offset: 0 }} xl={{ span: 7, offset: 0 }} >
                    <div className='background' />
                </Side1>
                <Side2 xs={{ span: 24, offset: 0 }} sm={{ span: 18, offset: 0 }} lg={{ span: 11, offset: 0 }} xl={{ span: 9, offset: 0 }}>
                    <div style={{ position: "relative", height: "90px", width: "250px" }}>
                        <div style={{
                            fontSize: "20px",
                            color: "#AEAEAE",
                            position: "absolute",
                            top: "0px",
                            left: "4px"
                        }}>
                            Welcome to
                        </div>
                        <div style={{
                            position: "absolute",
                            top: "10px",
                            fontWeight: "700",
                            fontSize: "56px",
                            letterSpacing: " 0.04em",
                            color: " #5BCAD6",

                        }}>GENIUS</div>

                    </div>

                    <SubContainer >
                        <div style={{ fontSize: "22px", fontWeight: "700", color: "#6C6C6C", marginBottom: "2vh", marginTop: "2vh", justifySelf: "center", textAlign: "center" }}>LOG IN TO YOUR ACCOUNT!</div>
                        <div style={{ width: "100%" }}>
                            <Form
                                requiredMark={'optional'}
                                layout="vertical"
                                form={form}
                                name="register"
                                onFinish={onFinish}
                                scrollToFirstError
                            >
                                <Form.Item
                                    style={{ marginBottom: 12 }}
                                    name="email"
                                    label="Email Address"
                                    rules={[
                                        {
                                            type: 'email',
                                            message: 'The input is not valid E-mail!',
                                        },
                                        {
                                            required: true,
                                            message: 'Please input your E-mail!',
                                        },
                                    ]}
                                >
                                    <Input placeholder="Enter your E-mail" style={{ boxShadow: "1px 3px 5px 1px rgba(0, 0, 0, 0.12)" }} />
                                </Form.Item>

                                <Form.Item
                                    style={{ marginBottom: 32 }}
                                    name="password"
                                    label="Password"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your password!',
                                        },
                                    ]}
                                >
                                    <Input.Password placeholder="Enter your Password" style={{ boxShadow: "1px 3px 5px 1px rgba(0, 0, 0, 0.12)" }} />
                                </Form.Item>
                                <Form.Item style={{ marginBottom: 5 }} >{
                                    !loggingIn ? <Button style={{ width: "100%", borderRadius: "200px", boxShadow: "1px 3px 5px 1px rgba(0, 0, 0, 0.12)" }} type="primary" htmlType="submit">
                                        Sign in
                                    </Button> :
                                        <Button className='buttona' loading style={{ width: "100%", borderRadius: "200px", boxShadow: "1px 3px 5px 1px rgba(0, 0, 0, 0.12)" }} type="primary" htmlType="submit">
                                            Signing in...
                                        </Button>
                                }
                                </Form.Item>
                            </Form>
                        </div>

                        <div style={{ fontSize: "13px", fontWeight: "500", color: "#6C6C6C" }}>Don’t have an Account? <StyledLink to="/register" >Sign up</StyledLink></div>
                    </SubContainer>
                    <div style={{ fontSize: "13px", fontWeight: "500", color: "#AEAEAE", width: "100%", textAlign: "center", position: "absolute", bottom: "5px" }}>©{new Date().getFullYear()} Genius Digital All Right Reserved</div>
                </Side2>
            </Row >
        </MainContainer >
    );
}
const MainContainer = styled.div`
display: flex;
position: relative;
align-items: center;
justify-content: center;
min-height: 100vh;
overflow: hidden;
align-content: stretch;
padding:5vh 0vw 5vh 0vw;
@media (max-width: 576px){
    &{padding:0px;}
} 
`
const SubContainer = styled.div`
display: flex;
position: relative;
align-items: center;
justify-content:space-between;
flex-direction: column;
gap: 2vh;
width: 100%;
`
const Side2 = styled(Col)`
display: flex;
align-items: center;
flex-direction: column;
justify-content:center;
align-self: stretch;
background: rgb(241, 241, 241, 0.90);
gap:5vh;
padding-top: 0vh;
padding-left: 5vw;
padding-right: 5vw;
padding-bottom: 5vh;
 @media (max-width: 576px){
    &{height:100vh;}
} 
`
const Side1 = styled(Col)`
align-self: stretch;
position: relative;
`
const StyledLink = styled(Link)`
  text-decoration: underline;
  font-weight: 700;
  color: #949494;
  &:hover {
       color: #5BCAD6;
      }
`
