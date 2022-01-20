import React, { Component } from 'react';
import styled from 'styled-components';
import examEnvBackground from "../../Images/examEnvBackground.jpg"
import { CloseCircleTwoTone } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import "./LogIn.css"
import { signIn } from '../../Redux/Actions/UserAuthActions';
import { useDispatch } from "react-redux"
import { useState, useEffect } from 'react';
import {useSelector} from 'react-redux'
import {useNavigate} from "react-router-dom"
import {
    Form,
    Input,
    Checkbox,
    Button,
} from 'antd';
export default function Registreation() {
    const [remembered, setRemembered] = useState(false);
    const [signingIn, setSigningIn] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const navigate= useNavigate();
    const dataLoaded= useSelector(state => state.auth.loggedIn)
    //dispatch(signUp({}))
    //localStorage.removeItem("userToken")
    const onFinish = () => {

        form.validateFields()
            .then(
                ({ email, password }) => {
                    //console.log("fullname:", fullName)
                    dispatch(signIn(email, password, remembered))

                })
            .catch((errorInfo) => { });
            setSigningIn(true)
    };
    useEffect(() => {
        if(dataLoaded) navigate("/")
    }, [dataLoaded])
    
    return (
        <MainContainer>
            <div className='pageBackground'>
                <div className='gradient'></div>
                <img src={examEnvBackground} />
            </div>
            <div style={{ display: "flex", minHeight: "90vh", position: "relative" }}>
                <Side1><div className='background' /></Side1>

                <Side2>
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
                        <div style={{ fontSize: "23px", fontWeight: "700", color: "#6C6C6C", marginBottom: "2vh", marginTop: "2vh", justifySelf: "center" }}>LOG IN TO YOUR ACCOUNT!</div>
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
                                    style={{ marginBottom: 12 }}
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

                                <Form.Item
                                    style={{ marginBottom: 10 }}
                                    name="rememberme"
                                    valuePropName="checked"
                                >
                                    <Checkbox onChange={(e) => setRemembered(e.target.checked)}>
                                        Remember me
                                    </Checkbox>
                                </Form.Item>

                                <Form.Item style={{ marginBottom: 5 }} >{
                                    !signingIn ? <Button  style={{ width: "100%", borderRadius: "200px", boxShadow: "1px 3px 5px 1px rgba(0, 0, 0, 0.12)" }} type="primary" htmlType="submit">
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
                    <div style={{ fontSize: "13px", fontWeight: "500", color: "#AEAEAE", width: "100%", textAlign: "center", position: "absolute", bottom: "5px" }}>©2021 Genius Digital All Right Reserved</div>
                </Side2>
            </div >
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
const Side2 = styled.div`
display: flex;
align-items: center;
flex-direction: column;
justify-content:center;
align-self: stretch;
background: rgb(241, 241, 241, 0.90);
gap:5vh;
width: 40vw;
padding-top: 0vh;
padding-left: 7vw;
padding-right: 7vw;
padding-bottom: 5vh;
`
const Side1 = styled.div`
align-self: stretch;
width:30vw;
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
