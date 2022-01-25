import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import styled from 'styled-components'
import { Row, Col } from "antd"
import profilePic from "../../Images/profilePic.png"
import { Descriptions, Button, Typography, Form, Input, Tag, Image, Upload } from 'antd'
import { useSelector } from "react-redux"
import Collapse from '@mui/material/Collapse';
import emailjs from '@emailjs/browser';
import { useDispatch } from "react-redux"
import { changePassword } from "../../Redux/Actions/UserAuthActions"
import axios from 'axios'
import ImgCrop from 'antd-img-crop';
import { BsFillCameraFill } from "react-icons/bs"
import NavBar from '../../Components/AppNavbar/Navbar'

const { Paragraph } = Typography;
const formItemLayout = {
    labelCol: {
        lg: { span: 5 },
        md: { span: 9 },
        sm: { span: 18 },
        xm: { span: 18 },
    },
    wrapperCol: {
        lg: { span: 5 },
        md: { span: 9 },
        sm: { span: 18 },
        xm: { span: 18 },
    },
};
var templateParams = {
    from_name: 'yazn',
    to_name: 'yazn1',
    message: 'Check this out!'
};

export default function Profile() {
    //send emails
    //     useEffect(() => {
    //     emailjs.send('service_lut0ol8', 'template_a8gkpri', templateParams, 'user_y3Z1q9WIfU0XwFNUkDWlM')
    //     .then(function(response) {
    //        console.log('SUCCESS!', response.status, response.text);
    //     }, function(error) {
    //        console.log('FAILED...', error);
    //     });
    // }, [])
    const [form] = Form.useForm();
    const navigate = useNavigate()
    const auth = useSelector(state => state.auth)
    const [userInfo, setUserInfo] = useState(auth.userData)
    const [editing, setEditing] = useState(false)
    const [editingPassword, setEditingPassword] = useState(false)
    const dispatch = useDispatch()
    const [imageID, setImageID] = useState(null);
    const [imageUrl, setImageUrl]= useState(`http://localhost:5000/image/61d6e873a266163a5c944570`)
    const onFinish = () => {
        form.validateFields()
            .then(({ currentPassword, newPassword }) => {
                dispatch(changePassword(currentPassword, newPassword, auth.userData.email, auth.userData._id))
                setEditingPassword(false)
                form.setFieldsValue({
                    currentPassword: "",
                    newPassword: "",
                    confirmNewPassword: ""
                })
            })
    };

    useEffect(() => {
        if (!auth.loggedIn) navigate("/login")
    }, [auth.loggedIn])

    const saveChanges = (userInfo) => {
        setEditing(false)
    }
    const onUploadChange = (event) => {
        //console.log(event.file.response)
        if (event.file.response) {
            setImageID(event.file.response.id)
            setImageUrl(`http://localhost:5000/image/${event.file.response.id}`)
        }
    }
    const handleRemove = (imageID) => {
        console.log(imageID)
        axios.post(`http://localhost:5000/image/delete/${imageID}`)
    }
    const beforeUpload = () => {
        if (imageID) axios.post(`http://localhost:5000/image/delete/${imageID}`)
        return true
    }
    const onPreview = async file => {
        let src = file.url;

        if (!src) {
            src = await new Promise(resolve => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => {
                    resolve(reader.result);
                }
            });
        }
        const image = new Image();
        image.src = src;

        const imgWindow = window.open(src);
        imgWindow.document.write(image.outerHTML);
    }
    return (
        auth.loggedIn && <div style={{ dispaly: "flex", flexDirection: "column" }}>
            <NavBar />
            <Segment1>
                <Col xs={{ span: 24, offset: 0 }} lg={{ span: 4, offset: 0 }} style={{ position: "relative" }}>
                    <Pic><Image src={imageUrl}></Image>
                    </Pic>
                    <ImgCrop aspect={1 / 1} minZoom={0.1} quality={1} grid>
                        <CusUpload showUploadList={false} onRemove={() => handleRemove(imageID)} onChange={onUploadChange} listType="picture" maxCount={1}
                            beforeUpload={beforeUpload} name="file" onPreview={onPreview} action='http://localhost:5000/image/upload' accept=".jpg, .jpeg, .png">
                                <BsFillCameraFill style={{ width: "35px", height: "35px", color:"white",  }}></BsFillCameraFill>
                        </CusUpload>
                    </ImgCrop>

                </Col>
                <Col xs={{ span: 24, offset: 0 }} lg={{ span: 12, offset: 0 }} style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                    <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
                        <div style={{ fontSize: "30px", fontWeight: "600", lineHeight: "50px", color: "#444444" }}>{auth.userData.fullName}</div>
                        {auth.userData.accountType ? <CustomTag color="processing">{auth.userData.accountType}</CustomTag> : null}
                    </div>
                    <div style={{ fontSize: "20px", fontWeight: "400", color: "#6c6c6c", maxWidth: "600px" }}>
                        {auth.userData.email}
                    </div>
                    {
                        !editingPassword && <Button1 onClick={() => setEditingPassword(true)} style={{ borderStyle: "none", fontSize: "14px", width: "160px", marginTop: "15px" }} >Change Password</Button1>
                    }

                </Col>
            </Segment1>
            <Collapse style={{ padding: "4vh 4vw 4vh 4vw" }} in={editingPassword}>

                <Form
                    {...formItemLayout}
                    form={form}
                    layout='vertical'
                    name="register"
                    onFinish={onFinish}
                    scrollToFirstError
                >
                    <Form.Item
                        name="currentPassword"
                        label="Current Password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Current password!',
                            },
                            // ,
                            // ({ getFieldValue }) => ({
                            //     validator(_, value) {
                            //         if (!value || getFieldValue('password') === "999") {
                            //             return Promise.resolve();
                            //         }
                            //         return Promise.reject(new Error('The two passwords that you entered do not match!'));
                            //     },
                            // }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        name="newPassword"
                        label="New Password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your new password!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="confirmNewPassword"
                        label="Confirm New Password"
                        dependencies={['password']}
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your new password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('newPassword') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item >
                        <Button htmlType="submit" type="primary">
                            Confirm
                        </Button>
                        <Button htmlType="button" style={{ margin: '0 8px' }} onClick={() => setEditingPassword(false)}>
                            Cancel
                        </Button>
                    </Form.Item>
                </Form>
            </Collapse>
            <Segment2>
                <Descriptions column={2} title="Basic Info"
                    extra={
                        editing ? <Button type="primary" onClick={() => saveChanges(userInfo)} style={{ fontSize: "16px" }} >Save Changes</Button>
                            : <Button type="text" onClick={() => setEditing(true)} style={{ borderStyle: "none", fontSize: "16px" }} >Edit</Button>
                    }>
                    <Descriptions.Item style={{ padding: "5px 0 0 0" }} label="FullName"><Paragraph editable={{
                        editing: editing,
                        triggerType: ['text'],
                        icon: <div />,
                        enterIcon: null,
                        onChange: (fullName) => setUserInfo({ ...userInfo, fullName }),
                    }}
                    >{userInfo.fullName}
                    </Paragraph>
                    </Descriptions.Item>
                    <Descriptions.Item style={{ padding: "5px 0 0 0" }} label="Email"><Paragraph editable={{
                        editing: false,
                        triggerType: ['text'],
                        icon: <div />,
                        enterIcon: null,
                        onChange: (email) => setUserInfo({ ...userInfo, email }),
                    }}
                    >{userInfo.email}
                    </Paragraph>
                    </Descriptions.Item>
                    <Descriptions.Item style={{ padding: "5px 0 0 0" }} label="PhoneNumber"><Paragraph editable={{
                        editing: editing,
                        triggerType: ['text'],
                        icon: <div />,
                        enterIcon: null,
                        onChange: (phoneNumber) => setUserInfo({ ...userInfo, phoneNumber }),
                    }}>0938704953</Paragraph>
                    </Descriptions.Item>
                    <Descriptions.Item style={{ padding: "5px 0 0 0" }} label="Address"><Paragraph editable={{
                        editing: editing,
                        triggerType: ['text'],
                        icon: <div />,
                        enterIcon: null,
                        onChange: (address) => setUserInfo({ ...userInfo, address }),
                    }}
                    >{userInfo.address}
                    </Paragraph>
                    </Descriptions.Item>
                </Descriptions>
            </Segment2>
        </div>
    )
}
const Button1 = styled(Button)`
background-color: #444444;
color: white;
&:hover{
    animation: btnmove22 0.8s;
    animation-fill-mode: forwards;
    background-color: #444444;
}

@keyframes btnmove22 {
   0% {
    background-color: #444444 ;
    color: white;
   }
   100% {
        background-color: white;
        color: #444444;
   }
}

`
const CusUpload = styled(Upload)`
display: flex;
justify-content: center;
align-items: center;
position: absolute;
width: 75px;
height: 75px; 
bottom:0;
right: 0;
background: rgba(28, 28, 28,0.8);
border-radius: 50%;

&:hover >*{
    animation: mytran 0.8s;
    animation-fill-mode: forwards;
}
&:not(:hover)>*{
    animation: mytran1 0.8s;
    animation-fill-mode: forwards;
}
@keyframes mytran {
    0%   {transform: scale(1);}
    100% {transform: scale(1.2);}
  }
  @keyframes mytran1 {
    0%   {transform: scale(1.2)}
    100% {transform: scale(1)}
  }
`
const CustomTag = styled(Tag)`
  border-style: none;
  height: 29px;
  padding: 4px 15px 4px 15px;
  border-radius: 200px;
  background-color: #e7efff;
  font-weight: 500;
`
const Segment1 = styled(Row)`
  padding: 0vh 4vw 0vh 4vw;
  margin: 2vh 0 2vh 0;
  justify-content: flex-start;
  gap: 30px;
`
const Segment2 = styled(Row)`
  padding: 0vh 4vw 0vh 4vw;
  margin: 6vh 0 2vh 0;
  justify-content: space-between;
`
const Pic = styled.div`
@media (max-width: 700px) {
    height: 300px;
  width: 300px;
}
  border-radius: 50%;
  height: 250px;
  width: 250px;
  position: relative;
    overflow: hidden;
    position: relative;
    &>*:nth-child(1){  
    height:250px;
    max-width: 250px;
    position: absolute;
    top: -9999px;
    left: -9999px;
    right: -9999px;
    bottom: -9999px;
    margin: auto;
    }
`;
