import { VictoryChart, VictoryArea } from 'victory';
import React, { Component } from 'react';
import "./SalesOverview.css";
import styled from 'styled-components';
import {FaMoneyCheckAlt} from "react-icons/fa";
import {MdBookmarkAdded} from "react-icons/md";
import {RiMapPinUserFill, RiShieldUserFill} from "react-icons/ri";
import {FaCircleNotch} from "react-icons/fa";
import { VictoryPie } from 'victory';
import { Timeline, Statistic } from 'antd';
import { ClockCircleOutlined, ArrowUpOutlined, ArrowRightOutlined } from '@ant-design/icons';
import CountUp from './CountUp';
import { CSSTransition, TransitionGroup } from "react-transition-group";

class SalesOverview extends Component {
    render() {
        return (
            
            <div className="content">
                <h1 style={{color:"#6C6C6C",fontSize:"1.8rem",fontWeight:"500", margin:"2vh 3vw 2vh 3vw"
                            }}>This Month's Statistics
                            </h1>
                                <StaticsMainContainer>
                                <CSSTransition
                                                key={1}
                                                in={true}
                                                appear={true}
                                                timeout={3000}
                                                classNames="item"
                                            >
                                    <MonthStatistics>
                                        
                                           
                                                <SingleStatistic>
                                                    <Info>
                                                        <h1>
                                                            Sales
                                                        </h1>
                                                        <h2>
                                                            <CountUp end={3200} prefix={"$"} decimals={0}></CountUp>
                                                        </h2>
                                                        <h3>
                                                            +5.4%
                                                        </h3>
                                                    </Info>
                                                    <Vector>
                                                        <FaMoneyCheckAlt />
                                                    </Vector>
                                                </SingleStatistic>
                                                

                                        <SingleStatistic>
                                            <Info>
                                                <h1>
                                                    New Users
                                                </h1>
                                                <h2>
                                                <CountUp end={3200} prefix={"$"} decimals={0}></CountUp>
                                                </h2>
                                                <h3>
                                                    +5.4%
                                                </h3>
                                            </Info>
                                            <Vector>
                                                <RiShieldUserFill />
                                            </Vector>
                                        </SingleStatistic>
                                        <SingleStatistic>
                                            <Info>
                                                <h1>
                                                    Active Users
                                                </h1>
                                                <h2>
                                                <CountUp end={3200} prefix={"$"} decimals={0}></CountUp>
                                                </h2>
                                                <h3>
                                                    +5.4%
                                                </h3>
                                            </Info>
                                            <Vector>
                                            < RiMapPinUserFill/>
                                            </Vector>
                                        </SingleStatistic>
                                        <SingleStatistic>
                                            <Info>
                                                <h1>
                                                    Exams Completed By Users
                                                </h1>
                                                <h2>
                                                <CountUp end={3200} prefix={"$"} decimals={0}></CountUp>
                                                </h2>
                                                <h3>
                                                    +5.4%
                                                </h3>
                                            </Info>
                                            <Vector>
                                                <MdBookmarkAdded />
                                            </Vector>
                                        </SingleStatistic>
                                        
                                    </MonthStatistics>
                                    </CSSTransition>
                                    <Brief>
                                    <div>
                                        <div style={{fontSize:"30px", fontWeight:"500"}}>Perpetual</div>
                                        <Perpetual>
                                            <div style={{position:"relative",width:"24vw", minWidth:"350px"}}>
                                                <div style={{position:"absolute",width:"100%",height:"100%",display:"flex",alignItems:"center", justifyContent:"center",flexDirection:"column", gap:"0"}}>
                                                    <div style={{fontSize:"1.6rem", fontWeight:"600"}}>
                                                    <CountUp end={4001200} prefix={""} decimals={0}></CountUp> 
                                                    </div>
                                                    <div style={{fontSize:"17px", color:"#979797", fontWeight:"400"}}>
                                                        Total Visits
                                                    </div>
                                                  
                                                </div>
                                            <VictoryPie
                                                animate={{
                                                    duration: 3000,
                                                    onLoad: {
                                                        duration: 3000,
                                                        before: () => ({_y: 400, label: " "}),
                                                        after: (datum) => ({_y: datum._y})
                                                    }
                                                }}
                                                colorScale={[
                                                    "#3CA9E7",
                                                    "#6C6C6C",
                                                    "#969696"
                                                    ]
                                                }
                                                height={400} width={500}
                                                padAngle={({ datum }) => datum.y}
                                                cornerRadius={20}
                                                innerRadius={115}
                                                data={[
                                                    { x: 1, y: 12, label: " " },
                                                    { x: 2, y: 3, label: " " },
                                                    { x: 3, y: 2, label: " " }
                                                  ]}
                                            >

                                            </VictoryPie>
                                            </div>
                                            <Labels>
                                                <Label>
                                                    <Vh color="#3CA9E7"></Vh>
                                                    <div>
                                                        <h1>
                                                        Visitors
                                                        </h1>
                                                        <h2>
                                                        3,124,213 users
                                                        </h2>
                                                    </div>
                                                </Label>
                                                <Label>
                                                    <Vh color="#969696"></Vh>
                                                    <div>
                                                        <h1>
                                                        Registered Users
                                                        </h1>
                                                        <h2>
                                                        3,124,213 users
                                                        </h2>
                                                    </div>
                                                </Label>
                                                <Label>
                                                    <Vh color="#6C6C6C"></Vh>
                                                    <div>
                                                        <h1>
                                                        Students
                                                        </h1>
                                                        <h2>
                                                        3,124,213 users
                                                        </h2>
                                                    </div>
                                                </Label>
                                            </Labels>
                                        </Perpetual>
                                        </div>
                                    <div>
                                        <div style={{fontSize:"30px", fontWeight:"500"}}>Active Percentage</div>
                                        <Perpetual>
                                            <div style={{position:"relative",width:"24vw", minWidth:"350px"}}>
                                            <div style={{position:"absolute",width:"100%",height:"100%",display:"flex",alignItems:"center", justifyContent:"center",flexDirection:"column", gap:"0"}}>
                                                    <div style={{fontSize:"1.6rem", fontWeight:"600"}}>
                                                    <CountUp end={4001200} prefix={""} decimals={0}></CountUp>  
                                                    </div>
                                                    <div style={{fontSize:"17px", color:"#979797", fontWeight:"400"}}>
                                                        Total Visits
                                                    </div>
                                                  
                                                </div>
                                            <VictoryPie
                                            animate={{
                                                duration: 3000,
                                                onLoad: {
                                                    duration: 3000,
                                                    before: () => ({_y: 400, label: " "}),
                                                    after: (datum) => ({_y: datum._y})
                                                }
                                            }}
                                                colorScale={[
                                                    "#969696",
                                                    "#6C6C6C"
                                                    ]
                                                }
                                                height={400} width={500}
                                                padAngle={({ datum }) => datum.y}
                                                cornerRadius={20}
                                                innerRadius={115}
                                                data={[
                                                    { x: 1, y: 2, label: " " },
                                                    { x: 2, y: 7, label: " " },
                                                  ]}
                                            >

                                            </VictoryPie>
                                            </div>
                                            <Labels>
                                                <Label>
                                                    <Vh color="#969696"></Vh>
                                                    <div>
                                                        <h1>
                                                        Registered Users
                                                        </h1>
                                                        <h2>
                                                        3,124,213 users
                                                        </h2>
                                                    </div>
                                                </Label>
                                                <Label>
                                                    <Vh color="#6C6C6C"></Vh>
                                                    <div>
                                                        <h1>
                                                        Students
                                                        </h1>
                                                        <h2>
                                                        3,124,213 users
                                                        </h2>
                                                    </div>
                                                </Label>
                                            </Labels>
                                        </Perpetual>
                                        </div>
                                        
                                    </Brief>
                                    
                                <Victoryarea>
                                    <h1 style={{color:"#6C6C6C",fontSize:"1.8rem",fontWeight:"500"
                                        }}>What Students Interact With
                                    </h1>
                                    <VictoryChart
                                    padding={{left: 40, right:10, top:20, bottom:30}}
                                    height={250} width={550}>
                                        <VictoryArea
                                        animate={{duration: 5000}}
                                        interpolation="natural"
                                        style={{
                                        data: {
                                            fill: "#5BCAD6", fillOpacity: 0.3, stroke: "#5BCAD6", strokeWidth: 3
                                        },
                                        labels: {
                                            fontSize: 15,
                                            fill: ({ datum }) => datum.x === 3 ? "#000000" : "#c43a31"
                                        }
                                        }}
                                        data={[
                                            { x: 1, y: 2 },
                                            { x: 2, y: 3 },
                                            { x: 3, y: 5 },
                                            { x: 4, y: 4 },
                                            { x: 5, y: 5 }
                                        ]}
                                        
                                    />
                                        <VictoryArea
                                        animate={{duration: 1000}}
                                        interpolation="natural"
                                        style={{
                                            height: "100",
                                            data: {
                                                fill: "#303030", fillOpacity: 0.3, stroke: "#303030", strokeWidth: 3
                                            },
                                            labels: {
                                                fontSize: 15,
                                                fill: ({ datum }) => datum.x === 3 ? "#000000" : "#c43a31"
                                            }
                                        }}
                                        data={[
                                            { x: 1, y: 1 },
                                            { x: 2, y: 2 },
                                            { x: 3, y: 4 },
                                            { x: 4, y: 3 },
                                            { x: 5, y: 2 }
                                        ]}
                                    />
                                        <VictoryArea
                                        animate={{duration: 5000}}
                                        containerComponent={<VictoryChart responsive={false}/>}
                                        interpolation="natural"
                                        style={{
                                            height: "100",
                                            data: {
                                                fill: "#3CA9E7", fillOpacity: 0.3, stroke: "#3CA9E7", strokeWidth: 3
                                            },
                                            labels: {
                                                fontSize: 15,
                                                fill: ({ datum }) => datum.x === 3 ? "#000000" : "#c43a31"
                                            }
                                        }}
                                        data={[
                                            { x: 1, y: 5 },
                                            { x: 2, y: 2 },
                                            { x: 3, y: 1 },
                                            { x: 4, y: 3 },
                                            { x: 5, y: 4 }
                                        ]}
                                    />
                                    </VictoryChart>
                                    <ColorLabels>
                                        <Label><Circle color="#444444" /><div>Courses</div></Label>
                                        <Label><Circle color="#5BCAD6" /><div>Practice Tests</div></Label>
                                        <Label><Circle color="#3CA9E7" /><div>Tests</div></Label>
                                    </ColorLabels>
                                </Victoryarea>
                                <CSSTransition
                                                key={1}
                                                in={true}
                                                appear={true}
                                                timeout={3000}
                                                classNames="item"
                                            >
                                 <ActivityHistory>
                                     <Header>
                                        <h1>Activity History</h1>
                                        <Statistic
                                            value={11.28}
                                            precision={2}
                                            valueStyle={{ color: '#3CA9E7', fontSize:"14px", display:"flex", alignItems:"center" }}
                                            prefix={<ArrowUpOutlined style={{display:"flex", alignItems:"center", justifyContent:"center"}} />}
                                            suffix={<div style={{display:"flex", alignItems:"center", justifyContent:"center", gap:"10px"}}>%<div style={{fontSize:"100%", color:"#6c6c6c"}}>This month</div></div>}
                                        />
                                     </Header>
                                    <Timeline>
                                        <Timeline.Item>Create a services site <br/><h3 style={{fontSize:"15px"}} >2015-09-01</h3></Timeline.Item>
                                        <Timeline.Item>Solve initial network problems <br/><h3 style={{fontSize:"15px"}} >2015-09-01</h3></Timeline.Item>
                                        <Timeline.Item dot={<ClockCircleOutlined className="timeline-clock-icon" />} color="red">
                                        Technical testing <h3 style={{fontSize:"15px"}} >2015-09-01</h3>
                                        </Timeline.Item>
                                        <Timeline.Item>Network problems being solved <br/><h3 style={{fontSize:"15px"}} >2015-09-01</h3></Timeline.Item>
                                    </Timeline>
                                    <ViewAll>
                                        <div>View all</div>
                                        <ArrowRightOutlined />
                                    </ViewAll>
                                </ActivityHistory>
                                </CSSTransition>
                                <CSSTransition
                                                key={1}
                                                in={true}
                                                appear={true}
                                                timeout={3000}
                                                classNames="item"
                                            >
                                 <ActivityHistory>
                                     <Header>
                                        <h1>Purchase History</h1>
                                        <Statistic
                                            value={11.28}
                                            precision={2}
                                            valueStyle={{ color: '#3CA9E7', fontSize:"14px", display:"flex", alignItems:"center" }}
                                            prefix={<ArrowUpOutlined style={{display:"flex", alignItems:"center", justifyContent:"center"}} />}
                                            suffix={<div style={{display:"flex", alignItems:"center", justifyContent:"center", gap:"10px"}}>%<div style={{fontSize:"100%", color:"#6c6c6c"}}>This month</div></div>}
                                        />
                                     </Header>
                                    <Timeline>
                                        <Timeline.Item dot={<FaCircleNotch className="timeline-clock-icon" />} ><div style={{display:"flex", justifyContent:"space-between"}}><div>Create a services site</div><div style={{fontWeight:"600"}}>$12 000</div></div> <h3 style={{fontSize:"15px"}} >2015-09-01</h3></Timeline.Item>
                                        <Timeline.Item dot={<FaCircleNotch className="timeline-clock-icon" />} ><div style={{display:"flex", justifyContent:"space-between"}}><div>Create a services site</div><div style={{fontWeight:"600"}}>$12 000</div></div> <h3 style={{fontSize:"15px"}} >2015-09-01</h3></Timeline.Item>
                                        <Timeline.Item dot={<FaCircleNotch className="timeline-clock-icon" />} ><div style={{display:"flex", justifyContent:"space-between"}}><div>Create a services site</div><div style={{fontWeight:"600"}}>$12 000</div></div><h3 style={{fontSize:"15px"}} >2015-09-01</h3></Timeline.Item>
                                        <Timeline.Item dot={<FaCircleNotch className="timeline-clock-icon" />} ><div style={{display:"flex", justifyContent:"space-between"}}><div>Create a services site</div><div style={{fontWeight:"600"}}>$12 000</div></div> <h3 style={{fontSize:"15px"}} >2015-09-01</h3></Timeline.Item>
                                    </Timeline>
                                    <ViewAll>
                                        <div>View all</div>
                                        <ArrowRightOutlined />
                                    </ViewAll>
                                </ActivityHistory>
                                </CSSTransition>
                    </StaticsMainContainer>
            </div>
        );
    }
}
const Victoryarea= styled.div`
     display: flex;
     flex-direction: column;
     padding:0;
     min-width: 400px;
     margin-bottom:10px;
     gap: 6vh;
`
const StaticsMainContainer=  styled.div`
margin-left: 3vw;
margin-right: 3vw;
gap: 1vw;
display: flex;
flex-wrap: wrap;
justify-content: space-between;
`
const Brief= styled.div`
    display:flex;
    width: 100%;
    gap: 2vw;
    align-items: center;
    justify-content: space-between;
    padding-top: 2vh;
    flex-wrap: wrap;
`
const Perpetual= styled.div`
    display:flex;
    width: 35vw;
    flex-wrap: wrap;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    
`
const Labels= styled.div`
    display:flex;
    flex-direction: column;
    align-items: center;
    gap: 4vh;
    height: 30vh;
`
const ColorLabels= styled.div`
    display:flex;
    align-items: center;
    justify-content: center;
    gap: 3vw;

`
const Circle= styled.div`
   height: 18px;
  width: 18px;
  background-color: ${prop=>prop.color};
  border-radius: 50%;


`

const Label= styled.div`
    display:flex;
    justify-content: flex-start;
    gap: 1vw;
    & >div> h1{
        font-size: 13px;
        color: #6C6C6C;
    }
    & >div> h2{
        font-size: 14px;
        font-weight: 700;
        color:  #444444;
    }
`

const Vh= styled.div`
    border-top: 6px solid;
    border-color:${p => (p.color)};
    width: 2.5vw;
    min-width: 20px;
    margin-top: 5px;
`

const ActivePercentage= styled.div`
    display:flex;
    flex-direction: column;
    flex-wrap: wrap;
    width: 22vw;
    height: 100%;

`
const ActivityHistory= styled.div`
    display:flex;
    flex-direction: column;
    flex-wrap: wrap;
    background-color: white;
    border-radius:12px;
    box-shadow: 0px 20px 27px rgba(0, 0, 0, 0.1);
    width: 20vw;
    min-width: 300px;
    padding:25px;
    margin-bottom: 3vh;
`
const Header= styled.div`
margin-bottom: 3vh;
&>h1{
    font-size: 16px;
    font-weight: 700;
}
`
const ViewAll= styled.div`
    display:flex;
    align-items: center;
    gap: 10px;
    &>*{
        font-weight: 500;
    }
    &:hover{
        color: #3CA9E7;
        font-weight: 700;
        cursor: pointer;
    }
`
const MonthStatistics=  styled.div`
display: flex;
flex-wrap: wrap;
align-items: center;
justify-content: center;
gap:4vh;
width: 100%;
margin-top:3vh;
margin-bottom: 3vh;
`
const SingleStatistic=  styled.div`
display: flex;
align-items: center;
justify-content: space-between;
box-shadow: 0px 20px 27px rgba(0, 0, 0, 0.05);
background: #FFFFFF;
border-radius: 16px;
padding:15px;
height: 80px;
width: 280px;
`
const Info=  styled.div`
    display: flex;
    align-items: center;
    width: 200px;
    flex-wrap: wrap;
    
  
    &>h1{
        width: 100%;
        font-size: 14px;
        color:#818181;
    }
    &>h2{
        margin:0px 5px 5px 0px ;
        font-size: 20px;
        color:#303030;
        font-weight: 600;
    }
    &>h3{
        margin:0px 0px 0px 0px ;
        font-size: 16px;
        color:#818181;
    }
`
const Vector= styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #444444 0%, #3CA9E7 100%);
    box-shadow: 0px 4px 6px -1px rgba(0, 0, 0, 0.12), 0px 2px 4px -1px rgba(0, 0, 0, 0.07);
    border-radius: 8px;
    height: 50px;
    width: 50px;
    &>*{
        width: 60%;
        height: 60%;
        color: white ;
    }
`
export default SalesOverview;
/* Rectangle */
