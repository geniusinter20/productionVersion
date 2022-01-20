import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import "./MultipleChoiceQuestion.css";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Button, Typography, Col, Row } from "antd";
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';

const { Paragraph } = Typography;

export default function MultipleChoiceQuestion(props) {
    const question = props.question;
    const answers = useSelector(state => state.examActivity.finishedQuestionsIDsWithAnswers)
    const [columns, setColumns] = useState({});
    const equalsIgnoreOrder = (a, b) => {
        if (a.length !== b.length) return false;
        const uniqueValues = new Set([...a, ...b]);
        for (const v of uniqueValues) {
            const aCount = a.filter(e => e.id === v.id).length;
            const bCount = b.filter(e => e.id === v.id).length;
            if (aCount !== bCount) return false;
        }
        return true;
    }

    const validateAnswer = (studentAnswer, correctAnswer) => {
        var valid = true;
        Object.entries(correctAnswer).map(([columnId, column], index) => {
            valid = equalsIgnoreOrder(column.items, studentAnswer[columnId].items)
        })
        return valid;

    }

    const onDragEnd = (result, columns, setColumns) => {
        if (!result.destination) return;
        const { source, destination } = result;

        if (source.droppableId !== destination.droppableId) {
            const sourceColumn = columns[source.droppableId];
            const destColumn = columns[destination.droppableId];
            const sourceItems = [...sourceColumn.items];
            const destItems = [...destColumn.items];
            const [removed] = sourceItems.splice(source.index, 1);
            destItems.splice(destination.index, 0, removed);
            let newColumns = {
                ...columns,
                [source.droppableId]: {
                    ...sourceColumn,
                    items: sourceItems
                },
                [destination.droppableId]: {
                    ...destColumn,
                    items: destItems
                }
            }
            if (newColumns.root.items.length === 0) {
                //console.log(question.options[0])
                props.setAnswer(props.question.key, { ansColumns: newColumns, isAnswer: validateAnswer(newColumns, question.options[0]) })
            }
            else props.setAnswerToNull()

            setColumns(newColumns);
        } else {
            const column = columns[source.droppableId];
            const copiedItems = [...column.items];
            const [removed] = copiedItems.splice(source.index, 1);
            copiedItems.splice(destination.index, 0, removed);
            let newColumns = {
                ...columns,
                [source.droppableId]: {
                    ...column,
                    items: copiedItems
                }
            }
            //console.log(question.options[0])
            if (newColumns.root.items.length === 0)
                props.setAnswer(props.question.key, { ansColumns: newColumns, isAnswer: validateAnswer(newColumns, question.options[0]) })
            else props.setAnswerToNull()
            setColumns(newColumns);
        }
    };

    useEffect(() => {
        var newRootItems = []
        const oldColumns = JSON.parse(JSON.stringify(question.options[0]));
        if (answers.length > props.currentQuestionNo - 1) {
            setColumns(answers[props.currentQuestionNo - 1].answer.ansColumns)
        }
        else {
            if (props.state !== "review") {
                Object.keys(oldColumns).forEach(k => {
                    newRootItems = [...newRootItems, ...oldColumns[k].items]
                    oldColumns[k].items = []
                })
                oldColumns.root.items = [...newRootItems]
                setColumns(oldColumns)
            }
        }
    }, [props.currentQuestionNo])

    if (props.state === "review") {
        if (answers.length < props.currentQuestionNo)
            return (
                <Box sx={{ width: '100%', bgcolor: 'background.paper', display: "flex", flexDirection: "column", gap: "10px", marginTop: "5px" }}>
                    <QuestionText>
                        {
                            `${question.qesText} `

                        }
                    </QuestionText>
                    <Typography style={{ color: "#cf1322" }} sx={{ mt: 1, mb: 1 }} variant="h7" component="div">
                        You did not answer this Question
                    </Typography>
                    <div style={{ fontSize: "20px", fontWeight: "500", color: "#389e0d" }}>Correct Match:</div>
                    <Row gutter={[0, 20]} style={{ width: "100%", justifyContent: "space-between" }}>
                        {Object.entries(question.options[0]).map(([columnId, column], index) => {
                            if (columnId === "root") return null
                            return (
                                <Col xs={{ span: 24, offset: 0 }} lg={{ span: 11, offset: 0 }}
                                    key={columnId}
                                ><div style={{ fontSize: "16px", fontWeight: "600" }}>{column.name}</div>
                                    <List component="nav" aria-label="secondary mailbox folder">
                                        {
                                            column.items.map((item, index) => (
                                                <ListItem sx={{backgroundColor:"#F8F8F8"}} divider>
                                                    <ListItemText primary={item.content} />
                                                </ListItem>
                                            ))
                                        }
                                    </List>
                                </Col>
                            );
                        })}
                    </Row>
                </Box>
            )
        else return (
            <MainContainer>
                <QuestionText>
                    {
                        `${question.qesText} `

                    }
                </QuestionText>
                <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                    {answers.length < props.currentQuestionNo && <Typography style={{ color: "#cf1322", paddingLeft: "15px" }} sx={{ mt: 1, mb: 1 }} variant="h7" component="div">
                        You did not answer this Question
                    </Typography>}
                    <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                        {(!answers[props.currentQuestionNo - 1].answer.isAnswer && columns) && <div style={{ fontSize: "20px", fontWeight: "500", color: "#CF1322" }}>Wrong Answer, Your Match:</div>}
                        {(!answers[props.currentQuestionNo - 1].answer.isAnswer && columns) && <Row gutter={[0, 20]} style={{ width: "100%", justifyContent: "space-between" }}>
                            {Object.entries(columns).map(([columnId, column], index) => {
                                if (columnId === "root") return null
                                return (
                                    <Col xs={{ span: 24, offset: 0 }} lg={{ span: 11, offset: 0 }}
                                        key={columnId}
                                    ><div style={{ fontSize: "16px", fontWeight: "600" }}>{column.name}</div>
                                        <List component="nav" aria-label="secondary mailbox folder">
                                            {
                                                column.items.map((item, index) => (
                                                    <ListItem divider>
                                                        <ListItemText sx={{backgroundColor:"#F8F8F8"}} primary={item.content} />
                                                    </ListItem>
                                                ))
                                            }
                                        </List>
                                    </Col>
                                );
                            })}
                        </Row>}
                        {answers[props.currentQuestionNo - 1].answer.isAnswer ? <div style={{ fontSize: "20px", fontWeight: "500", color: "#389e0d" }}>Answered Correctly, Your Match:</div>
                            : <div style={{ fontSize: "20px", fontWeight: "500", color: "#389e0d" }}>Correct Match:</div>}
                        <Row gutter={[0, 20]} style={{ width: "100%", justifyContent: "space-between" }}>
                            {Object.entries(question.options[0]).map(([columnId, column], index) => {
                                if (columnId === "root") return null
                                return (
                                    <Col xs={{ span: 24, offset: 0 }} lg={{ span: 11, offset: 0 }}
                                        key={columnId}
                                    ><div style={{ fontSize: "16px", fontWeight: "600" }}>{column.name}</div>
                                        <List component="nav" aria-label="secondary mailbox folder">
                                            {
                                                column.items.map((item, index) => (
                                                    <ListItem sx={{backgroundColor:"#F8F8F8"}} divider>
                                                        <ListItemText primary={item.content} />
                                                    </ListItem>
                                                ))
                                            }
                                        </List>
                                    </Col>
                                );
                            })}
                        </Row>
                    </div>
                </Box>
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
                    {`Match every option in the ${columns.root ? columns.root.name : ""} list with the correct list it belongs to, by dragging it to this list`}
                </QuestionText1>
                <Row gutter={[0, 20]} style={{ width: "100%", justifyContent: "space-between" }}>
                    <DragDropContext
                        onDragEnd={result => onDragEnd(result, columns, setColumns)}
                    >
                        {Object.entries(columns).map(([columnId, column], index) => {
                            return (
                                <Col xs={{ span: 24, offset: 0 }} lg={{ span: 11, offset: 0 }}
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "20px",
                                        width: "100%",
                                    }}
                                    key={columnId}
                                >
                                    <div style={{ fontSize: "16px", fontWeight: "600" }}>{column.name}</div>
                                    <div >
                                        <Droppable droppableId={columnId} key={columnId}>
                                            {(provided, snapshot) => {
                                                return (
                                                    <div
                                                        {...provided.droppableProps}
                                                        ref={provided.innerRef}
                                                        style={{
                                                            background: "#E8E8E8",
                                                            padding: 5,
                                                            width: "100%",
                                                            minHeight: 200,
                                                            display: "flex",
                                                            flexDirection: "column",
                                                            alignItems: "center",
                                                            gap: "5px"
                                                        }}
                                                    >
                                                        {column.items.map((item, index) => {
                                                            return (
                                                                <Draggable
                                                                    key={item.id}
                                                                    draggableId={item.id}
                                                                    index={index}
                                                                >
                                                                    {(provided, snapshot) => {
                                                                        return (
                                                                            <div
                                                                                ref={provided.innerRef}
                                                                                {...provided.draggableProps}
                                                                                {...provided.dragHandleProps}
                                                                                style={{
                                                                                    // border: "solid 0.5px #AEAEAE",
                                                                                    display: "flex",
                                                                                    alignItems: "center",
                                                                                    justifyContent: "space-between",
                                                                                    userSelect: "none",
                                                                                    padding: "10px",
                                                                                    minHeight: "50px",
                                                                                    backgroundColor: "white",
                                                                                    color: "white",
                                                                                    width: "100%",
                                                                                    ...provided.draggableProps.style
                                                                                }}
                                                                            >

                                                                                <CusParagraph>{item.content}</CusParagraph>
                                                                            </div>
                                                                        );
                                                                    }}
                                                                </Draggable>
                                                            );
                                                        })}
                                                        {provided.placeholder}
                                                    </div>
                                                );
                                            }}
                                        </Droppable>
                                    </div>
                                </Col>
                            );
                        })}
                    </DragDropContext>
                </Row>
            </MainContainer>
        );
}
const MainContainer = styled.div`
width:100%;
display: flex;
justify-content: flex-start;
align-items: center;
flex-direction: column;
gap: 2vh;
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
const CusParagraph = styled(Paragraph)`
margin-top: 10px;
font-size: 15px;
line-height: 16px;
width: 90%;
max-width: 40vw;
&>*{
    margin-left: 10px;
}
&>*>*{
    height: 90%;
    width: 18px;
    color: #3c3c3c;
}
`
