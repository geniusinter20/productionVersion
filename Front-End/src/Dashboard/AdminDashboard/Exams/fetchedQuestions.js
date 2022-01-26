import React, { Component } from "react";
import { Typography, Form, Input, message, Button, Tooltip, Modal, Table, Select, List, Popconfirm } from 'antd';
import axios from "axios";
import Options from "./Options";
import ReactDragListView from "react-drag-listview";
import { FiMenu } from "react-icons/fi";
import styled from "styled-components";
import OrderingOptions from "./OrderingOptions";
import MatchingOptions from "./MatchingOptions";
import { connect } from 'react-redux'
import PuffLoader from "react-spinners/PuffLoader"

const { Paragraph, Text } = Typography;
var QuestionForm = null;
const { Option } = Select;
const mapStateToProps = (state) => {
    const { creating, created } = state.allExams
    return {
        editing: creating,
        edited: created,
    }
}
class FetchedQuestions extends Component {
    state = {
        fetchedQuestions: [],
        showModal: false,
        selectedQuestion: {},
        addedOptions: [],
        addedQuestions: [],
        questionType: null,
        options: [],
        validQuestion: true,
        editing: false,
        edited: false,
        loadingQuestions: true,
    }

    componentDidMount() {
        this.fetchQuestion(this.props.ids)
        QuestionForm = this.props.useForm;
    }
    // fetchQuestion = (e) => {
    //     var number = 0;
    //     e.forEach(async element => {
    //         var res = await axios.get(`https://exporagenius.com:5000/question/${element}`)
    //         number++;
    //         this.addQuestion({ ...res.data[0], number: number })
    //         this.props.setQCOunt(number)
    //         //console.log({ ...res.data[0], number: number })
    //     });

    // }
    fetchQuestion = (e) => {
        var number = 0;
        e.every(async element => {
            var res = await axios.get(`https://exporagenius.com:5000/question/${element}`)
            if (res.data.msg) {
                message.error({ content: `Error loading questions: ${res.data.msg}`, className: "message" });
                this.setState({ loadingQuestions: false })
                return
            }
            number++;
            this.setState(prevState => ({
                fetchedQuestions: [...prevState.fetchedQuestions, { ...res.data[0], number: number }]
            }))
            this.props.setQCOunt(number)
            if (this.state.fetchedQuestions.length === e.length) {
                this.setState({ loadingQuestions: false })
            }
            //console.log({ ...res.data[0], number: number })
        });

    }

    // addQuestion = (q) => {
    //     this.setState(prevState => ({
    //         fetchedQuestions: [...prevState.fetchedQuestions, q]
    //     }))
    // }
    setValidQuestion = (e) => {
        this.setState({ validQuestion: e })
    }
    setOptions = (options) => {
        this.setState(
            prevState => ({
                selectedQuestion: { ...prevState.selectedQuestion, options: options }
            }))
    }


    handleAddOk = e => {
        this.onQuestionEditFinish();
        this.setState({ showModal: false });
    };

    handleAddCancel = e => {
        this.setState({ showModal: false });
    };

    deleteConfirm(item) {

        const temp = this.state.fetchedQuestions.filter(el => el.number !== item.number)
        const temp2 = temp.filter(el => (el.number !== item.number && el.key === undefined))
        const ids = temp.map(x => x.key)
        this.setState({ fetchedQuestions: temp })

        //console.log("remaddedQs", temp2)

        const check = item.key === undefined
        if (check) {
            //console.log("heeee")
            this.props.setaddedQuestions(temp2)
        }
        else {
            //console.log("hoooooo")
            this.props.setExamQuestionsIDs(ids.filter(e => e !== undefined))
            this.props.setDeleteChanged(true)
            this.props.setDeletedQuestionIDs(item.key)
        }
        // setDeleteChanged(item.key===undefined?false:true)
        //     
    }

    deleteCancel(e) {

    }
    setQuestionAnswer = (e) => {
        this.setState({ questionAnswer: e })
    }

    onQuestionEditFinish = async (id) => {
        message.success('Question Editing success!');
        //console.log("options1:", this.state.options)
        QuestionForm.validateFields()
            .then(
                (question) => {
                    const newQ = {
                        qesText: question.questionText,
                        qesType: this.state.questionType,
                        options: this.state.selectedQuestion.options,
                        ansExp: question.answerExplination,
                        number: this.state.selectedQuestion.number,
                        key: this.state.selectedQuestion.key
                    }
                    if (this.state.selectedQuestion !== {}) {
                        var k = this.state.selectedQuestion.key
                        //console.log("key ", k)
                        var temp = this.state.fetchedQuestions
                        var index = this.state.fetchedQuestions.findIndex(e => e.key === k)
                        temp.splice(index, 1, newQ)
                        console.log("questions:", temp)
                        this.setState({
                            ...this.state,
                            selectedQuestion: newQ,
                            fetchedQuestions: temp,
                        })
                        //console.log("key", this.state.selectedQuestion.key)
                        axios.post(`https://exporagenius.com:5000/question/update/${this.state.selectedQuestion.key}`, newQ)
                    }
                })
    }
    showModal = (question, options) => {
        this.setState({ showModal: true, selectedQuestion: question, questionAnswer: question.qesAns, questionType: question.qesType })
        //console.log("selectedQuestion:",question)
        console.log(this.state.fetchedQuestions);
        QuestionForm.setFieldsValue({
            questionText: question.qesText,
            answerExplination: question.ansExp,

        })
    }

    static getDerivedStateFromProps(props, state) {
        //console.log("state", state.Qid)
        //console.log("props",props.QID)
        // if(state.edited!==props.edited || state.editing !==props.editing)
        //     return{
        //         editing: props.editing,
        //         edited:props.edited,
        //     }
        if (state.addedQuestions.length !== props.addedQuestions.length)
            return {
                addedQuestions: props.addedQuestions,
                fetchedQuestions: [...new Map([...state.fetchedQuestions, ...props.addedQuestions].slice().reverse().map(v => [v.number, v])).values()].reverse()
                //[...new Map([...state.fetchedQuestions, ...props.addedQuestions].map(v => [v.key, v]))]
                //[...state.fetchedQuestions, ...props.addedQuestions]
            }
        else return {
            addedQuestions: props.addedQuestions,
            fetchedQuestions: state.fetchedQuestions
        }
    }

    onDragEnd = (fromIndex, toIndex) => {
        if (toIndex < 0) return; // Ignores if outside designated area

        const items = [...this.state.fetchedQuestions];
        const item = items.splice(fromIndex, 1)[0];
        items.splice(toIndex, 0, item);
        const ids = items.map(x => x.key)
        //console.log("neworder", ids)
        this.props.setOrderChanged(true)
        this.props.setExamQuestionsIDs(ids)
        this.setState({ fetchedQuestions: items });
    };
    renderOptions = (questionType) => {
        //console.log(this.state.selectedQuestion)
        switch (questionType) {
            case "multipleChoice":
                return (
                    <Options QID={this.state.selectedQuestion !== undefined ? this.state.selectedQuestion.key : undefined}
                        setOptions={this.setOptions} status="editing" setValidQuestion={this.setValidQuestion}
                        Options={this.state.selectedQuestion !== undefined ? this.state.selectedQuestion.options : undefined}  ></Options>
                )
            case "ordering":
                return (
                    <OrderingOptions QID={this.state.selectedQuestion !== undefined ? this.state.selectedQuestion.key : undefined}
                        setOptions={this.setOptions} status="editing" setValidQuestion={this.setValidQuestion} useForm={Form.useForm}
                        Options={this.state.selectedQuestion !== undefined ? this.state.selectedQuestion.options : undefined} ></OrderingOptions>
                )
            case "matching":
                return (
                    <MatchingOptions QID={this.state.selectedQuestion !== undefined ? this.state.selectedQuestion.key : undefined}
                        setOptions={this.setOptions} status="editing" setValidQuestion={this.setValidQuestion}
                        Options={this.state.selectedQuestion !== undefined ? this.state.selectedQuestion.options : undefined} ></MatchingOptions>
                )
            default:
                break;
        }
    }
    render() {
        //console.log("eddd:",this.state.fetchedQuestions)
        const QuestionForm = this.props.useForm;
        const { editing, edited } = this.props;
        //console.log("editing", editing);
        //console.log("edited", edited);
        return (
            <div>
                <ReactDragListView
                    nodeSelector=".ant-list-item.draggble"
                    onDragEnd={this.onDragEnd}
                >

                    {this.state.loadingQuestions ? <div style={{ width: "100%", height: "100%",marginTop:"30px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <PuffLoader css={"display: block; margin: 0 0 0 0;"} size={80} />
                    </div> : <List
                        dataSource={this.state.fetchedQuestions}
                        renderItem={
                            item => {
                                return (
                                    <List.Item

                                        actions={[<Popconfirm
                                            title="Are you sure to delete this Question?"
                                            onConfirm={() => this.deleteConfirm(item)}
                                            onCancel={() => this.deleteCancel}
                                            okText="Yes"
                                            cancelText="No"
                                            disabled={!editing && edited}
                                        >
                                            <ActionItem disabled={!editing && edited} color="red">Delete</ActionItem>
                                        </Popconfirm>,
                                        <ActionItem disabled={!editing && edited} onClick={!(!editing && edited) ? () => this.showModal(item) : ""} color="#5BCAD6">Edit</ActionItem>,
                                        <FiMenu style={{ marginBottom: "3px", height: "20px", width: "20px", cursor: !(!editing && edited)?'grab':"not-allowed", color: '#999' }} />,]}
                                        className={!(!editing && edited) ? "draggble" : ""}
                                        key={item.key}
                                    >
                                        <List.Item.Meta
                                            title={
                                                <div style={{ display: "flex", gap: "1vw", alignItems: "baseline" }}>
                                                    <Text
                                                        ellipsis={true}
                                                        style={{ fontSize: "16px" }}>
                                                        <Tooltip title="prompt text">
                                                            {`Question#${item.number}`}
                                                        </Tooltip>
                                                    </Text>
                                                    <div style={{ fontSize: "13px", color: "#6C6C6C" }}>
                                                        {`${item.qesType} `}
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
                                                    {item.qesText}
                                                </Text>}
                                        />
                                        <Modal
                                            title="Add New"
                                            visible={this.state.showModal && item.key === this.state.selectedQuestion.key}
                                            onOk={this.handleAddOk}
                                            onCancel={this.handleAddCancel}
                                            okButtonProps={{ disabled: !this.state.validQuestion }}
                                            cancelButtonProps={{ disabled: false }}
                                            width={"50vw"}
                                        >
                                            <div style={{ display: "flex", flexDirection: "column", flexWrap: "wrap" }}>
                                                <Form form={QuestionForm} layout="vertical" name="nest-messages" onFinish={() => this.onQuestionEditFinish(this.state.selectedQuestion.key)}>
                                                    <Form.Item name={'questionText'} label="Question Text">
                                                        <Input.TextArea />
                                                    </Form.Item>
                                                    <Form.Item name={'questionType'} label="Question Type">
                                                        <Select disabled onChange={(e) => this.setState({ questionType: e })} defaultValue={this.state.questionType}>
                                                            <Option value="multipleChoice">Multiple Choice</Option>
                                                            <Option value="ordering">Ordering</Option>
                                                            <Option value="matching">Matching</Option>
                                                        </Select>
                                                    </Form.Item>
                                                    <Form.Item name={'answerExplination'} label="Answer Explination">
                                                        <Input.TextArea />
                                                    </Form.Item>
                                                </Form>

                                                {this.renderOptions(this.state.questionType)}

                                            </div>
                                        </Modal>
                                    </List.Item>
                                )
                            }}
                    />}

                </ReactDragListView>
            </div>

        )
    }
}

const ActionItem = styled.div`
cursor: ${props => props.disabled ? "not-allowed" : "pointer"};
font-weight: 600;
animation: ${props => props.disabled ? "fadeIn 1s " : ""} ;
animation-fill-mode: forwards;
&:hover{
    color: ${props => !props.disabled ? props.color : ""}
}
@keyframes fadeIn {
  0% {opacity:1;}
  100% {opacity:0.6;}
}
`
export default connect(mapStateToProps)(FetchedQuestions);