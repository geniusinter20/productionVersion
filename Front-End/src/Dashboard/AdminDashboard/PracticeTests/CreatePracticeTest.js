import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Upload, Form, Input, message, Button, Tooltip, Modal, Table } from 'antd';
import { BsPlusSquareDotted } from "react-icons/bs";
import { InboxOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { List, Select } from 'antd';
import { createPracticeTest } from "../../../Redux/Actions/practiceTestsActions";
import {useNavigate} from "react-router-dom"
import axios from 'axios';
import ImgCrop from 'antd-img-crop';

const { Paragraph, Text } = Typography;
const { TextArea } = Input;
const ModalColumns = [
    {
        title: 'ID',
        dataIndex: '_id',
        ellipsis: true,
        width: "15%",
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Name',
        dataIndex: 'examName',
        width: "45%",
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'CreatedDate',
        dataIndex: 'examCreatedDate',
        width: "25%",
        ellipsis: true,
    },
    {
        title: 'Questions',
        width: "15%",
        dataIndex: 'examQuestionsIDs',
        render: x=>x.length
    },
];

const onFinishFailed = () => {
    message.error('Submit failed!');
};

const onFill = () => {

};

const normFile = (e) => {
    //console.log('Upload event:', e);

    if (Array.isArray(e)) {
        return e;
    }

    return e && e.fileList;
};

export default function AddPracticeTests(props) {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const navigate= useNavigate();
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [addedExamsIDs, setAddedExamsIDs] = useState([]);
    const [addedWSWL, setAddedWSWL] = useState([]);
    const [addedExams, setAddedExams] = useState([]);
    const [selectedExams, setSelectedExams] = useState([]);
    const [addNew, setAddNew] = useState(false);
    const [tempWSWL, setTempWSWL] = useState('');
    const [testType, setTestType]= useState(null);
    const [testCategory, setTestCategory]= useState(null);
    const [imageID, setImageID]= useState(null);
    const exams = useSelector(state => state.allExams.exams
        .filter(item => !addedExamsIDs.includes(item._id))
    );
    function insertAt(array, index, ...elementsArray) {
        array.splice(index, 0, ...elementsArray);
    }
    const handleTextEdit = (e, index) => {
        const temp = addedWSWL.filter((item, ind) => ind !== index)
        insertAt(temp, index, e)
        setAddedWSWL(temp)
        //setEditableStr(e);
    }
    const showModal = () => {
        setSelectedExams([])
        setVisible(true);
    };
    const rowSelection = {
        onChange: (selectedRowIDs, selectedRows) => {
            setSelectedExams(selectedRows)
            //console.log(`selectedRowIDs: ${selectedRowIDs}`, 'selectedRows: ', selectedRows);
        },
    }
    const handleOk = e => {
        let temp = [];
        let tempids = [];
        
        selectedExams.forEach(e => {
            temp = [...temp, e]
            tempids = [...tempids, e.key]
        })
        //console.log("addedExamsIDs", tempids)
        setAddedExamsIDs([...tempids])
        //console.log("addedExamsIDs", addedExamsIDs)
        setAddedExams(temp)
        setVisible(false);
    };

    const handleCancel = e => {
        setVisible(false);
    };
    const handleAddOk = e => {
        setTempWSWL('')
        handleTextAdd();
        setAddNew(false);
    };

    const handleAddCancel = e => {
        setAddNew(false);
    };
    const handleTextAdd = () => {
        const temp = addedWSWL
        temp.push(tempWSWL)
        setAddedWSWL(temp)
    }
    const onFinish = () => {
        message.success('Submit success!');
        form.validateFields()
            .then(
                ({ testTitle, price, validationPeriod, description, brief, uploadImage }) => {
                    dispatch(createPracticeTest({
                        testTitle: testTitle,
                        testPrice: price,
                        testValidationPeriod: validationPeriod,
                        testDescription: description,
                        testImageID: imageID,
                        testType: testType,
                        testCategory: testCategory,
                        testExamsIDs: addedExamsIDs,
                        whatStudentWillPractice: addedWSWL,
                        testStatus: true,
                        testBrief: brief,
                        testCreatedDate: new Date()
                    }))
                })
            .catch((errorInfo) => { });
            navigate("/dashboard/practicetests")
            window.location.reload(true);
    };
    //console.log("testType",testType)
    const onUploadChange= (event)=>{
        //console.log(event.file.response)
        if(event.file.response) setImageID(event.file.response.id)
    }
    const handleRemove= (imageID)=>{
        console.log(imageID)
        axios.post(`http://localhost:5000/image/delete/${imageID}`)
    }
    const beforeUpload=()=>{
        if(imageID) axios.post(`http://localhost:5000/image/delete/${imageID}`)
        return true
      }
    const onPreview = async file => {
        let src = file.url;
        
        if (!src) {
          src = await new Promise(resolve => {
            const reader = new FileReader();
            reader.readAsDataURL(file.originFileObj);
            reader.onload = () => {
                resolve(reader.result);}
          });
        }
        const image = new Image();
    image.src = src;
    
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
    }
    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", margin: "4vh 4vw 2vh 4vw", alignItems: "center" }}>
                <div style={{ fontSize: "28px", fontWeight: "600" }}> Create Test </div>
                <Button type="primary"
                    onClick={() => onFinish()}
                    shape="round"
                    style={
                        { height: "40px", width: "135px", display: "flex", alignItems: "center", justifyContent: "Space-evenly", padding: "5px" }
                    }
                    icon={< BsPlusSquareDotted style={
                        { height: "75%", width: "30px" }
                    }
                    />}>Create Test</Button >
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", margin: "4vh 4vw 2vh 4vw", alignItems: "flex-start" }}>
                <FormContainer>
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item

                            name="testTitle"
                            label="Test Title"
                            rules={[{ required: true, message: 'Please input Title!' }]} >
                            <Input
                                placeholder="input placeholder" />
                        </Form.Item>
                        <Form.Item
                            name="price"
                            label="Price"
                            rules={[{ required: true, message: 'Please input Price!' }]}
                        >
                            <Input placeholder="input placeholder" />
                        </Form.Item>
                        <Form.Item
                            name="validationPeriod"
                            label="Validation Period"
                            rules={
                                [{ required: true }, { warningOnly: true }]
                            } >
                            <Input placeholder="input placeholder" />
                        </Form.Item>
                        <Form.Item label="Test Type">
                            <Select onChange={(v)=>setTestType(v)}>
                                <Select.Option value="FP">Full Package</Select.Option>
                                <Select.Option value="PTO">Practic Test Only</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="Test Category">
                            <Select onChange={(v)=>setTestCategory(v)}>
                                <Select.Option value="PMP">PMP</Select.Option>
                                <Select.Option value="CAPM">CAPM</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="description"
                            label="Description"
                            rules={
                                [{ required: true, message: 'Please input Intro' }]
                            } >
                            <Input.TextArea showCount maxLength={100} />
                        </Form.Item>
                        <Form.Item
                            name="brief"
                            label="Brief"
                            rules={
                                [{ required: true, message: 'Please input Intro' }]
                            } >
                            <Input.TextArea showCount maxLength={100} />
                        </Form.Item>
                        <Form.Item label="Upload Image">
                            <Form.Item name="uploadImage" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
                            <ImgCrop aspect={2/1} minZoom={0.1} quality={1} grid>
                                <Upload.Dragger onRemove={()=>handleRemove(imageID)} onChange={onUploadChange} listType="picture" maxCount={1} 
                                name="file" onPreview={onPreview} action='http://localhost:5000/image/upload' accept=".jpg, .jpeg, .png">
                                    <p className="ant-upload-drag-icon">
                                        <InboxOutlined />
                                    </p>
                                    <p className="ant-upload-hint">
                                        Drag & drop Your Image
                                        or Click to browse.</p>
                                </Upload.Dragger>
                                </ImgCrop>
                            </Form.Item>
                        </Form.Item>
                    </Form>
                </FormContainer>
                <FormContainer>
                    <div style={{ display: "flex", flexDirection: "column", gap: "2vh" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <div style={{ fontSize: "18px", fontWeight: "600" }}> Exams </div>
                            <Button
                                onClick={showModal}
                                type="primary"
                                shape="round"
                                style={
                                    { height: "35px", width: "75px", display: "flex", alignItems: "center", justifyContent: "Space-evenly", padding: "8px" }
                                }
                                icon={< BsPlusSquareDotted style={
                                    { height: "85%", width: "20px" }
                                }
                                />}>Add</Button >
                            <Modal
                                title="Exams To Add"
                                visible={visible}
                                onOk={handleOk}
                                onCancel={handleCancel}
                                okButtonProps={{ disabled: false }}
                                cancelButtonProps={{ disabled: true }}
                                width={"60vw"}
                            >
                                <Table
                                    size={"middle"}
                                    rowSelection={rowSelection}
                                    columns={ModalColumns}
                                    dataSource={exams}
                                    pagination={{ pageSize: 6, size: "small", position: ['bottomCenter'] }}
                                />
                            </Modal>
                        </div>
                        <Form.Item
                            name="Description"
                            rules={
                                [{ required: true, message: 'Please input Intro' }]
                            } >
                            <div
                                id="scrollableDiv"
                                style={{
                                    height: 300,
                                    overflow: 'auto',
                                    padding: '0 16px',
                                    border: '1px solid rgba(140, 140, 140, 0.35)',
                                }}
                            >
                                <List
                                    dataSource={addedExams}
                                    renderItem={item => (
                                        <List.Item key={item.id}>
                                            <List.Item.Meta
                                                title={
                                                    <div style={{ display: "flex", gap: "1vw", alignItems: "baseline" }}>
                                                        <Text
                                                            ellipsis={true}
                                                            style={{ fontSize: "16px" }}>
                                                            <Tooltip title={item.examName}>
                                                                {item.examName}
                                                            </Tooltip>
                                                        </Text>
                                                        <div style={{ fontSize: "13px", color: "#6C6C6C" }}>
                                                            {`${item.examCategory} `}
                                                        </div>
                                                        <div style={{ fontSize: "13px", color: "#6C6C6C" }}>
                                                            {`${item.examPeriod} Min`}
                                                        </div>
                                                        <div style={{ fontSize: "13px", color: "#6C6C6C" }}>
                                                            {`${item.examQuestionsIDs.length} Ques`}
                                                        </div>
                                                    </div>
                                                }
                                                description={
                                                    <Text
                                                        ellipsis={true}
                                                        style={{
                                                            fontSize: "13px", color: "#ABABAB"
                                                        }}
                                                    >
                                                        {item.examDescription}
                                                    </Text>}
                                            />
                                            <Button style={{ marginLeft: "1vw", fontWeight: "600" }} type="text" danger>
                                                Delete
                                            </Button>
                                        </List.Item>
                                    )}
                                />
                            </div>
                        </Form.Item>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "2vh" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <div style={{ fontSize: "18px", fontWeight: "600" }}> What Student Will learn </div>
                            <Button
                                onClick={() => setAddNew(true)}
                                type="primary"
                                shape="round"
                                style={
                                    { height: "35px", width: "75px", display: "flex", alignItems: "center", justifyContent: "Space-evenly", padding: "8px" }
                                }
                                icon={< BsPlusSquareDotted style={
                                    { height: "85%", width: "20px" }
                                }
                                />}>Add</Button >
                        </div>
                        <Modal
                            title="Add New"
                            visible={addNew}
                            onOk={handleAddOk}
                            onCancel={handleAddCancel}
                            okButtonProps={{ disabled: false }}
                            cancelButtonProps={{ disabled: false }}
                            width={"40vw"}
                        >
                            <div style={{ width: "100%", }}>
                                <TextArea showCount maxLength={100} style={{ height: 120 }} onChange={(e) => setTempWSWL(e.target.value)} value={tempWSWL} />
                            </div>
                        </Modal>
                        <Form.Item
                            name="Description"
                            rules={
                                [{ required: true, message: 'Please input Intro' }]
                            } >
                            <div
                                id="scrollableDiv"
                                style={{
                                    height: 300,
                                    overflow: 'auto',
                                    padding: '0 16px',
                                    border: '1px solid rgba(140, 140, 140, 0.35)',
                                }}
                            >

                                <List
                                    dataSource={addedWSWL}
                                    renderItem={item => (
                                        <List.Item key={item.id}>
                                            <div style={{ width: "100%" }}>
                                                <Paragraph editable={{ onChange: (e) => handleTextEdit(e, addedWSWL.indexOf(item)), maxLength: 100 }}>
                                                    {item}</Paragraph>
                                            </div>
                                        </List.Item>
                                    )}
                                />
                            </div>
                        </Form.Item>
                    </div>
                </FormContainer>
            </div>
        </div>
    )
}
const FormContainer = styled.div`
background-color: white;
width: clamp(400px, 37vw ,38vw);
padding:25px;
`
