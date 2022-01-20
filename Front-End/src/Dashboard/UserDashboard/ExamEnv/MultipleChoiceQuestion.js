
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import "./MultipleChoiceQuestion.css"
import Typography from '@mui/material/Typography';

export default function MultipleChoiceQuestion(props) {
    const question = props.question;
    //const arrLength= useSelector(state => state.examActivity.finishedQuestionsIDsWithAnswers.length)
    const answers = useSelector(state => state.examActivity.finishedQuestionsIDsWithAnswers)
    //console.log("answ", answerSelected) 
    //console.log(question)
    const [selectedIndex, setSelectedIndex] = React.useState(-1);
    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
        props.setAnswer(props.question.key, props.question.options.filter(x => x.key === index)[0])
    };
    // useEffect(() => {
    //     if(props.currentQuestionNo<= arrLength &&answerSelected[0].answer !== undefined ){
    //         console.log("answ", answerSelected[0].answer.key)
    //         setSelectedIndex(answerSelected[0].answer.key);
    //         props.setAnswer(props.question.key, props.question.options.filter(x=>x.key===answerSelected[0].answer.key))
    //     }
    // }, [answerSelected])
    //console.log(arrLength)
    //console.log(props.currentQuestionNo)
    useEffect(() => {
        //console.log("cjhanged")
        if (answers.length > props.currentQuestionNo - 1) {
            //console.log(answers[props.currentQuestionNo - 1].answer.key)
            setSelectedIndex(answers[props.currentQuestionNo - 1].answer.key)
        }
        else {
            setSelectedIndex(-1)
        }
    }, [props.currentQuestionNo])
    //console.log(props.state)

    if (props.state === "review") {
        return (
            <MainContainer>
                <QuestionText>
                    {
                        `${question.qesText} `

                    }
                </QuestionText>
                <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                    <List className='list1' component="nav" aria-label="secondary mailbox folder">
                        {answers.length < props.currentQuestionNo && <Typography style={{color:"#cf1322"}} sx={{ mt: 1, mb: 1 }} variant="h7" component="div">
                            You did not answer this Question
                        </Typography>}
                        {
                            question.options.map(option => (
                                <ListItemButton
                                divider
                                sx={{backgroundColor:"white"}}
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
                        }
                    </List>
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
                <Box sx={{ width: '100%' }}>
                    <List component="nav" aria-label="secondary mailbox folder">
                        {
                            question.options.map(option => (
                                <ListItemButton
                                divider
                                sx={{backgroundColor:"white"}}
                                    key={option.key}
                                    selected={selectedIndex === option.key}
                                    onClick={(event) => handleListItemClick(event, option.key)}
                                >
                                    <ListItemText primary={option.text} />
                                </ListItemButton>
                            ))
                        }
                    </List>
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
gap: 3vh;
`
const QuestionText = styled.div`
font-size: clamp(13px,1.3vw,23px);
text-align: left;
width: 100%
`
