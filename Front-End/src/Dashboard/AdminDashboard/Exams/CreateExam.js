import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Typography, Upload, Form, Input, message, Button, Tooltip, Modal, Table, Select, List, Popconfirm } from 'antd';
import { BsPlusSquareDotted } from "react-icons/bs";
import { InboxOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useParams } from 'react-router';
import FetchedQuestions from "./fetchedQuestions";
import { createExam } from "../../../Redux/Actions/ExamsActions";
import axios from 'axios';
import ImgCrop from 'antd-img-crop';
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
  const [QuestionForm] = Form.useForm();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [addNew, setAddNew] = useState(false);
  const [questionType, setQuestionType] = useState("multipleChoice");
  const [examCategory, setExamCategory] = useState("PMP");
  const [options, setOptions] = useState([]);
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();
  const params = useParams();
  const data = useSelector(state => state.allExams.exams.filter(e => e.key === params.id)[0])
  const [examQuestionsIDs, setExamQuestionsIDs] = useState([]);
  const [orderChanged, setOrderChanged] = useState(false);
  const [deleteChanged, setDeleteChanged] = useState(false);
  const [qCount, setQCOunt] = useState(0);
  const [deletedQuestionIDs, setDeletedQuestionIDs] = useState([]);
  const [imageID, setImageID] = useState(null);
  const [validQuestion, setValidQuestion]= useState(false);
  
  if (data !== undefined) {
    form.setFieldsValue({
      brief: data.examBrief,
      description: data.examDescription,
      dragger: undefined,
      examTitle: data.examName,
      passingRate: data.examPasinRate,
      period: data.examPeriod,
      examCategory: data.examCategory,
    })


    //

  }


  const onUploadChange = (event) => {
    //console.log(event.file.response)
    if (event.file.response) setImageID(event.file.response.id)
  }
  const handleRemove = (imageID) => {
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
          resolve(reader.result);
        }
      });
    }
    const image = new Image();
    image.src = src;

    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  }
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
    var ids = []
    if (deletedQuestionIDs !== [] && !deleteChanged) {
      deletedQuestionIDs.forEach(el => {
        ids = ids.filter(e => e !== el)
      })
    }
    if (i === 0) {
      onExamEditFinish(deleteChanged || orderChanged ? examQuestionsIDs : ids)
      navigate("/dashboard/exams")
      window.location.reload(true);
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

        navigate("/dashboard/exams")

        window.location.reload();
        message.success('Submit success!');
      }

    })

    setLoading(true);

  }
  const onQuestionCreateFinish = () => {
    //console.log("options", options)
    setDeleteChanged(false)
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
      setQuestionType("multipleChoice")
      setOptions([])
  }
  const onExamEditFinish = (qids) => {
    form.validateFields(["examTitle", "passingRate", "period", "description", "brief"])
      .then(
        ({ examTitle, passingRate, period, description, brief }) => {
          //console.log("title", { examTitle, passingRate, period, description, brief })
          // console.log("delete changed:", deleteChanged)
          // console.log("qids", qids)

          dispatch(
            createExam({
              examName: examTitle,
              examDuration: 0,
              examPasinRate: passingRate,
              examPeriod: period,
              examDescription: description,
              examImageID: imageID,
              examQuestionsIDs: qids,
              examBrief: brief,
              examStatus: true,
              examCategory: examCategory,
              examCreatedDate: new Date(),
            }))
        })


  }
  const renderOptions=(questionType)=>{
    switch (questionType) {
      case "multipleChoice":
        return(
          <Options status="creating" Options={options} setOptions={setOptions} setValidQuestion={setValidQuestion} ></Options>
        )
      case "ordering":
        return(
          <OrderingOptions status="creating" Options={options} setOptions={setOptions} setValidQuestion={setValidQuestion} useForm={Form.useForm}></OrderingOptions>
        )
      case "matching":
        return(
          <MatchingOptions status="creating" Options={options} setOptions={setOptions} setValidQuestion={setValidQuestion} ></MatchingOptions>
        )
      default:
        break;
    }
  }
  console.log(questions)
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", margin: "4vh 4vw 2vh 4vw", alignItems: "center" }}>
        <div style={{ fontSize: "28px", fontWeight: "600" }}> Create exam </div>
        <Button type="primary"
          onClick={() => onFinish()}
          shape="round"
          style={
            { height: "40px", width: "135px", display: "flex", alignItems: "center", justifyContent: "Space-evenly", padding: "5px" }
          }>Create Exam</Button >
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
            <Form.Item label="Dragger">
              <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
                <ImgCrop aspect={16 / 9} minZoom={0.5} quality={1} grid>
                  <Upload.Dragger onRemove={() => handleRemove(imageID)} onChange={onUploadChange} listType="picture" maxCount={1}
                    name="file" onPreview={onPreview} action='http://localhost:5000/image/upload' accept=".jpg, .jpeg, .png" beforeUpload={beforeUpload}>
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
              width={"40vw"}
              
            >
              <div style={{ display: "flex", flexDirection: "column", flexWrap: "wrap" }}>
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
                {data === undefined && <FetchedQuestions setDeletedQuestionIDs={setDeletedQuestionIDs1}
                  setQCOunt={setQCOunt} setDeleteChanged={setDeleteChanged} setOrderChanged={setOrderChanged}
                  setExamQuestionsIDs={setExamQuestionsIDs} addedQuestions={questions} setaddedQuestions={setQuestions} useForm={editForm} ids={[]} />}

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











// import React, { useState, useCallback, useEffect, useRef } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { Typography, Upload, Form, Input, message, Button, Tooltip, Modal, Table, Select } from 'antd';
// import { BsPlusSquareDotted } from "react-icons/bs";
// import { InboxOutlined } from '@ant-design/icons';
// import styled from 'styled-components';
// import { List } from 'antd';
// import { createExam } from "../../../Redux/Actions/ExamsActions";

// import Options from "./Options";
// import axios from "axios";

// const { Paragraph, Text } = Typography;
// const { TextArea } = Input;
// const { Option } = Select;

// const onFinishFailed = () => {
//     message.error('Submit failed!');
// };

// const onFill = () => {

// };

// const normFile = (e) => {
//     console.log('Upload event:', e);

//     if (Array.isArray(e)) {
//         return e;
//     }

//     return e && e.fileList;
// };
// export default function AddPracticeTests(props) {
//     const [form] = Form.useForm();
//     const [QuestionForm] = Form.useForm();
//     const dispatch = useDispatch();
//     const [loading, setLoading] = useState(false);
//     const [visible, setVisible] = useState(false);
//     const [addedWSWL, setAddedWSWL] = useState(['This is an editable text1.', 'This is an editable text2.']);
//     const [selectedExams, setSelectedExams] = useState([]);
//     const [addNew, setAddNew] = useState(false);
//     const [questionType, setQuestionType] = useState("multipleChoice");
//     const [examCategory, setExamCategory] = useState("PMP");
//     const [options, setOptions] = useState();
//     const [exam, setExam] = useState({});
//     const [questions, setQuestions] = useState([]);
//     const navigate = useNavigate();

//     //custonstate
//     const [questionsIDs, setQuestionsIDs] = useState([]);
//     function insertAt(array, index, ...elementsArray) {
//         array.splice(index, 0, ...elementsArray);
//     }
//     const handleTextEdit = (e, index) => {
//         const temp = addedWSWL.filter((item, ind) => ind !== index)
//         insertAt(temp, index, e)
//         setAddedWSWL(temp)
//         //setEditableStr(e);
//     }
//     const handleAddOk = e => {
//         onQuestionCreateFinish();
//         setAddNew(false);
//     };

//     const handleAddCancel = e => {
//         setAddNew(false);
//     };

//     const onFinish = () => {
//         setLoading(false)
//         let i = questions.length;
//         var ids = []
//         if(i===0){
//             onExamCreateFinish(ids)
//                 navigate("/dashboard/exams")
//                 window.location.reload();
//         }
//          else questions.forEach(async (question, index) => {
//             const res = await axios
//                 .post("http://localhost:5000/question/add", {
//                     qesText: question.questionText,
//                     qesType: question.questionType,
//                     options: question.options,
//                     qesAns: question.questionAanswer,
//                     ansExp: question.answerExplination,
//                 })
//             ids.push(res.data)
//             i--;
//             if (i === 0) {
//                 console.log(i)
//                 onExamCreateFinish(ids)
//                 navigate("/dashboard/exams")
//                 window.location.reload();
//                 message.success('Submit success!');
//             }

//         })

//         setLoading(true);

//     }
//     const onQuestionCreateFinish = () => {
//         message.success('Question Adding success!');
//         QuestionForm.validateFields()
//             .then(
//                 (question) => {
//                     setQuestions([...questions, {
//                         questionText: question.questionText,
//                         questionType: questionType,
//                         options: options,
//                         questionAanswer: question.questionAnswer,
//                         answerExplination: question.answerExplination,
//                     }])
//                 })
//     }
//     const onExamCreateFinish = (q) => {
//         form.validateFields(["examTitle", "passingRate", "period", "description", "brief"])
//             .then(
//                 ({ examTitle, passingRate, period, description, brief }) => {
//                     console.log("title", { examTitle, passingRate, period, description, brief })
//                     console.log("qids", q)
//                     dispatch(
//                         createExam({
//                             examName: examTitle,
//                             examDuration: 0,
//                             examPasinRate: passingRate,
//                             examPeriod: period,
//                             examDescription: description,
//                             examQuestionsIDs: q,
//                             examBrief: brief,
//                             examStatus:true,
//                             examQuestionNo: q.length,
//                             examCreatedDate: new Date(),
//                             examCategory:examCategory,
//                             examWhatStudentWillLearn: ['']
//                         }))
//                 })


//     }
//     return (
//         <div>
//             <div style={{ display: "flex", justifyContent: "space-between", margin: "4vh 4vw 2vh 4vw", alignItems: "center" }}>
//                 <div style={{ fontSize: "28px", fontWeight: "600" }}> Create exam </div>
//                 <Button type="primary"
//                     onClick={() => onFinish()}
//                     shape="round"
//                     style={
//                         { height: "40px", width: "135px", display: "flex", alignItems: "center", justifyContent: "Space-evenly", padding: "5px" }
//                     }
//                     icon={< BsPlusSquareDotted style={
//                         { height: "75%", width: "30px" }
//                     }
//                     />}>Create Test</Button >
//             </div>
//             <div style={{ display: "flex", justifyContent: "space-between", margin: "4vh 4vw 2vh 4vw", alignItems: "flex-start" }}>
//                 <FormContainer>
//                     <Form
//                         form={form}
//                         layout="vertical"
//                         onFinish={onExamCreateFinish}
//                         onFinishFailed={onFinishFailed}
//                         autoComplete="off"
//                     >
//                         <Form.Item

//                             name="examTitle"
//                             label="Exam Title"
//                             rules={[{ required: true, message: 'Please input Title!' }]} >
//                             <Input
//                                 placeholder="input placeholder" />
//                         </Form.Item>
//                         <Form.Item
//                             name="passingRate"
//                             label="Passing Rate"
//                             rules={[{ required: true, message: 'Please input Price!' }]}
//                         >
//                             <Input placeholder="input placeholder" />
//                         </Form.Item>
//                         <Form.Item
//                             name="period"
//                             label="Period"
//                             rules={
//                                 [{ required: true }, { warningOnly: true }, { type: 'string' }]
//                             } >
//                             <Input placeholder="input placeholder" />
//                         </Form.Item>
//                         <Form.Item name={'wxamCategory'} label="Exam Category">
//                                         <Select onChange={(c) => setExamCategory(c)} defaultValue="PMP">
//                                             <Option value="PMP">PMP</Option>
//                                             <Option value="CAPM">CAPM</Option>
//                                         </Select>
//                                     </Form.Item>
//                         <Form.Item
//                             name="description"
//                             label="Description"
//                             rules={
//                                 [{ required: true, message: 'Please input Intro' }]
//                             } >
//                             <Input.TextArea showCount maxLength={100} />
//                         </Form.Item>
//                         <Form.Item
//                             name="brief"
//                             label="Brief"
//                             rules={
//                                 [{ required: true, message: 'Please input Intro' }]
//                             } >
//                             <Input.TextArea showCount maxLength={60} />
//                         </Form.Item>
//                         <Form.Item label="Dragger">
//                             <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
//                                 <Upload.Dragger name="files" action="/upload.do">
//                                     <p className="ant-upload-drag-icon">
//                                         <InboxOutlined />
//                                     </p>
//                                     <p className="ant-upload-hint">
//                                         Drag & drop Your Image
//                                         or Click to browse.</p>
//                                 </Upload.Dragger>
//                             </Form.Item>
//                         </Form.Item>
//                     </Form>
//                 </FormContainer>
//                 <FormContainer>
//                     <div style={{ display: "flex", flexDirection: "column", gap: "2vh" }}>
//                         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//                             <div style={{ fontSize: "18px", fontWeight: "600" }}> Questions </div>
//                             <Button
//                                 onClick={() => setAddNew(true)}
//                                 type="primary"
//                                 shape="round"
//                                 style={
//                                     { height: "35px", width: "75px", display: "flex", alignItems: "center", justifyContent: "Space-evenly", padding: "8px" }
//                                 }
//                                 icon={< BsPlusSquareDotted style={
//                                     { height: "85%", width: "20px" }
//                                 }
//                                 />}>Add</Button >
//                         </div>
//                         <Modal
//                             title="Add New"
//                             visible={addNew}
//                             onOk={handleAddOk}
//                             onCancel={handleAddCancel}
//                             okButtonProps={{ disabled: false }}
//                             cancelButtonProps={{ disabled: false }}
//                             width={"40vw"}
//                         >
//                             <div style={{ display: "flex", flexDirection: "column", flexWrap: "wrap" }}>
//                                 <Form form={QuestionForm} layout="vertical" name="nest-messages" onFinish={onQuestionCreateFinish}>
//                                     <Form.Item name={'questionText'} label="Question Text">
//                                         <Input.TextArea />
//                                     </Form.Item>
//                                     <Form.Item name={'questionType'} label="Question Type">
//                                         <Select onChange={(e) => setQuestionType(e)} defaultValue="multipleChoice">
//                                             <Option value="multipleChoice">Multiple Choice</Option>
//                                             <Option value="ordering">Ordering</Option>
//                                             <Option value="matching">Matching</Option>
//                                         </Select>
//                                     </Form.Item>
//                                     <Form.Item name={'answerExplination'} label="Answer Explination">
//                                         <Input.TextArea />
//                                     </Form.Item>
//                                     {/* <List
//                                         size="small"
//                                         header={<div>Options</div>}
//                                         bordered
//                                         dataSource={options}
//                                         renderItem={item => <List.Item>{item}</List.Item>}
//                                     /> */}
//                                     <Options status="creating" Options={options} setOptions={setOptions} column="1" ></Options>
//                                 </Form>
//                             </div>
//                         </Modal>
//                         <Form.Item
//                             name="Description"
//                             rules={
//                                 [{ required: true, message: 'Please input Intro' }]
//                             } >
//                             <div
//                                 id="scrollableDiv"
//                                 style={{
//                                     height: 300,
//                                     overflow: 'auto',
//                                     padding: '0 16px',
//                                     border: '1px solid rgba(140, 140, 140, 0.35)',
//                                 }}
//                             >

//                                 {/* <List
//                                     dataSource={addedWSWL}
//                                     renderItem={item => (
//                                         <List.Item key={item.id}>
//                                             <div style={{ width: "100%" }}>
//                                                 <Paragraph editable={{ onChange: (e) => handleTextEdit(e, addedWSWL.indexOf(item)), maxLength: 100 }}>
//                                                     {item}</Paragraph>
//                                             </div>
//                                         </List.Item>
//                                     )}
//                                 /> */}
//                             </div>
//                         </Form.Item>
//                     </div>
//                 </FormContainer>
//             </div>
//         </div>
//     )
// }
// const FormContainer = styled.div`
// background-color: white;
// width: clamp(400px, 37vw ,38vw);
// padding:25px;
// `
