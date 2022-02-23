import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate, useLocation } from "react-router-dom"
import { Loading3QuartersOutlined, MinusCircleOutlined, CheckCircleOutlined, CloseCircleOutlined, SyncOutlined } from '@ant-design/icons';
import { Table, Progress, Button, Modal, Spin, Tag } from 'antd';
import "./PracticeTests.css";
import styled from "styled-components";

function PracticeTests() {
    const practiceTests = useSelector(state => state.userPracticeTests.practiceTests)
    const practiceTestsExams = useSelector(state => state.userPracticeTests.examsForExpandedTests)
    const examsActivities = useSelector(state => state.userPracticeTests.examsActivities)
    const { state } = useLocation();
    const navigate = useNavigate()
    const [loadingExamData, setLoadingExamData] = useState(false)
    const [expanded, setExpanded] = useState([])
    // useEffect(() => {
    //     if(state !==null){
    //         //console.log("hi:",state.finishedExamID)
    //         const temp= practiceTests.filter(x=>x.testExamsIDs.findIndex(e=>e===state.finishedExamID)!==-1)[0]
    //         if(temp!== undefined) setFinishedExamPracticeTestID(temp.key)
    //         console.log("hi1:",finishedExamPracticeTestID)
    //     }
    // }, [state, practiceTests])
    useEffect(() => {
        sessionStorage.clear()
    }, [])
    useEffect(() => {
        setExpanded(practiceTests.map(x => {
            var id = -1;
            if (state != null &&x.key===state.finishedExamTestID&& x.testExamsIDs.findIndex(q => q === state.finishedExamID) !== -1) id = x.key
            return (id)
        }).filter(w => w !== -1))
    }, [practiceTests])
    //console.log(practiceTests.map(x=>x.key))
    const handleExamStarting = (examId) => {
        //setLoadingExamData(true)
        setTimeout(() => {
            navigate(`/examenv/${examId}`, {
                state: {
                    envType: "examination",
                    testID: expanded[0],
                }
            })
        }, 200);
    }
    const handleExamReview = (examId) => {
        //setLoadingExamData(true)
        setTimeout(() => {
            navigate(`/examenv/${examId}`, {
                state: {
                    envType: "review",
                    testID: expanded[0]
                }
            })
        }, 200);
    }
    const examColumns = [
        {
            dataIndex: 'examName',
            width: "40%",
            render: text => <div style={{ fontWeight: "600", color: "#6C6C6C" }}>
                {text}
            </div>
        },
        {
            dataIndex: 'key',
            width: "15%",
            align: "center",
            render: (key, record) => {
                //console.log("examr", record )
                const activities = examsActivities.filter(x => x.examID === key)
                const ind = activities.findIndex(x => x.testID === expanded[0])
                //console.log()
                var rateVal = -1;
                var count = 0;
                if (ind === -1) {
                    return (
                        <Tag className="tagNotStarted" icon={<MinusCircleOutlined style={{ color: "#faad14" }} className="icon" />} color="warning">
                            NOT STARTED
                        </Tag>
                    )
                }
                else {
                    examsActivities[ind].finishedQuestionsIDsWithAnswers.forEach(
                        q => {
                            if (q.answer.isAnswer) {
                                count = count + 1;
                            }
                        })
                    rateVal = (count / record.examQuestionsIDs.length) * 100
                    //console.log(count)
                    if (rateVal >= record.examPasinRate) {
                        return (
                            <Tag className="tagPassed" icon={<CheckCircleOutlined style={{ color: "#52c41a" }} className="icon" />} color="success">
                                PASSED
                            </Tag>
                        )
                    }
                    else {
                        return (
                            <Tag className="tagNotPassed" icon={<CloseCircleOutlined style={{ color: "#ff4d4f" }} className="icon" />} color="error">
                                NOT PASSED
                            </Tag>
                        )
                    }
                }
            },
        },
        {
            dataIndex: 'examQuestionsIDs',
            width: "15%",
            align: "center",
            render: ids => <div>{`${ids.length} Questions`}</div>
        },
        {
            dataIndex: 'examPeriod',
            width: "15%",
            align: "center",
            render: text => <div>{`${text} Minutes`}</div>
        },
        {
            dataIndex: 'key',
            key: 'x',
            width: "15%",
            align: "center",
            render:
                (key) => {
                    const activities = examsActivities.filter(x => x.examID === key)
                    const ind = activities.findIndex(x => x.testID === expanded[0])
                    if (ind === -1) {
                        return (<Button onClick={() => handleExamStarting(key)} style={{ marginLeft: "1vw", fontWeight: "600" }} type="text" >Start</Button>)
                    }
                    else {
                        return (
                            <Button className="btnreview" onClick={() => handleExamReview(key)} style={{ marginLeft: "1vw", fontWeight: "600" }} type="text" >Review</Button>
                        )

                    }
                },
        }
    ];

    const columns = [
        {
            dataIndex: 'testTitle',
            width: "40%",
            render: text => <div style={{ fontWeight: "600", fontSize: "17px", color: "#3c3c3c" }}>{text}</div>

        },
        {
            dataIndex: 'key',
            width: "15%",
            align: "center",
            render: (key, record) => {
                var num = record.testExamsIDs.map(function (item) {
                    var arr = 0;
                    const activities = examsActivities.filter(x => x.examID === item)
                    const ind = activities.findIndex(x => x.testID === key)
                    if (ind !== -1) arr = arr + 1
                    return arr;
                }).filter(q => q !== 0).length
                //console.log(num === record.testExamsIDs.length)
                if (num === record.testExamsIDs.length) {
                    return (
                        <Tag className="tagPassed" icon={<CheckCircleOutlined style={{ color: "#52c41a" }} className="icon" />} color="success">
                            FINISHED
                        </Tag>
                    )

                }
                else {
                    return (
                        <Tag className="tagProcessing" icon={<SyncOutlined style={{ color: "#096dd9" }} className="icon" />} color="processing">
                            IN PROGRESS
                        </Tag>
                    )
                }
            }

        },
        {
            dataIndex: 'testExamsIDs',
            width: "15%",
            align: "center",
            render: ids => <div>{`${ids !== undefined ? ids.length : 0} Exams`}</div>
        },
        {

            dataIndex: 'key',
            width: "15%",
            align: "center",
            render: key => <div>{`${practiceTestsExams.filter(e => e.testID === key)[0].totalExamsPeriod} Minutes`}</div>
        },
        {
            dataIndex: 'lastInteract',
            width: "15%",
            align: "center",
            render: ids => <div></div>
        },
    ];

    //const [dataSource, setDataSource]= useState([]);
    //console.log("allexamsact", examsActivities)
    const dispatch = useDispatch();
    //console.log(examsActivities)
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "4vh", margin: "2vh 4vw 2vh 4vw" }}>
            <Modal width={300} bodyStyle={{ height: "30vh", display: "flex", gap: "4vh", flexDirection: "column", alignItems: "center", justifyContent: "center" }} footer={null} closable={false} visible={loadingExamData}>
                <Spin indicator={
                    <Loading3QuartersOutlined style={{ fontSize: 100 }} spin />
                } />
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ fontSize: "20px" }}>Loading Exam Data...</div>
                </div>
            </Modal>
            <Title>
                My Practice Tests
            </Title>
            <TestsContainer>
                <Table
                    className="my-table1"
                    showHeader={false}
                    columns={columns}
                    pagination={{ position: ["none"] }}
                    dataSource={practiceTests}
                    expandable={{
                        //defaultExpandedRowKeys: [finishedExamPracticeTestID] ,
                        expandedRowKeys: expanded,
                        expandRowByClick: true,
                        onExpand: (expanded1, record) => {
                            expanded.findIndex(x => x === record.key) === -1 ?
                                setExpanded([record.key]) :
                                setExpanded([])
                        },
                        expandedRowRender: record => {
                            return (
                                <Table
                                    rowClassName={(record, index) => (state !== null && record.key === state.finishedExamID) ? 'table-row' : ''}
                                    className="my-table"
                                    showHeader={false}
                                    columns={examColumns}
                                    dataSource={practiceTestsExams.filter(e => e.testID === record.key)[0].exams}
                                    pagination={{ position: ["none"] }}
                                    title={() =>
                                        <Progress
                                            strokeColor={
                                                {
                                                    '0%': '#E7E7E7',
                                                    '100%': '#5BCAD6',
                                                }
                                            }
                                            className="bar" percent={record.testExamsIDs.map(function (item) {
                                                var arr = 0;
                                                if (examsActivities.findIndex(a => a.examID === item) !== -1) arr = arr + 1
                                                return arr;
                                            }).filter(q => q !== 0).length
                                                / record.testExamsIDs.length * 100}
                                            status="active" showInfo={false} />}
                                />)
                        }

                    }}

                />
            </TestsContainer>
        </div>
    );
}

const Title = styled.div`
font-size:30px;
font-weight: 700;
color:#303030
`
const TestsContainer = styled.div`
`

export default PracticeTests;