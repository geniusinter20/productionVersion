import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import styled from 'styled-components';
import "./AdminDashboard.css";
import { Breadcrumb, Avatar, Badge, Menu, Affix } from 'antd';
import { UserOutlined, MenuUnfoldOutlined, MenuFoldOutlined, FileDoneOutlined } from '@ant-design/icons';
import { HiBell } from "react-icons/hi";
import { RiSettings3Fill, RiPieChartFill } from "react-icons/ri";
import { TiHome } from "react-icons/ti";
import { BsFileEarmarkCheckFill } from "react-icons/bs";
import SalesOverview from './SalesOverview';
import PracticeTestsWithRouter from './PracticeTests/PracticeTestsWithRouter';
import CreatePracticeTest from './PracticeTests/CreatePracticeTest';
import ExamsWithRouter from './Exams/ExamsWithRouter';
import CreateExam from './Exams/CreateExam';
import EditExam from './Exams/EditExam';
import EditPracticeTest from './PracticeTests/EditPracticeTest';
import Logo_H_B from "./../../Images/Logo_H_B.svg";
import { Link, Route, Routes, useParams, useLocation } from "react-router-dom";
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { fetchExamsSuccess } from '../../Redux/Actions/ExamsActions';



const { Header, Footer, Sider, Content } = Layout;

function AdminDashboard(props) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();

    const breadcrumbNameMap = {
        "/dashboard": 'Dasboard',
        '/dashboard/exams': 'exams',
        '/dashboard/exams/editexam': 'Edit Exam',
        '/dashboard/exams/createexam': 'Create Exam',
        '/dashboard/practicetests/editpracticetest': 'Edit PracticeTest',
        '/dashboard/practicetests/createpracticetest': 'Create PracticeTest',
        '/dashboard/practicetests': 'Practice Tests',
        '/dashboard/courses': 'Courses',
        '/dashboard/faqs': 'FAQs',
    };
    const pathSnippets = location.pathname.split('/').filter(i => i);
    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
        //console.log(url)
        return (
            <Breadcrumb.Item key={url}>
                <Link to={url}>{breadcrumbNameMap[url]}</Link>
            </Breadcrumb.Item>
        );
    });
    const breadcrumbItems = [
        <Breadcrumb.Item key="/">
            <Link to="/">Home</Link>
        </Breadcrumb.Item>,
    ].concat(extraBreadcrumbItems);
    useEffect(() => {
        dispatch(fetchExamsSuccess())
    }, [])
    const toggle = () => {
        setCollapsed(!collapsed)
    };

    const onBackClick = (e) => {
        navigate(e);
    }
    return (
        < div className="mainContainer">
            <Layout>
                <Sider padding={0} trigger={null} collapsible collapsed={collapsed} className="sider"
                    style={{ background: "white", }}
                >
                    <Affix offsetTop={30}>
                        <div className="siderHeader">
                            <div style={{ fontWeight: "400", display: "flex", gap: "4px" }}>Hi,<div style={{ fontWeight: "700" }}>yazn</div></div>
                            {!collapsed && <Logo><object data={Logo_H_B} type="image/svg+xml"></object></Logo>}
                        </div>
                        <Menu defaultSelectedKeys={[params.page]} style={{ marginTop: "15vh" }}>
                            <Menu.Item onClick={() => onBackClick("/dashboard")} key="salesoverview" className="menuItem" icon={<TiHome style={{ height: "100%", width: "27px" }} />} >Sales OverView</Menu.Item>
                            <Menu.Item onClick={() => onBackClick("/dashboard/practicetests")} key="practicetests" className="menuItem" icon={<svg width="25" height="25" viewBox="0 0 27 27" xmlns="http://www.w3.org/2000/svg"><path d="M14.6362 0.00137843C13.1129 -0.0256216 11.6234 0.342253 10.3364 1.26138C6.40679 3.71163 5.46854 9.11388 7.90304 13.5689C8.40029 8.16888 12.331 3.71163 17.533 2.7655C19.9687 2.4865 21.7405 2.7655 21.7405 2.7655C19.801 1.20175 17.1719 0.0486284 14.6362 0.00137843ZM8.73442 1.03975C4.97017 2.26488 1.03942 5.71638 1.53779 9.6145C1.53779 14.0695 5.96467 17.5233 10.3364 18.9711C6.90517 15.0168 4.47067 10.1174 6.62954 4.71513C7.62742 2.43138 8.73329 1.03975 8.73329 1.03975H8.73442ZM20.0137 3.57775C16.876 3.53838 12.4559 5.1055 10.8359 8.11263C15.7634 6.163 22.0747 6.60963 25.0627 11.9005C26.3373 14.0718 26.8345 15.7975 26.8345 15.7975C27.4443 11.5653 26.4464 6.16413 22.573 4.15825C21.9633 3.7825 21.0599 3.59125 20.0137 3.57775ZM17.2045 7.66713C21.1342 11.6204 23.5687 18.0261 20.1925 22.9818C18.6985 25.1541 17.3688 26.4344 17.3688 26.4344H17.371C21.6325 25.3769 26.0032 21.4236 26.0032 17.0238C26.0032 14.0729 22.9612 8.78088 17.2057 7.66713H17.2045ZM0.597292 10.6743C-0.896708 14.5724 0.541042 19.4718 3.47504 21.4776C7.40467 24.4296 12.7754 22.9806 16.705 19.528C11.3354 20.5315 5.46742 19.528 2.48054 14.6838C1.15192 12.4 0.596167 10.6743 0.596167 10.6743H0.597292ZM20.5233 14.2383C18.5849 19.6383 14.2132 23.4273 8.56792 23.7063C5.96692 23.5386 4.13992 22.9818 4.13992 22.9818C6.85117 26.323 11.7775 27.7158 15.7072 26.2128C18.3644 25.1553 20.3568 22.2573 20.7989 18.9711C21.0757 17.3005 20.7449 15.9078 20.5233 14.2383Z" /></svg>}>Practice Tests</Menu.Item>
                            <Menu.Item key="3" className="menuItem" icon={<svg width="25" height="25" viewBox="0 0 27 27" xmlns="http://www.w3.org/2000/svg"><path d="M2.25 6.75H0V20.25C0 20.8467 0.237053 21.419 0.65901 21.841C1.08097 22.2629 1.65326 22.5 2.25 22.5H15.75V20.25H2.25V6.75Z" /><path d="M20.25 0H6.75C6.15326 0 5.58097 0.237053 5.15901 0.65901C4.73705 1.08097 4.5 1.65326 4.5 2.25V15.75C4.5 16.3467 4.73705 16.919 5.15901 17.341C5.58097 17.7629 6.15326 18 6.75 18H20.25C20.8467 18 21.419 17.7629 21.841 17.341C22.2629 16.919 22.5 16.3467 22.5 15.75V2.25C22.5 1.65326 22.2629 1.08097 21.841 0.65901C21.419 0.237053 20.8467 0 20.25 0ZM10.125 13.5V4.5L18 9L10.125 13.5Z" /></svg>}>Courses</Menu.Item>
                            <Menu.Item onClick={() => onBackClick("/dashboard/exams")} key="4" className="menuItem" icon={<BsFileEarmarkCheckFill style={{ height: "100%", width: "27px" }} />}>Exams</Menu.Item>
                            <Menu.Item key="5" className="menuItem" icon={<RiPieChartFill style={{ height: "100%", width: "27px" }} />}>Statistics</Menu.Item>
                            <Menu.Item key="6" className="menuItem" icon={<svg width="25" height="25" viewBox="0 0 27 27" xmlns="http://www.w3.org/2000/svg"><path d="M10.1307 2.74286e-07C8.37376 -0.000409638 6.64726 0.458638 5.12253 1.33159C3.59779 2.20454 2.32785 3.46104 1.43872 4.9764C0.549593 6.49175 0.0721962 8.21328 0.0539073 9.97013C0.0356183 11.727 0.477073 13.4581 1.33446 14.9916L0.102212 18.2187C-0.000353173 18.487 -0.0263701 18.7784 0.0270636 19.0606C0.0804973 19.3428 0.21128 19.6046 0.404822 19.8168C0.598364 20.029 0.847053 20.1832 1.12315 20.2623C1.39924 20.3414 1.69188 20.3422 1.96841 20.2647L5.82326 19.1844C7.18879 19.8296 8.68191 20.1595 10.1922 20.1498C11.7024 20.1401 13.1912 19.791 14.5483 19.1282C15.9054 18.4655 17.0962 17.5062 18.0325 16.3212C18.9688 15.1361 19.6268 13.7558 19.9576 12.2822C20.2885 10.8086 20.2838 9.27945 19.944 7.8079C19.6041 6.33634 18.9378 4.96002 17.9943 3.78074C17.0507 2.60146 15.8541 1.64939 14.493 0.994966C13.1318 0.340541 11.641 0.000501049 10.1307 2.74286e-07ZM10.1199 6.04655C9.56496 6.15505 8.95736 6.51465 8.47996 7.35785C8.42968 7.44639 8.36246 7.52417 8.28212 7.58673C8.20179 7.6493 8.10992 7.69542 8.01176 7.72248C7.9136 7.74954 7.81107 7.757 7.71003 7.74444C7.60898 7.73187 7.5114 7.69953 7.42286 7.64925C7.33432 7.59897 7.25654 7.53175 7.19398 7.45142C7.13141 7.37108 7.08529 7.27921 7.05823 7.18105C7.03117 7.08289 7.02371 6.98036 7.03627 6.87932C7.04884 6.77827 7.08118 6.68069 7.13146 6.59215C7.81501 5.38935 8.78686 4.7275 9.82226 4.526C10.7857 4.34405 11.782 4.54478 12.5999 5.08555C13.3501 5.58155 13.9561 6.3922 13.9747 7.36405C13.9949 8.3793 13.378 9.29535 12.2403 9.96805C11.4684 10.4238 11.1677 10.7338 11.039 10.9399C10.9305 11.1135 10.9057 11.2716 10.9057 11.625C10.9057 11.8305 10.8241 12.0277 10.6787 12.173C10.5334 12.3184 10.3363 12.4 10.1307 12.4C9.92517 12.4 9.72804 12.3184 9.5827 12.173C9.43736 12.0277 9.35571 11.8305 9.35571 11.625C9.35571 11.2034 9.37741 10.6795 9.72306 10.1215C10.0486 9.59915 10.605 9.13415 11.4513 8.6335C12.2806 8.14215 12.4309 7.6756 12.4263 7.3966C12.4185 7.07575 12.2062 6.6836 11.7443 6.37825C11.266 6.06187 10.6838 5.94299 10.1199 6.04655ZM10.5182 16.275C10.2099 16.275 9.91421 16.1525 9.6962 15.9345C9.47819 15.7165 9.35571 15.4208 9.35571 15.1125C9.35571 14.8042 9.47819 14.5085 9.6962 14.2905C9.91421 14.0725 10.2099 13.95 10.5182 13.95C10.8265 13.95 11.1222 14.0725 11.3402 14.2905C11.5582 14.5085 11.6807 14.8042 11.6807 15.1125C11.6807 15.4208 11.5582 15.7165 11.3402 15.9345C11.1222 16.1525 10.8265 16.275 10.5182 16.275Z" /><path d="M7.08691 21.297C8.03178 22.3973 9.20355 23.2801 10.5218 23.8847C11.84 24.4894 13.2735 24.8016 14.7238 24.8C16.2629 24.8 17.7246 24.4544 19.0328 23.8344L22.8876 24.9147C23.164 24.9919 23.4565 24.9908 23.7323 24.9115C24.0082 24.8323 24.2566 24.678 24.4499 24.4659C24.6432 24.2537 24.7739 23.9921 24.8272 23.7101C24.8806 23.4281 24.8547 23.1368 24.7523 22.8687L23.5185 19.6416C24.3338 18.1862 24.7988 16.5091 24.7988 14.725C24.7988 11.718 23.4813 9.01793 21.3903 7.17188C21.6166 8.04608 21.7422 8.96213 21.7546 9.90298C22.697 11.2747 23.2488 12.9363 23.2488 14.725C23.2488 16.3525 22.7931 17.8731 22.001 19.1673L21.8026 19.4928L23.3061 23.4221L18.8731 22.1821L18.6019 22.3185C17.4394 22.9137 16.1219 23.25 14.7238 23.25C12.966 23.2527 11.2507 22.7095 9.81491 21.6954C8.893 21.6713 7.97722 21.5376 7.08691 21.297Z" /></svg>}>FAQs</Menu.Item>

                        </Menu>
                    </Affix>
                </Sider>
                <Layout>
                    <Header className="header">
                        <div style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "3vw"
                        }}>
                            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                                className: 'trigger',
                                onClick: toggle,
                            })}
                            <Breadcrumb>{breadcrumbItems}</Breadcrumb>
                        </div>
                        <div className="iconContainer">
                            <RiSettings3Fill color="#6C6C6C" style={{ height: "30px", width: "30px", }} />
                            <Badge count={1} style={{ backgroundColor: "#5BCAD6" }}>
                                <HiBell color="#6C6C6C" style={{ height: "30px", width: "30px", }} />
                            </Badge>
                            <div className="vl"></div>
                            <div> Yazn Alsahyone</div>
                            <Avatar size={45} style={{ backgroundColor: '#6C6C6C', display: "flex", alignItems: "center", justifyContent: "space-around" }}
                                icon={<UserOutlined />}
                            />
                        </div>
                    </Header>
                    <Content className="content">
                        {/* {
                            params.page === "salesoverview" && <SalesOverview />
                        }
                        {
                            params.page === "practicetests" && <PracticeTestsWithRouter />
                        }
                        {
                            params.page === "createpracticetests" && <CreatePracticeTest />
                        }
                        {
                            params.page === "exams" && <ExamsWithRouter />
                        }
                        {
                            params.page === "createexam" && <CreateExam />
                        }
                        {
                            params.page === "editexam" && <EditExam/>
                        } */}

                        <Routes>
                            <Route path="/" element={<SalesOverview />} />
                            <Route path="/practicetests" element={<PracticeTestsWithRouter />} />
                            <Route path="/practicetests/createpracticetest" element={<CreatePracticeTest />} />
                            <Route path="/exams" element={<ExamsWithRouter />} />
                            <Route path="/exams/createexam" element={<CreateExam />} />
                            <Route path="/exams/editexam" element={<EditExam />} />
                            <Route path="/practicetests/editpracticetest" element={<EditPracticeTest />} />
                        </Routes>
                    </Content>
                    <Footer className="footer">©2021 Genius Digital All Right Reserved</Footer>
                </Layout>
            </Layout>
        </div >
    );
}
const Logo = styled.div`
display: flex; 
align-items: center;
height: 100%;
&> object{
    height: 75%;
}
`

export default AdminDashboard;