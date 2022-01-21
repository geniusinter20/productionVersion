import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Upload, Form, Input, message, Button, Tooltip, Modal, Table, Select, List, Image, Spin } from 'antd';
import { BsPlusSquareDotted } from "react-icons/bs";
import { InboxOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import ImgCrop from 'antd-img-crop';
import axios from 'axios';
import { selectedPracticeTest } from '../../../Redux/Actions/practiceTestsActions';
import { fetchExamsSuccess } from '../../../Redux/Actions/ExamsActions';

const { Paragraph, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;
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
        dataIndex: 'examQuestionNo',
    },
];

const onFinishFailed = () => {
    message.error('Submit failed!');
};

const onFill = () => {

};

const normFile = (e) => {
    console.log('Upload event:', e);

    if (Array.isArray(e)) {
        return e;
    }

    return e && e.fileList;
};

export default function AddPracticeTests(props) {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [addedExamsIDs, setAddedExamsIDs] = useState([]);
    const [addedWSWL, setAddedWSWL] = useState([]);
    const [addedExams, setAddedExams] = useState([]);
    const [selectedExams, setSelectedExams] = useState([]);
    const [addNew, setAddNew] = useState(false);
    const [tempWSWL, setTempWSWL] = useState('');
    const [existedExamsIds, setExistedExamsIds] = useState([]);
    const [testType, setTestType] = useState(null);
    const [testCategory, setTestCategory] = useState(null);
    const [imageID, setImageID] = useState(null);
    const [fileList, setFileList] = useState([]);
    const [loadingTest, setLoadingTest] = useState(true)
    const { state } = useLocation();
    const { id } = state;
    const allExams = useSelector(state => state.allExams.exams)
    const exams = useSelector(state => state.allExams.exams
        .filter(item => !existedExamsIds.includes(item._id))
    );
    const existedExams = useSelector(state => state.allExams.exams
        .filter(item => existedExamsIds.includes(item._id))
    );
    const data = useSelector(state => state.selectedPracticeTest)
    useEffect(() => {
        dispatch(selectedPracticeTest(id))
    }, [])
    if (data !== undefined) {
        form.setFieldsValue({
            testTitle: data.testTitle,
            price: data.testPrice,
            validationPeriod: data.testValidationPeriod,
            description: data.testDescription,
            brief: data.testBrief
        })
    }
    useEffect(() => {
        if (data.testExamsIDs !== undefined) {
            //console.log("data1", data)
            setExistedExamsIds(data.testExamsIDs)
        }
        if (data.whatStudentWillPractice !== undefined) {
            setAddedWSWL(data.whatStudentWillPractice)
        }

    }, [existedExamsIds, data])

    useEffect(() => {
        setAddedExams(existedExams)
    }, [existedExamsIds, data])

    useEffect(() => {
        setLoadingTest(data.loadingTest)
        if (data !== undefined) {
            setTestType(data.testType)
            setTestCategory(data.testCategory)
        }
        if (data.testImageID) {
            setImageID(data.testImageID)
            setFileList([
                {
                    uid: '-1',
                    name: 'image.png',
                    status: 'done',
                    url: `http://localhost:5000/image/${data.testImageID}`,
                },
            ])
        }
    }, [data])

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
    const handleDelete = (key) => {
        console.log("key", key)
        const temp = addedExamsIDs.filter(e => e !== key)
        setAddedExamsIDs(temp)
        dispatch({ type: "REMOVE_SELECTED_PRACTICETEST_EXAM", payload: key })
    }
    const rowSelection = {
        onChange: (selectedRowIDs, selectedRows) => {
            setSelectedExams(selectedRows)
            //console.log(`selectedRowIDs: ${selectedRowIDs}`, 'selectedRows: ', selectedRows);
        },
    }
    const handleOk = e => {
        //console.log("selected:", selectedExams)
        selectedExams.forEach(e => {
            dispatch({ type: "SELECTED_PRACTICETEST_ADDEXAM", payload: e.key })
        })
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
        //console.log("tempwswp", tempWSWL)
        dispatch({ type: "SELECTED_PRACTICETEST_ADDWSWP", payload: tempWSWL })
    }
    const onFinish = () => {
        message.success('Update success!');
        form.validateFields()
            .then(
                ({ testTitle, brief, price, validationPeriod, description }) => {
                    dispatch({
                        type: "SELECTED_PRACTICETEST_UPDATE", payload: {
                            key: id,
                            testTitle: testTitle,
                            testPrice: price,
                            testValidationPeriod: validationPeriod,
                            testDescription: description,
                            testBrief: brief,
                            testImageID: imageID,
                            testType: testType,
                            testCategory: testCategory,
                            whatStudentWillPractice: addedWSWL
                        }
                    })
                }
            )
            .catch((errorInfo) => { });
    };
    //console.log(addedExamsIDs, addedExams)
    const onUploadChange = (event) => {
        //console.log(event)
        setFileList(event.fileList)
        if (event.file.response) setImageID(event.file.response.id)
    }
    const handleRemove = (imageID) => {
        console.log(imageID)
        axios.post(`http://localhost:5000/image/delete/${imageID}`)
        setFileList([])
        setImageID(null)
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
        loadingTest ? <div style={{ display: "flex", justifyContent: "center", margin: "4vh 4vw 2vh 4vw", alignItems: "center", width: "90%", height: "90%" }}><Spin size="large" /></div> : <div>
            <div style={{ display: "flex", justifyContent: "space-between", margin: "4vh 4vw 2vh 4vw", alignItems: "center" }}>
                <div style={{ fontSize: "28px", fontWeight: "600" }}> Edit Test </div>
                <Button type="primary"
                    onClick={() => onFinish()}
                    shape="round"
                    style={
                        { height: "40px", width: "135px", display: "flex", alignItems: "center", justifyContent: "Space-evenly", padding: "5px" }
                    }>Save Changes</Button >
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
                        >
                            <Input placeholder="input placeholder" />
                        </Form.Item>
                        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "20px", marginBottom:"17px" }}>
                            <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "7px" }}>
                                <div>Test Type</div>
                                <Select onChange={(v) => setTestType(v)} value={testType}>
                                    <Select.Option value="FP">Full Package</Select.Option>
                                    <Select.Option value="PTO">Practic Test Only</Select.Option>
                                </Select>
                            </div>
                            <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "7px" }}>
                                <div>Test Category</div>
                                <Select onChange={(v) => setTestCategory(v)} value={testCategory}>
                                    <Select.Option value="PMP">PMP</Select.Option>
                                    <Select.Option value="CAPM">CAPM</Select.Option>
                                </Select>
                            </div>
                        </div>
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
                        <Form.Item label="Test Image">
                            <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
                                <ImgCrop aspect={16 / 9} minZoom={0.1} quality={1} grid>
                                    <Upload.Dragger onRemove={() => handleRemove(imageID)} onChange={onUploadChange} listType="picture" maxCount={1}
                                        name="file" onPreview={onPreview} action='http://localhost:5000/image/upload' accept=".jpg, .jpeg, .png"
                                        fileList={fileList} beforeUpload={beforeUpload}>
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
                                        <List.Item key={item.key}>
                                            <List.Item.Meta
                                                title={
                                                    <div style={{ display: "flex", gap: "1vw", alignItems: "baseline" }}>
                                                        <Text
                                                            ellipsis={true}
                                                            style={{ fontSize: "16px" }}>
                                                            <Tooltip title="prompt text">
                                                                {item.examName}
                                                            </Tooltip>
                                                        </Text>
                                                        <div style={{ fontSize: "13px", color: "#6C6C6C" }}>
                                                            {`${item.examPeriod} min`}
                                                        </div>
                                                        <div style={{ fontSize: "13px", color: "#6C6C6C" }}>
                                                            {`${item.examQuestionsIDs.length} ques`}
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
                                            <Button onClick={() => handleDelete(item.key)} style={{ marginLeft: "1vw", fontWeight: "600" }} type="text" danger>
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
