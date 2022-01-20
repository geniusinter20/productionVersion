
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import "./MultipleChoiceQuestion.css"
import Typography from '@mui/material/Typography';
import {
    SortableContainer,
    SortableElement,
    SortableHandle
} from "react-sortable-hoc";
import { arrayMoveImmutable } from "array-move";
import { MenuOutlined } from '@ant-design/icons';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItem from '@mui/material/ListItem';
import { Row, Col } from 'antd';


const DragHandle = SortableHandle(() => <MenuOutlined style={{ cursor: 'grab', color: '#999' }} />);

const SortableItem = SortableElement(({ text }) => (
    <ListItem divider sx={{backgroundColor:"white"}} ContainerComponent="div">
        <ListItemText primary={text} />
        <ListItemSecondaryAction>
            <DragHandle />
        </ListItemSecondaryAction>
    </ListItem>
));
const SortableListContainer = SortableContainer(({ items }) => (
    <List component="div">
        {items.map(({ key, text }, index) => (
            <SortableItem index={index} text={text} />
        ))}
    </List>
));



export default function MultipleChoiceQuestion(props) {
    const question = props.question;
    const answers = useSelector(state => state.examActivity.finishedQuestionsIDsWithAnswers)
    const [selectedIndex, setSelectedIndex] = React.useState(-1);
    const [options, setOptions] = React.useState([]);
    useEffect(() => {
        //console.log(answers[props.currentQuestionNo - 1])
        //console.log(answers.length)
        //console.log(answers.length > props.currentQuestionNo - 1)
        if (answers.length > props.currentQuestionNo - 1) {
            //console.log(answers[props.currentQuestionNo - 1].answer.optionsReordered)
            setOptions(answers[props.currentQuestionNo - 1].answer.optionsReordered)
        }
        else {
            //console.log("gdfgdgd")
            const options1 = [...question.options]
            while (JSON.stringify(options1) === JSON.stringify(question.options)) {
                options1.sort((a, b) => 0.5 - Math.random())
            }

            if (question.options) setOptions(options1)
        }
    }, [props.currentQuestionNo, question])
    const onSortEnd = ({ oldIndex, newIndex }) => {
        const newData = arrayMoveImmutable(options, oldIndex, newIndex)
        setOptions(newData);
        props.setAnswer(props.question.key, { optionsReordered: newData, isAnswer: JSON.stringify(newData) === JSON.stringify(question.options) })

    };
    //console.log(options)
    //console.log(props.question.options)
    if (props.state === "review") {
        if (answers.length < props.currentQuestionNo)
            return (
                <Box sx={{ width: '100%', display: "flex", flexDirection: "column", gap: "10px", marginTop: "5px" }}>
                    <QuestionText>
                        {
                            `${question.qesText} `

                        }
                    </QuestionText>
                    <Typography style={{ color: "#cf1322" }} sx={{ mt: 1, mb: 1 }} variant="h7" component="div">
                        You did not answer this Question
                    </Typography>
                    <div style={{ fontSize: "20px", fontWeight: "500", color: "#389e0d" }}>Correct Order:</div>
                    <List component="nav" aria-label="secondary mailbox folder">
                        {
                            question.options && question.options.map(option => (
                                <ListItem sx={{backgroundColor:"white"}} divider>
                                    <ListItemText primary={option.text} />
                                </ListItem>
                            ))
                        }
                    </List>
                </Box>
            )
        else return (
            <MainContainer>
                <QuestionText>
                    {
                        `${question.qesText} `

                    }
                </QuestionText>

                <Row gutter={[0, 25]} style={{ width: '100%' }}>

                    {answers.length < props.currentQuestionNo && <Typography style={{ color: "#cf1322", paddingLeft: "15px" }} sx={{ mt: 1, mb: 1 }} variant="h7" component="div">
                        You did not answer this Question
                    </Typography>}
                    {!answers[props.currentQuestionNo - 1].answer.isAnswer && <Col xs={{ span: 20, offset: 0 }} lg={{ span: 22, offset: 0 }}>
                        <div style={{ fontSize: "20px", fontWeight: "500", color: "#CF1322" }}>Your Order:</div>
                        <List component="nav" aria-label="secondary mailbox folder">
                            {
                                options && options.map(option => (
                                    <ListItem sx={{backgroundColor:"white"}} divider>
                                        <ListItemText primary={option.text} />
                                    </ListItem>
                                ))
                            }
                        </List>
                    </Col>}
                    <Col xs={{ span: 20, offset: 0 }} lg={{ span: 22, offset: 0 }}>
                        {answers[props.currentQuestionNo - 1].answer.isAnswer ? <div style={{ fontSize: "20px", fontWeight: "500", color: "#389e0d" }}>Answered Correctly, Your Order:</div>
                            : <div style={{ fontSize: "20px", fontWeight: "500", color: "#389e0d" }}>Correct Order:</div>}
                        <List component="nav" aria-label="secondary mailbox folder">
                            {
                                question.options && question.options.map(option => (
                                    <ListItem sx={{backgroundColor:"white"}} divider>
                                        <ListItemText primary={option.text} />
                                    </ListItem>
                                ))
                            }
                        </List>
                    </Col>


                    {/* {
                            question.options.map(option => (
                                <ListItemButton
                                    key={option.key}
                                    selected={selectedIndex === option.key}
                                    className={answers.length >= props.currentQuestionNo ? (answers[props.currentQuestionNo - 1].answer.key === option.key && answers[props.currentQuestionNo - 1].answer.isAnswer) ? "correctAnswer" :
                                        option.isAnswer ? "correctAnswer" : "" : ""}
                                >
                                    {
                                        answers.length >= props.currentQuestionNo ? answers[props.currentQuestionNo - 1].answer.isAnswer ?
                                            <ListItemText primary={option.text}
                                                secondary={answers[props.currentQuestionNo - 1].answer.key === option.key && <div style={{ fontWeight: "600", color: "#389e0d" }}>Answered Correctly</div>} />
                                            :
                                            <ListItemText primary={option.text}
                                                secondary={
                                                    answers[props.currentQuestionNo - 1].answer.key === option.key ? <div style={{ fontWeight: "600", color: "#cf1322" }}>Your Answer</div>
                                                        : option.isAnswer ? <div style={{ fontWeight: "600", color: "#389e0d" }}>Correct Answer</div> : <div></div>
                                                }
                                            /> :
                                            <ListItemText primary={option.text}
                                                secondary={
                                                    option.isAnswer ? <div style={{ fontWeight: "600", color: "#389e0d" }}>Correct Answer</div> : <div></div>
                                                }
                                            />
                                    }
                                </ListItemButton>
                            ))
                        } */}
                </Row>
            </MainContainer>
        );
    }
    else
        return (
            <MainContainer>
                <QuestionText>
                    {question.qesText}
                </QuestionText>
                <QuestionText1>
                    Order the options below starting from top to bottom by dragging the option with the DragHandle on the option's right side
                </QuestionText1>
                <Box sx={{ width: '100%' }}>
                    {/* <List component="nav" aria-label="secondary mailbox folder">
                        {
                            question.options.map(option => (
                                <ListItemButton
                                    key={option.key}
                                    selected={selectedIndex === option.key}
                                    onClick={(event) => handleListItemClick(event, option.key)}
                                >
                                    <ListItemText primary={option.text} />
                                </ListItemButton>
                            ))
                        }
                    </List> */}
                    <SortableListContainer
                        items={options}
                        onSortEnd={onSortEnd}
                        useDragHandle={true}
                        lockAxis="y"
                    />
                </Box>
            </MainContainer>
        );
}
const MainContainer = styled.div`
width:100%;
display: flex;
justify-content: flex-start;
align-items: center;
flex-direction: column;
gap: 2vh;;
margin-bottom: 15px;
`
const QuestionText = styled.div`
font-size: clamp(13px,1.3vw,23px);
text-align: left;
width: 100%;
margin: 0 0 15px 0;
`
const QuestionText1 = styled.div`
font-size: 13px;
color: #6c6c6c;
text-align: left;
width: 100%
`
