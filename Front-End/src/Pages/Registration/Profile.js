import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import styled from 'styled-components'
import { Row, Col } from "antd"
import profilePic from "../../Images/profilePic.png"
import { Descriptions, Button, Typography, Form, Input, Tag, Image, Upload } from 'antd'
import { useSelector } from "react-redux"
import Collapse from '@mui/material/Collapse';
import { useDispatch } from "react-redux"
import { changePassword, updateImage, updateInfo } from "../../Redux/Actions/UserAuthActions"
import axios from 'axios'
import ImgCrop from 'antd-img-crop';
import { BsFillCameraFill } from "react-icons/bs"
import NavBar from '../../Components/AppNavbar/Navbar'
import { Countries } from './Countries'
import * as flags from 'react-flags-select';
import TextField from '@mui/material/TextField';
import PhoneInput from 'react-phone-input-2'
import ReactFlagsSelect from 'react-flags-select';
import { Helmet } from 'react-helmet'
import {  IoClose } from "react-icons/io5";

const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
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
function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}
export default function Profile() {
    const auth = useSelector(state => state.auth)
    const navigate = useNavigate()
    useEffect(() => {
        if (!auth.loggedIn) navigate("/login")
    }, [auth.loggedIn])

    const [form] = Form.useForm();
    const [userInfo, setUserInfo] = useState(auth.userData)
    const [editing, setEditing] = useState(false)
    const [editingPassword, setEditingPassword] = useState(false)
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
    const dispatch = useDispatch()
    const [imageID, setImageID] = useState(userInfo && userInfo.imageID && userInfo.imageID!=="no image" ? userInfo.imageID : "no image");
    const [imageUrl, setImageUrl] = useState(userInfo && userInfo.imageID && userInfo.imageID!=="no image" ? `https://exporagenius.com:5000/image/${userInfo.imageID}` : profilePic)
    //console.log(userInfo);
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
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }
        //console.log(windowDimensions)
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [windowDimensions]);
    const saveChanges = (userInfo) => {
        setEditing(false)
        dispatch(updateInfo(userInfo))
    }
    const onUploadChange = (event) => {
        //console.log(event.file.response)
        if (event.file.response) {
            setImageID(event.file.response.id)
            setImageUrl(`https://exporagenius.com:5000/image/${event.file.response.id}`)
            dispatch(updateImage(event.file.response.id))
            axios.post(`https://exporagenius.com:5000/client/updateimage/${auth.userData._id}`, { imageID: event.file.response.id })
        }
    }
    const handleRemove = (imageID, deleting) => {
        //console.log(imageID)
        setImageID("no image")
        if(deleting){
            setImageUrl(profilePic)
            axios.post(`https://exporagenius.com:5000/client/updateimage/${auth.userData._id}`, { imageID:"no image" })
        }
        axios.post(`https://exporagenius.com:5000/image/delete/${imageID}`)
    }
    const beforeUpload = () => {
        if (imageID !== "no image") axios.post(`https://exporagenius.com:5000/image/delete/${imageID}`)
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
            <Helmet>
                <title>My Profile</title>
                <meta name="description" content="Genius User Profile" />
            </Helmet>
            <NavBar />
            <Segment1 gutter={[0, 15]}>
                <Col xs={{ span: 24, offset: 0 }} sm={{ span: 24, offset: 0 }} lg={{ span: 8, offset: 0 }} xl={{ span: 5, offset: 0 }}
                    style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ maxWidth: "300px", position: "relative" }}>
                        <Pic><Image src={imageUrl}></Image>
                        </Pic>
                        <ImgCrop aspect={1 / 1} minZoom={0.1} quality={0.8} grid>
                            <CusUpload showUploadList={false} onRemove={() => handleRemove(imageID)} onChange={onUploadChange} listType="picture" maxCount={1}
                                beforeUpload={beforeUpload} name="file" onPreview={onPreview} action='https://exporagenius.com:5000/image/upload' accept=".jpg, .jpeg, .png">
                                <BsFillCameraFill style={{ width: "35px", height: "35px", color: "white", }}></BsFillCameraFill>
                            </CusUpload>
                        </ImgCrop>
                        <CusClose onClick={() => handleRemove(imageID, true)}>
                                <IoClose  style={{ width: "35px", height: "35px", color: "red", }}></IoClose>
                            </CusClose>
                    </div>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24, offset: 0 }} xl={{ span: 12 }} style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                    <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
                        <div style={{ fontSize: "30px", fontWeight: "600", lineHeight: "50px", color: "#444444" }}>{auth.userData.fullName}</div>
                        {auth.userData.accountType ? <CustomTag color="processing">{auth.userData.accountType}</CustomTag> : null}
                    </div>
                    <div style={{ fontSize: "20px", fontWeight: "400", color: "#6c6c6c", maxWidth: "600px", marginBottom: "5px" }}>
                        {auth.userData.email}
                    </div>
                    <div style={{ fontSize: "13px", fontWeight: "500", color: "#6c6c6c", maxWidth: "600px" }}>
                        Joined in: {new Date(userInfo.joinDate).toLocaleDateString("en-US", options)}
                    </div>
                    {
                        !editingPassword && <Button1 onClick={() => setEditingPassword(true)} style={{ borderStyle: "none", fontSize: "14px", width: windowDimensions.width < 574 ? "100%" : "200px", marginTop: "25px" }} >Change Password</Button1>
                    }

                </Col>
            </Segment1>
            <Collapse style={{ padding: "8vh 4vw 4vh 4vw" }} in={editingPassword}>
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
                <Descriptions1 column={{ xxl: 3, xl: 3, lg: 2, md: 1, sm: 1, xs: 1 }} style={{ minWidth: "350px", width: "100%" }} title="Basic Info"
                    layout={windowDimensions.width < 574 ? 'vertical' : 'horizontal'} bordered={windowDimensions.width < 574}
                    extra={
                        editing ?
                            <div style={{ display: "flex", gap: "16px" }}>
                                <Button onClick={() => setEditing(false)} style={{ fontSize: "16px", height: 37 }} >Cancel</Button>
                                <Button type="primary" onClick={() => saveChanges(userInfo)} style={{ fontSize: "16px", height: 37 }} >Save</Button>
                            </div> :
                            <Button onClick={() => setEditing(true)} style={{ fontSize: "16px", height: 37 }} >Edit</Button>
                    }>
                    <DescriptionsItem label="FullName">
                        {
                            editing ?
                                <TextField
                                    fullWidth
                                    id="standard-basic"
                                    defaultValue={userInfo.fullName}
                                    variant="standard"
                                    onChange={event => setUserInfo({ ...userInfo, fullName: event.target.value })}
                                /> : userInfo.fullName
                        }
                    </DescriptionsItem>
                    <DescriptionsItem label="Email">
                        {
                            editing ? <TextField
                                xs={{ padding: "0 30px 0 0" }}
                                fullWidth
                                disabled
                                id="standard-basic"
                                defaultValue={userInfo.email}
                                variant="standard"
                                onChange={event => setUserInfo({ ...userInfo, email: event.target.value })}
                            /> : userInfo.email
                        }
                    </DescriptionsItem>
                    <DescriptionsItem label="PhoneNumber">{
                        editing ? <PhoneInput
                            containerClass="cusCont"
                            inputClass="cusInput1"
                            dropdownClass="cusDrop"
                            disableDropdown
                            // containerStyle={{ boxShadow: "1px 3px 5px 1px rgba(0, 0, 0, 0.12)" }}
                            country={`+${userInfo.phoneNumber.slice(3)}`}
                            value={userInfo.phoneNumber}
                            onChange={phone => setUserInfo({ ...userInfo, phoneNumber: phone })}
                        /> : `+${userInfo.phoneNumber}`
                    }
                    </DescriptionsItem>
                    <DescriptionsItem label="Country">
                        <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            {React.createElement(flags[userInfo.countryCode.charAt(0) + userInfo.countryCode.charAt(1).toLowerCase()], {})}
                            {Countries[userInfo.countryCode]}
                        </span>
                    </DescriptionsItem>
                    {/* <DescriptionsItem label="Address">
                        {
                            editing ? <TextField
                                fullWidth
                                id="standard-basic"
                                defaultValue={userInfo.address}
                                variant="standard"
                                onChange={event => setUserInfo({ ...userInfo, address: event.target.value })}
                            /> : userInfo.address
                        }
                    </DescriptionsItem> */}
                </Descriptions1>
            </Segment2>
        </div>
    )
}
const Descriptions1 = styled(Descriptions)`
position: relative;
&>*{
    overflow-y: visible;
    height: auto;
}
&>*>*>*>*>*>*{
    padding: 0 3vw 0 0;
    display: flex;
    align-items: center;
    min-height: 40px;
}
`
const DescriptionsItem = styled(Descriptions1.Item)`
`
const Button1 = styled(Button)`
background-color: #444444;
color: white;
height: 40px;
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
const CusClose = styled.div`
display: flex;
justify-content: center;
align-items: center;
position: absolute;
width: 45px;
height: 55px; 
cursor: pointer;
top:0;
right: 0;
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
  @media (max-width: 992px) {
    margin: 2vh 4vw 2vh 4vw;
    align-items: center;
    &>*:nth-child(2){
        align-items: center;
    }
}
`
const Segment2 = styled(Row)`
  padding: 0vh 4vw 0vh 4vw;
  margin: 6vh 0 2vh 0;
  justify-content: space-between;
`
const Pic = styled.div`
@media (max-width: 574px) {
height: 300px;
width: 300px;
}
border-radius: 50%;
height: 250px;
width: 250px;
position: relative;
overflow: hidden;
    &>*:nth-child(1){  
    height:100%;
    max-width: 300px;
    position: absolute;
    top: -9999px;
    left: -9999px;
    right: -9999px;
    bottom: -9999px;
    margin: auto;
    }
`;
