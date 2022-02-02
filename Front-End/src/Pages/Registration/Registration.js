import React, { Component, useEffect, useState } from 'react';
import styled from 'styled-components';
import examEnvBackground from "../../Images/examEnvBackground.jpg"
import { CloseCircleTwoTone } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import "./Registration.css"
import { signUp } from '../../Redux/Actions/UserAuthActions';
import { useDispatch, useSelector } from "react-redux"
import { Form, Input, Select, Row, Col, Checkbox, Button, } from 'antd';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/high-res.css'
import ReactFlagsSelect from 'react-flags-select';
import { Countries } from './Countries';

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};
const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
    },
};
export default function Registreation() {
    const [form] = Form.useForm();
    const dispatch = useDispatch()
    const [loggingIn, setLoggingIn] = useState(false);
    const [registering, setRegistering] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [countryCode, setCountryCode] = useState(null);
    const [country, setCountry] = useState("United States");
    const auth = useSelector(state => state.auth)
    const navigate = useNavigate();
    useEffect(() => {
        setLoggingIn(auth.loggingIn);
        setRegistering(auth.registering);
    }, [auth]);
    useEffect(() => {
        //console.log(auth.loggedIn);
        if (auth.loggedIn) navigate("/")
    }, [auth]);
    const onFinish = () => {
        form.validateFields()
            .then(
                ({ fullName, email, password }) => {
                    //console.log("fullname:", fullName)
                    dispatch(signUp({
                        fullName: fullName,
                        email: email,
                        password: password,
                        address: "",
                        phoneNumber: phoneNumber,
                        countryCode: countryCode,
                        joinDate: new Date(),
                    }))
                })
            .catch((errorInfo) => { });
    };
    //console.log(localStorage.getItem("userToken"))
    const renderButton = () => {
        if (!registering && !loggingIn) return (
            <Button style={{ width: "100%", borderRadius: "200px", boxShadow: "1px 3px 5px 1px rgba(0, 0, 0, 0.12)" }} type="primary" htmlType="submit">
                Register now
            </Button>
        )
        else if (registering && !loggingIn) return (
            <Button loading style={{ width: "100%", borderRadius: "200px", boxShadow: "1px 3px 5px 1px rgba(0, 0, 0, 0.12)" }} type="primary" htmlType="submit">
                Registering...
            </Button>
        )
        else if (!registering && loggingIn) return (
            <Button className='buttona' loading style={{ width: "100%", borderRadius: "200px", boxShadow: "1px 3px 5px 1px rgba(0, 0, 0, 0.12)" }} type="primary" htmlType="submit">
                Signing in...
            </Button>
        )
    }
    return (
        <MainContainer>
            <div className='pageBackground'>
                <div className='gradient'></div>
                <img src={examEnvBackground} />
            </div>
            <Row style={{ minHeight: "100vh", position: "relative", width:"100%", alignItems:"center", justifyContent:"center" }}>
                <Side1 xs={{ span: 0, offset: 0 }} sm={{ span: 0, offset: 0 }} lg={{ span: 8, offset: 0 }} xl={{ span: 7, offset: 0 }}><div className='background' /></Side1>

                <Side2 xs={{ span: 24, offset: 0 }} sm={{ span: 18, offset: 0 }} lg={{ span: 11, offset: 0 }} xl={{ span: 10, offset: 0 }}>
                    <div style={{ fontSize: "23px", fontWeight: "700", color: "#6C6C6C", marginBottom: "2vh", marginTop: "1vh" }}>Register Individual Account!</div>
                    <div style={{ width: "100%" }}>
                        <Form
                            layout="vertical"
                            form={form}
                            name="register"
                            onFinish={onFinish}
                            scrollToFirstError
                        >
                            <Form.Item
                                style={{ marginBottom: 12, }}
                                name="fullName"
                                label="Full Name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your full name!',
                                        whitespace: true,
                                    },
                                ]}
                            >
                                <Input placeholder="Enter your Full Name" style={{ boxShadow: "1px 3px 5px 1px rgba(0, 0, 0, 0.12)" }} />
                            </Form.Item>
                            <Form.Item
                                style={{ marginBottom: 12 }}
                                name="email"
                                label="E-mail"
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
                                hasFeedback
                            >
                                <Input.Password placeholder="Enter your Password" style={{ boxShadow: "1px 3px 5px 1px rgba(0, 0, 0, 0.12)" }} />
                            </Form.Item>

                            <Form.Item
                                style={{ marginBottom: 12 }}
                                name="confirm"
                                label="Confirm Password"
                                dependencies={['password']}
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please confirm your password!',
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }

                                            return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password placeholder="Re enter your fullname" style={{ boxShadow: "1px 3px 5px 1px rgba(0, 0, 0, 0.12)" }} />
                            </Form.Item>
                            {/* <Form.Item
                                style={{ marginBottom: 12 }}
                                name="address"
                                label="Your Address"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Address!',
                                        whitespace: true,
                                    },
                                ]}
                            >
                                 <Input placeholder="Enter your Address" style={{ boxShadow: "1px 3px 5px 1px rgba(0, 0, 0, 0.12)" }} /> 
                            </Form.Item> */}
                            <Form.Item label="Country" style={{ marginBottom: 15 }}>
                                <ReactFlagsSelect1
                                    searchable
                                    selected={countryCode}
                                    onSelect={code => {
                                        setCountryCode(code)
                                        setCountry(Countries[code])
                                    }}
                                    selectedSize={14}
                                />
                            </Form.Item>
                            <Form.Item label="Phone Number" style={{ marginBottom: 13 }}>
                                <PhoneInput
                                    containerClass="cusCont"
                                    inputClass="cusInput"
                                    dropdownClass="cusDrop"
                                    // containerStyle={{ boxShadow: "1px 3px 5px 1px rgba(0, 0, 0, 0.12)" }}
                                    country={countryCode?countryCode.toLowerCase():"us"}
                                    value={phoneNumber}
                                    onChange={phone => setPhoneNumber(phone)}
                                />
                            </Form.Item>

                            <Form.Item
                                style={{ marginBottom: 25 }}
                                name="agreement"
                                valuePropName="checked"
                                rules={[
                                    {
                                        validator: (_, value) =>
                                            value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                                    },
                                ]}
                            >
                                <Checkbox>
                                    I Agree To the Terms & Conditions
                                </Checkbox>
                            </Form.Item>
                            <Form.Item style={{ marginBottom: 0 }} >
                                {renderButton()}
                            </Form.Item>
                        </Form>
                    </div>
                    <div style={{ fontSize: "13px", fontWeight: "500", color: "#6C6C6C", marginTop:"10px" }}>Already have an Account? <StyledLink to="/login" >Sign in</StyledLink></div>
                    <div style={{ fontSize: "13px", fontWeight: "500", color: "#AEAEAE", justifySelf: "flex-end",marginTop:"5px" }}>©2021 Genius Digital All Right Reserved</div>
                </Side2>
            </Row>
        </MainContainer>
    );
}
const ReactFlagsSelect1 = styled(ReactFlagsSelect)`
height: 35px;
&>*:nth-child(1){
    padding: 5px 10px 5px 0px;
    border-radius: 2px;
    background-color: white;
    box-shadow: 1px 3px 5px 1px rgba(0, 0, 0, 0.12);
    height: 35px;
}   
&>*:nth-child(2)>*{
    
    height: 40px;
    display: flex;
    align-items: center;
}   
&>*:nth-child(2)>*:nth-child(1){
    box-shadow: 1px 3px 5px 1px rgba(0, 0, 0, 0.12);
    height: auto;
    display: flex;
    align-items: center;
    padding: 0px;
}   
&>*:nth-child(2)>*:nth-child(1)>*{
    border: none;
}   
`
const MainContainer = styled.div`
display: flex;
position: relative;
align-items: center;
justify-content: center;
min-height: 100vh;
overflow: hidden;
align-content: stretch;
padding:0;

`
const Side2 = styled(Col)`
display: flex;
align-items: center;
flex-direction: column;
justify-content:space-between;
align-self: stretch;
background: rgb(241, 241, 241, 0.90);
padding-top: 2vh;
padding-left: 6vw;
padding-right: 6vw;
padding-bottom: 1vh;
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
