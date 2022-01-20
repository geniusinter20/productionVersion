import React, { Component } from 'react';
import styled from 'styled-components';
import examEnvBackground from "../../Images/examEnvBackground.jpg"
import { CloseCircleTwoTone } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import "./Registration.css"
import { signUp } from '../../Redux/Actions/UserAuthActions';
import { useDispatch } from "react-redux"
import {
    Form,
    Input,
    InputNumber,
    Cascader,
    Select,
    Row,
    Col,
    Checkbox,
    Button,
    AutoComplete,
} from 'antd';
const { Option } = Select;
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
    //dispatch(signUp({}))
    const onFinish = () => {
        form.validateFields()
            .then(
                ({ fullName, email, password, address }) => {
                    //console.log("fullname:", fullName)
                    dispatch(signUp({
                        fullName: fullName,
                        email: email,
                        password: password,
                        address: address,
                    }))
                })
            .catch((errorInfo) => { });
    };
    //console.log(localStorage.getItem("userToken"))
    return (
        <MainContainer>
            <div className='pageBackground'>
                <div className='gradient'></div>
                <img src={examEnvBackground} />
            </div>
            <div style={{ display: "flex", minHeight: "90vh", position: "relative" }}>
                <Side1><div className='background' /></Side1>

                <Side2>
                    <div style={{ fontSize: "23px", fontWeight: "700", color: "#6C6C6C", marginBottom: "4vh", marginTop: "2vh" }}>Register Individual Account!</div>
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

                            <Form.Item
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
                            </Form.Item>
                            <Form.Item
                                style={{ marginBottom: 14 }}
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
                            <Form.Item style={{ marginBottom: 5 }} >
                                <Button style={{ width: "100%", borderRadius: "200px", boxShadow: "1px 3px 5px 1px rgba(0, 0, 0, 0.12)" }} type="primary" htmlType="submit">
                                    Register now
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                    <div style={{ fontSize: "13px", fontWeight: "500", color: "#6C6C6C" }}>Already have an Account? <StyledLink to="" >Sign in</StyledLink></div>
                    <div style={{ fontSize: "13px", fontWeight: "500", color: "#AEAEAE", justifySelf: "flex-end" }}>©2021 Genius Digital All Right Reserved</div>
                </Side2>
            </div>
        </MainContainer>
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
const Side2 = styled.div`
display: flex;
align-items: center;
flex-direction: column;
justify-content:space-between;
align-self: stretch;
background: rgb(241, 241, 241, 0.90);
width: 40vw;
padding-top: 3vh;
padding-left: 7vw;
padding-right: 7vw;
padding-bottom: 1vh;
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
