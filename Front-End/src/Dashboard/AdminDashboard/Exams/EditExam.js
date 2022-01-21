import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { Typography, Upload, Form, Input, message, Button, Modal, Select, Spin} from 'antd';
import { BsPlusSquareDotted } from "react-icons/bs";
import { InboxOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useParams } from 'react-router';
import FetchedQuestions from "./fetchedQuestions";
import { updateExam } from "../../../Redux/Actions/ExamsActions";
import ImgCrop from 'antd-img-crop';
import axios from 'axios';
import Options from "./Options";
import OrderingOptions from "./OrderingOptions";
import MatchingOptions from "./MatchingOptions";


const { Option } = Select;

const onFinishFailed = () => {
  message.error('Submit failed!');
};


const normFile = (e) => {
  console.log('Upload event:', e);

  if (Array.isArray(e)) {
    return e;
  }

  return e && e.fileList;
};
function EditExam(props) {
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();
  const navigate = useNavigate();
  const params = useParams();
  const { state } = useLocation();
  const { id } = state;
  const [QuestionForm] = Form.useForm();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [addNew, setAddNew] = useState(false);
  const [questionType, setQuestionType] = useState("multipleChoice");
  const [examCategory, setExamCategory] = useState("PMP");
  const [options, setOptions] = useState([]);
  const [questions, setQuestions] = useState([]);
  const data = useSelector(state => state.allExams.exams.filter(e => e.key === id)[0])
  const [examQuestionsIDs, setExamQuestionsIDs] = useState([]);
  const [orderChanged, setOrderChanged] = useState(false);
  const [deleteChanged, setDeleteChanged] = useState(false);
  const [qCount, setQCOunt] = useState(0);
  const [deletedQuestionIDs, setDeletedQuestionIDs] = useState([]);
  const [imageID, setImageID] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [validQuestion, setValidQuestion]= useState(false);

  if (data !== undefined) {
    form.setFieldsValue({
      brief: data.examBrief,
      description: data.examDescription,
      examTitle: data.examName,
      passingRate: data.examPasinRate,
      period: data.examPeriod,
      examCategory: data.examCategory,
    })
  }
  useEffect(() => {
    //console.log("sfdgbvxc")
    setOptions([])
  }, [questionType])

  useEffect(() => {
    if (data) {
      setTimeout(() => {
        setLoading(false)
      }, 1000);
      if (data.examImageID) {
        setImageID(data.examImageID)
        setFileList([
          {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: `http://localhost:5000/image/${data.examImageID}`,
          },
        ])
      }
    }
  }, [data])
  function insertAt(array, index, ...elementsArray) {
    array.splice(index, 0, ...elementsArray);
  }

  const setDeletedQuestionIDs1 = (key) => {
    setDeletedQuestionIDs([...deletedQuestionIDs, key])
  }

  const handleAddOk = e => {
    onQuestionCreateFinish();
    setAddNew(false);
  };

  const handleAddCancel = e => {
    setAddNew(false);
  };

  const onFinish = () => {
    setLoading(false)
    let i = questions.length;
    var ids = [...data.examQuestionsIDs]
    if (deletedQuestionIDs !== [] && !deleteChanged) {
      deletedQuestionIDs.forEach(el => {
        ids = ids.filter(e => e !== el)
      })
    }
    if (i === 0) {
      onExamEditFinish(deleteChanged || orderChanged ? examQuestionsIDs : ids)
      message.success('Changes Saved!');
    }
    else questions.forEach(async (question, index) => {
      //console.log("question:", question)
      const res = await axios
        .post("http://localhost:5000/question/add", {
          qesText: question.qesText,
          qesType: question.qesType,
          options: question.options,
          ansExp: question.ansExp,
        })
      ids.push(res.data)
      i--;

      if (i === 0) {

        onExamEditFinish(deleteChanged || orderChanged ? examQuestionsIDs : ids)
        message.success('Changes Saved!');
      }

    })

  }
  const onQuestionCreateFinish = () => {
    setDeleteChanged(false)
    //console.log("options", options)
    message.success('Question Adding success!');
    QuestionForm.validateFields()
      .then(
        (question) => {
          //console.log("aded q:", question)
          setQuestions([...questions, {
            qesText: question.questionText,
            qesType: questionType,
            options: options,
            ansExp: question.answerExplination,
            number: qCount + 1,
          }])
          setQCOunt(qCount + 1)
        }
      ).then(() => {
        
        QuestionForm.setFieldsValue({
          questionText: "",
          answerExplination: ""
        })
      })
setOptions([])
  }
  const onExamEditFinish = (qids) => {
    form.validateFields(["examTitle", "passingRate", "period", "description", "brief"])
      .then(
        ({ examTitle, passingRate, period, description, brief }) => {
          //console.log("title", { examTitle, passingRate, period, description, brief })
          //console.log("delete changed:", deleteChanged)
          //console.log("qids", qids)
          dispatch(
            updateExam({
              key: data.key,
              examName: examTitle,
              examDuration: 0,
              examPasinRate: passingRate,
              examPeriod: period,
              examDescription: description,
              examQuestionsIDs: qids,
              examBrief: brief,
              examStatus: true,
              examCategory: examCategory,
              examImageID: imageID,
            }))
        })
  }
  const onUploadChange = (event) => {
    console.log(event)
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
  const renderOptions=(questionType)=>{
    switch (questionType) {
      case "multipleChoice":
        return(
          <Options status="editing" Options={options} setOptions={setOptions} setValidQuestion={setValidQuestion} ></Options>
        )
      case "ordering":
        return(
          <OrderingOptions status="editing" Options={options} setOptions={setOptions} setValidQuestion={setValidQuestion} useForm={Form.useForm} ></OrderingOptions>
        )
      case "matching":
        return(
          <MatchingOptions status="editing" Options={options} setOptions={setOptions} setValidQuestion={setValidQuestion} ></MatchingOptions>
        )
      default:
        break;
    }
  }
  //console.log(loading)
  return (
    loading ? <div style={{ display: "flex", justifyContent: "center", margin: "4vh 4vw 2vh 4vw", alignItems: "center", width: "90%", height: "90%" }}><Spin size="large" /></div> : <div>
      <div style={{ display: "flex", justifyContent: "space-between", margin: "4vh 4vw 2vh 4vw", alignItems: "center" }}>
        <div style={{ fontSize: "28px", fontWeight: "600" }}> Edit exam </div>
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
            onFinish={onExamEditFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item

              name="examTitle"
              label="Exam Title"
              rules={[{ required: true, message: 'Please input Title!' }]} >
              <Input
                placeholder="input placeholder" />
            </Form.Item>
            <Form.Item
              name="passingRate"
              label="Passing Rate"
              rules={[{ required: true, message: 'Please input Price!' }]}
            >
              <Input placeholder="input placeholder" />
            </Form.Item>
            <Form.Item
              name="period"
              label="Period"
              rules={
                [{ required: true }, { warningOnly: true }, { type: 'string' }]
              } >
              <Input placeholder="input placeholder" />
            </Form.Item>
            <Form.Item name={'examCategory'} label="Exam Category">
              <Select onChange={(c) => setExamCategory(c)} value={examCategory}>
                <Option value="PMP">PMP</Option>
                <Option value="CAPM">CAPM</Option>
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
              <Input.TextArea showCount maxLength={60} />
            </Form.Item>
            <Form.Item label="Exam Image">
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
              <div style={{ fontSize: "18px", fontWeight: "600" }}> Questions </div>
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
              okButtonProps={{ disabled: !validQuestion }}
              cancelButtonProps={{ disabled: false }}
              width={"50vw"}
            >
              <div style={{ display: "flex", flexDirection: "column", flexWrap: "wrap", width:"100%" }}>
                <Form form={QuestionForm} layout="vertical" name="nest-messages" onFinish={onQuestionCreateFinish}>
                  <Form.Item name={'questionText'} label="Question Text">
                    <Input.TextArea />
                  </Form.Item>
                  <Form.Item name={'answerExplination'} label="Answer Explination">
                    <Input.TextArea />
                  </Form.Item>
                  {/* <List
                    size="small"
                    header={<div>Options</div>}
                    bordered
                    dataSource={fetchedQuestions}
                    renderItem={item => <List.Item>{item}</List.Item>}
                  /> */}</Form>
                  <div style={{display:"flex", flexDirection:"column", gap:"8px"}}>
                    <div>Question Type</div>
                  <Select style={{marginBottom:"20px"}} onChange={(e) =>{ 
                      setOptions(e==="matching"?[{
                        ["root"]: {
                            name: "Options",
                            items: []
                        },
                    }]:[])
                      setQuestionType(e)}
                      } value={questionType}>
                      <Option value="multipleChoice">Multiple Choice</Option>
                      <Option value="ordering">Ordering</Option>
                      <Option value="matching">Matching</Option>
                    </Select>
                    </div>
                  {renderOptions(questionType)}   
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
                  height: 500,
                  overflow: 'auto',
                  padding: '0 16px',
                  border: '1px solid rgba(140, 140, 140, 0.35)',
                }}
              >
                {data !== undefined && <FetchedQuestions setDeletedQuestionIDs={setDeletedQuestionIDs1}
                  setQCOunt={setQCOunt} setDeleteChanged={setDeleteChanged} setOrderChanged={setOrderChanged}
                  setExamQuestionsIDs={setExamQuestionsIDs} addedQuestions={questions} setaddedQuestions={setQuestions} useForm={editForm} ids={data.examQuestionsIDs} />}

              </div>
            </Form.Item>
          </div>
        </FormContainer>
      </div>
    </div>
  )
}
export default EditExam;
const FormContainer = styled.div`
background-color: white;
width: clamp(400px, 37vw ,38vw);
padding:25px;
`
