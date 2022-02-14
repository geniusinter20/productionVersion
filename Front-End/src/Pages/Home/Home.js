import React, { useEffect, useState } from 'react';
import Navbar from "../../Components/AppNavbar/Navbar"
import Footer from "../../Components/Footer/Footer"
import styled, { keyframes } from 'styled-components';
import { Row, Col, Button, Carousel, BackTop } from 'antd';
import HomeHeader from "../../Images/HomeHeader.png"
import Slide from '@mui/material/Slide';
import { fadeInRightBig, fadeIn } from 'react-animations';
import pmp1 from "../../Images/pmp1.jpg"
import pmp2 from "../../Images/pmp2.jpeg"
import HomeImage1 from "../../Images/HomeImage1.png"
import HomeImage2 from "../../Images/HomeImage2.png"
import Countup from 'react-countup';
import Rating from '@mui/material/Rating';
import { LeftOutlined, RightOutlined, UpOutlined } from "@ant-design/icons";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import { Form, Input, Checkbox, } from 'antd';
import { BsPhone } from "react-icons/bs";
import { HiOutlineMail } from "react-icons/hi";
import { RiHome3Line } from "react-icons/ri";
import { IoChevronUpOutline } from "react-icons/io5";
import { useLocation } from 'react-router-dom';
import * as Scroll from 'react-scroll'
import { useSelector } from "react-redux"


const fadeInAnimation = keyframes`${fadeIn}`;
const scroller = Scroll.scroller;
const carouselSvgs = [
    <svg width="158" height="132" viewBox="0 0 158 142" fill="none" xmlns="https://www.w3.org/2000/svg">
        <path d="M104.391 83.2135C95.9238 95.0862 83.5255 100.696 69.0162 100.696C51.394 100.696 36.311 87.6942 38.4756 70.4535C40.8849 51.3282 56.3732 43.1002 82.1334 40.0715C86.7302 39.5362 88.6347 39.3822 98.5549 38.6782L99.6104 38.6048V37.0282C99.6104 23.8575 91.4417 14.8669 80.489 14.8669C69.4981 14.8669 61.8266 20.3449 57.1227 33.3909L42.667 28.6095C49.4512 9.76286 62.8438 0.200195 80.489 0.200195C100.398 0.200195 114.907 16.1722 114.907 37.0282C114.907 56.4542 116.154 71.9055 118.602 77.7795C121.325 84.3208 122.319 85.9708 125.363 89.6082L113.431 98.7822C109.431 94.0008 107.672 91.0895 104.398 83.2208V83.2135H104.391ZM147.467 126.664C145.395 128.13 141.792 127.258 143.421 123.437C145.448 118.685 147.605 113.112 145.425 110.589C143.819 108.719 141.853 107.788 137.57 107.788C134.052 107.788 132.293 108.228 129.96 108.374C128.399 108.47 127.719 106.196 129.264 105.148C131.287 103.758 133.535 102.697 135.918 102.009C144.714 99.4862 155.078 100.872 156.34 102.618C159.131 106.504 154.818 121.457 147.467 126.671V126.664ZM138.427 118.714C136.44 120.556 134.319 122.26 132.078 123.811C115.848 135.662 94.83 141.851 76.5653 141.851C47.172 141.851 20.8839 128.702 0.936536 106.687C-0.769089 105.001 0.645892 102.537 2.64216 103.872C24.1346 119.103 50.7362 128.314 78.2786 128.314C95.6025 128.314 114.288 124.375 132.086 115.898C133.325 115.341 134.717 114.578 135.933 114.035C138.74 112.496 141.211 116.28 138.427 118.714V118.714ZM99.6868 53.3009C90.065 53.9902 88.2446 54.1295 83.992 54.6282C64.473 56.9235 54.9505 61.9835 53.6656 72.2135C52.7019 79.8622 59.8609 86.0295 69.0162 86.0295C84.6116 86.0295 95.9161 77.0242 99.7786 53.3009H99.6868V53.3009Z" fill="#6C6C6C" />
    </svg>,
    <svg width="169" height="107" viewBox="0 0 169 107" fill="none" xmlns="https://www.w3.org/2000/svg">
        <path d="M50.4306 44.6667C54.4876 44.6667 58.3785 43.1215 61.2473 40.371C64.116 37.6204 65.7277 33.8899 65.7277 30.0001C65.7277 26.1102 64.116 22.3797 61.2473 19.6292C58.3785 16.8786 54.4876 15.3334 50.4306 15.3334H16.0122V44.6667H50.4306ZM58.0791 59.3334H16.0122V88.6667H58.0791C62.1362 88.6667 66.027 87.1215 68.8958 84.371C71.7645 81.6204 73.3762 77.8899 73.3762 74.0001C73.3762 70.1102 71.7645 66.3797 68.8958 63.6292C66.027 60.8786 62.1362 59.3334 58.0791 59.3334ZM73.8581 48.8614C79.5909 52.1665 84.0359 57.182 86.5125 63.14C88.9891 69.098 89.3609 75.67 87.5708 81.8498C85.7806 88.0296 81.9274 93.4766 76.601 97.3567C71.2745 101.237 64.7685 103.336 58.0791 103.333H0.715101V0.666748H50.4306C56.2548 0.667397 61.9577 2.26197 66.8693 5.26306C71.7809 8.26416 75.6969 12.5471 78.1573 17.6085C80.6177 22.6699 81.5201 28.2995 80.7585 33.8357C79.9969 39.3719 77.603 44.5847 73.8581 48.8614ZM111.619 8.00008H153.686V19.0001H111.619V8.00008ZM168.983 70.3334H111.619V72.1667C111.617 76.6968 113.206 81.0955 116.13 84.654C119.054 88.2124 123.142 90.7234 127.736 91.7822C132.33 92.841 137.162 92.3859 141.453 90.4904C145.745 88.5949 149.245 85.3693 151.391 81.3334H167.713C165.383 89.4608 160.059 96.5029 152.728 101.155C145.398 105.807 136.557 107.755 127.843 106.636C119.13 105.517 111.135 101.408 105.339 95.0703C99.5432 88.7326 96.3397 80.5956 96.3218 72.1667V61.1667C96.3218 51.9284 100.149 43.0684 106.963 36.5359C113.776 30.0033 123.017 26.3334 132.652 26.3334C142.288 26.3334 151.529 30.0033 158.342 36.5359C165.155 43.0684 168.983 51.9284 168.983 61.1667V70.3334ZM152.89 55.6667C151.638 51.4463 148.985 47.7324 145.333 45.0881C141.681 42.4438 137.229 41.0132 132.652 41.0132C128.076 41.0132 123.624 42.4438 119.972 45.0881C116.32 47.7324 113.667 51.4463 112.414 55.6667H152.89Z" fill="#6C6C6C" />
    </svg>,
    <svg width="135" height="119" viewBox="0 0 135 129" fill="none" xmlns="https://www.w3.org/2000/svg">
        <path d="M65.2176 45.0334C72.2313 38.1621 81.3636 33.6668 91.9875 33.6668C103.144 33.6668 113.844 37.9161 121.733 45.4801C129.622 53.0441 134.054 63.303 134.054 74.0001V129H118.757V74.0001C118.757 67.1929 115.937 60.6644 110.917 55.851C105.896 51.0376 99.0873 48.3334 91.9875 48.3334C84.8876 48.3334 78.0786 51.0376 73.0583 55.851C68.0379 60.6644 65.2176 67.1929 65.2176 74.0001V129H49.9205V37.3334H65.2176V45.0334ZM11.6778 22.6667C8.63499 22.6667 5.71684 21.5078 3.56527 19.4449C1.4137 17.382 0.204956 14.5841 0.204956 11.6667C0.204956 8.74937 1.4137 5.95147 3.56527 3.88857C5.71684 1.82567 8.63499 0.666748 11.6778 0.666748C14.7205 0.666748 17.6387 1.82567 19.7903 3.88857C21.9418 5.95147 23.1506 8.74937 23.1506 11.6667C23.1506 14.5841 21.9418 17.382 19.7903 19.4449C17.6387 21.5078 14.7205 22.6667 11.6778 22.6667ZM4.02923 37.3334H19.3263V129H4.02923V37.3334Z" fill="#6C6C6C" />
    </svg>,
    <svg width="169" height="107" viewBox="0 0 169 107" fill="none" xmlns="https://www.w3.org/2000/svg">
        <path d="M50.4306 44.6667C54.4876 44.6667 58.3785 43.1215 61.2473 40.371C64.116 37.6204 65.7277 33.8899 65.7277 30.0001C65.7277 26.1102 64.116 22.3797 61.2473 19.6292C58.3785 16.8786 54.4876 15.3334 50.4306 15.3334H16.0122V44.6667H50.4306ZM58.0791 59.3334H16.0122V88.6667H58.0791C62.1362 88.6667 66.027 87.1215 68.8958 84.371C71.7645 81.6204 73.3762 77.8899 73.3762 74.0001C73.3762 70.1102 71.7645 66.3797 68.8958 63.6292C66.027 60.8786 62.1362 59.3334 58.0791 59.3334ZM73.8581 48.8614C79.5909 52.1665 84.0359 57.182 86.5125 63.14C88.9891 69.098 89.3609 75.67 87.5708 81.8498C85.7806 88.0296 81.9274 93.4766 76.601 97.3567C71.2745 101.237 64.7685 103.336 58.0791 103.333H0.715101V0.666748H50.4306C56.2548 0.667397 61.9577 2.26197 66.8693 5.26306C71.7809 8.26416 75.6969 12.5471 78.1573 17.6085C80.6177 22.6699 81.5201 28.2995 80.7585 33.8357C79.9969 39.3719 77.603 44.5847 73.8581 48.8614ZM111.619 8.00008H153.686V19.0001H111.619V8.00008ZM168.983 70.3334H111.619V72.1667C111.617 76.6968 113.206 81.0955 116.13 84.654C119.054 88.2124 123.142 90.7234 127.736 91.7822C132.33 92.841 137.162 92.3859 141.453 90.4904C145.745 88.5949 149.245 85.3693 151.391 81.3334H167.713C165.383 89.4608 160.059 96.5029 152.728 101.155C145.398 105.807 136.557 107.755 127.843 106.636C119.13 105.517 111.135 101.408 105.339 95.0703C99.5432 88.7326 96.3396 80.5956 96.3218 72.1667V61.1667C96.3218 51.9284 100.149 43.0684 106.963 36.5359C113.776 30.0033 123.017 26.3334 132.652 26.3334C142.288 26.3334 151.529 30.0033 158.342 36.5359C165.155 43.0684 168.983 51.9284 168.983 61.1667V70.3334ZM152.89 55.6667C151.638 51.4463 148.985 47.7324 145.333 45.0881C141.681 42.4438 137.229 41.0132 132.652 41.0132C128.076 41.0132 123.624 42.4438 119.972 45.0881C116.32 47.7324 113.667 51.4463 112.414 55.6667H152.89Z" fill="#6C6C6C" />
    </svg>,
    <svg width="135" height="132" viewBox="0 0 135 132" fill="none" xmlns="https://www.w3.org/2000/svg">
        <path d="M69.0334 58.6667H134.298C134.635 61.49 134.811 64.3867 134.811 67.3493C134.811 87.3987 127.315 104.28 114.328 115.749C102.97 125.803 87.4205 131.699 68.8804 131.699C59.8603 131.703 50.9277 130.003 42.5933 126.695C34.2588 123.387 26.6859 118.538 20.3073 112.423C13.9287 106.307 8.86951 99.0472 5.4188 91.0566C1.96808 83.066 0.193524 74.5018 0.19654 65.8533C0.192519 57.2043 1.96634 48.6392 5.4166 40.6478C8.86687 32.6564 13.9259 25.3952 20.3046 19.2794C26.6833 13.1636 34.2566 8.31301 42.5915 5.00494C50.9264 1.69687 59.8596 -0.00384863 68.8804 6.53946e-06C87.3899 6.53946e-06 102.939 6.52668 114.833 17.1527L103.651 27.8667C94.7937 19.6607 82.8237 14.6667 69.0334 14.6667C62.0025 14.6667 55.0404 15.9944 48.5446 18.5742C42.0489 21.1539 36.1467 24.9351 31.1751 29.7019C26.2034 34.4686 22.2597 40.1275 19.5691 46.3556C16.8785 52.5836 15.4936 59.2588 15.4936 66C15.4936 72.7412 16.8785 79.4164 19.5691 85.6444C22.2597 91.8725 26.2034 97.5314 31.1751 102.298C36.1467 107.065 42.0489 110.846 48.5446 113.426C55.0404 116.006 62.0025 117.333 69.0334 117.333C96.0022 117.333 116.026 98.208 119.338 73.3333H69.0334V58.6667Z" fill="#6C6C6C" />
    </svg>,
    <svg width="158" height="132" viewBox="0 0 158 142" fill="none" xmlns="https://www.w3.org/2000/svg">
        <path d="M104.391 83.2135C95.9238 95.0862 83.5255 100.696 69.0162 100.696C51.394 100.696 36.311 87.6942 38.4756 70.4535C40.8849 51.3282 56.3732 43.1002 82.1334 40.0715C86.7302 39.5362 88.6347 39.3822 98.5549 38.6782L99.6104 38.6048V37.0282C99.6104 23.8575 91.4417 14.8669 80.489 14.8669C69.4981 14.8669 61.8266 20.3449 57.1227 33.3909L42.667 28.6095C49.4512 9.76286 62.8438 0.200195 80.489 0.200195C100.398 0.200195 114.907 16.1722 114.907 37.0282C114.907 56.4542 116.154 71.9055 118.602 77.7795C121.325 84.3208 122.319 85.9708 125.363 89.6082L113.431 98.7822C109.431 94.0008 107.672 91.0895 104.398 83.2208V83.2135H104.391ZM147.467 126.664C145.395 128.13 141.792 127.258 143.421 123.437C145.448 118.685 147.605 113.112 145.425 110.589C143.819 108.719 141.853 107.788 137.57 107.788C134.052 107.788 132.293 108.228 129.96 108.374C128.399 108.47 127.719 106.196 129.264 105.148C131.287 103.758 133.535 102.697 135.918 102.009C144.714 99.4862 155.078 100.872 156.34 102.618C159.131 106.504 154.818 121.457 147.467 126.671V126.664ZM138.427 118.714C136.44 120.556 134.319 122.26 132.078 123.811C115.848 135.662 94.83 141.851 76.5653 141.851C47.172 141.851 20.8839 128.702 0.936536 106.687C-0.769089 105.001 0.645892 102.537 2.64216 103.872C24.1346 119.103 50.7362 128.314 78.2786 128.314C95.6025 128.314 114.288 124.375 132.086 115.898C133.325 115.341 134.717 114.578 135.933 114.035C138.74 112.496 141.211 116.28 138.427 118.714V118.714ZM99.6868 53.3009C90.065 53.9902 88.2446 54.1295 83.992 54.6282C64.473 56.9235 54.9505 61.9835 53.6656 72.2135C52.7019 79.8622 59.8609 86.0295 69.0162 86.0295C84.6116 86.0295 95.9161 77.0242 99.7786 53.3009H99.6868V53.3009Z" fill="#6C6C6C" />
    </svg>,
]
function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}

export default function Home() {
    const containerRef = React.useRef(null);
    const [animateSeg2, setAnimateSeg2] = useState(false)
    const [count, setCount] = useState(0)
    const [renderReviews, setRenderReviews] = useState(false)
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
    const [form] = Form.useForm();
    const location = useLocation();
    const auth = useSelector(state => state.auth)
    const reviews = [{
        reviewTitle: "Best Developers",
        reviewText: "Outward clothes promise at gravity do excited. Sufficient particular impossible by reasonable oh expression is. Yet preference connection unpleasant yet melancholy but end appearance. And excellence partiality estimating terminated day everything.",
        rate: 3.5,
        userName: "Robert Beterson",
    },
    {
        reviewTitle: "Best Designers",
        reviewText: "Outward clothes promise at gravity do excited. Sufficient particular impossible by reasonable oh expression is. Yet preference connection unpleasant yet melancholy but end appearance. And excellence partiality estimating terminated day everything.",
        rate: 3.5,
        userName: "Mark Johnson",
    },
    {
        reviewTitle: "Best Managers",
        reviewText: "Outward clothes promise at gravity do excited. Sufficient particular impossible by reasonable oh expression is. Yet preference connection unpleasant yet melancholy but end appearance. And excellence partiality estimating terminated day everything.",
        rate: 3.5,
        userName: "John Doe",
    },
    {
        reviewTitle: "Best Programmers",
        reviewText: "Outward clothes promise at gravity do excited. Sufficient particular impossible by reasonable oh expression is. Yet preference connection unpleasant yet melancholy but end appearance. And excellence partiality estimating terminated day everything.",
        rate: 3.5,
        userName: "Robert John",
    }]
    useEffect(() => {
        //console.log(location.hash.match(/[^#]+/g)[0])
        if (location.hash) {
            scroller.scrollTo(location.hash.match(/[^#]+/g)[0], {
                duration: 2500,
                delay: 500,
                offset: 100,
            })
        }
    }, [location])
    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }
        //console.log(windowDimensions)
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [windowDimensions]);
    useEffect(() => {
        window.onscroll = () => {
            //console.log(window.pageYOffset)
            if (window.pageYOffset > 700) {
                setAnimateSeg2(true)
            }
            if (window.pageYOffset > 2300) {
                setRenderReviews(true)
            }
        }
    }, []);
    const reviewsLoop = (action) => {
        setRenderReviews(false)
        setTimeout(() => {
            setRenderReviews(true)
        }, 500);
        if (action === "next") {
            if (count === reviews.length - 2) {
                setTimeout(() => {
                    setCount(0);
                }, 300);
            }
            else {
                setTimeout(() => {
                    setCount(count + 2)
                }, 300);
            }
        }
        else {
            if (count === 0) {
                setTimeout(() => {
                    setCount(reviews.length - 2);
                }, 300);
            }
            else {
                setTimeout(() => {
                    setCount(count - 2)
                }, 300);

            }
        }

    }
    const onFinish = () => {
        form.validateFields()
            .then(
                ({ email, password }) => {
                    //console.log("fullname:", fullName)
                })
            .catch((errorInfo) => { });
    };
    return (
        <div>
             <BackTop visibilityHeight={1500}><CrButton shape="circle" icon={<IoChevronUpOutline/>} size="large" /></BackTop>
            <Navbar></Navbar>
            <MainContainer>
                <Header gutter={[0, 20]}>
                    <ColAni xs={{ span: 20, offset: 0 }} lg={{ span: 13, offset: 0 }}>
                        <div style={{ fontSize: "80%", fontWeight: "200", lineHeight: "80px", color: "#444444" }}>We Deliver</div>
                        <div style={{ fontSize: "80%", fontWeight: "500", lineHeight: "80px", color: "#5BCAD6" }}>Value</div>
                        <div style={{ fontSize: "20%", fontWeight: "300", color: "#6c6c6c", maxWidth: "600px", marginTop: "4vh" }}>
                        Build skills required for passing PMI certifications with courses, practice tests, and exams from PMI accredited instructors.
                        </div>
                        <Button type="primary" shape="round" size="lg" style={{ maxWidth: "155px", height: "45px", marginTop: "3vh", fontWeight: "500", fontSize: "17.5px" }}>Our Services</Button>
                    </ColAni>
                    <Col xs={{ span: 20, offset: 0 }} lg={{ span: 9, offset: 0 }} ref={containerRef}>
                        <Slide direction="up" in={true} container={containerRef.current}>
                            <Pic><img src={HomeHeader}></img></Pic>
                        </Slide>
                    </Col>
                </Header>
                <div style={{ background: "#303030" }}>
                    <Segment2>
                        <ColAni xs={{ span: 22, offset: 0 }} sm={{ span: 22, offset: 0 }} lg={{ span: 10, offset: 0 }} style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                            <div style={{ fontSize: "70%", fontWeight: "200", lineHeight: "70px", color: "white" }}>PRACTICE AND</div>
                            <div style={{ fontSize: "70%", fontWeight: "500", color: "#5BCAD6" }}>LEARN.</div>
                            <div style={{ fontSize: "25%", fontWeight: "400", color: "white", maxWidth: "530px", marginTop: "1+++++++++++++++++++++++++++++++++++++++vh" }}>
                                Project Management Training Provider
                            </div>
                            <div style={{ fontSize: "18px", fontWeight: "200", color: "white", maxWidth: "530px", marginTop: "2vh" }}>
                            Here in ExporaGenius, we strongly believe that everything is achievable if you have the motivation and opportunity to 
                            put effort into that direction. We understand that motivation and putting effort go hand-in-hand, however, it's also 
                            obvious for us that motivation has crucial meaning. Therefore,
                            we create our program that way to encourage our users and keep them motivated in preparation for PMI certification.
                            </div>
                        </ColAni>
                        <Col xs={{ span: 0, offset: 0 }} sm={{ span: 0, offset: 0 }} lg={{ span: 13, offset: 0 }}>
                            <Carousel1 autoplay infinite autoplaySpeed={2000}>
                                <Pic><img src={pmp1}></img></Pic>
                                <Pic><img src={pmp2}></img></Pic>
                            </Carousel1>
                        </Col>
                    </Segment2>

                </div>
                <Segment3>
                    {animateSeg2 && <FContainer>
                        <SVG order={"1s"} width="120" height="95" viewBox="0 0 639 512" fill="none" xmlns="https://www.w3.org/2000/svg">
                            <path d="M95 224C130.3 224 159 195.3 159 160C159 124.7 130.3 96 95 96C59.7 96 31 124.7 31 160C31 195.3
                                59.7 224 95 224ZM543 224C578.3 224 607 195.3 607 160C607 124.7 578.3 96 543 96C507.7
                                 96 479 124.7 479 160C479 195.3 507.7 224 543 224ZM575 256H511C493.4 256 477.5 263.1
                             465.9 274.6C506.2 296.7 534.8 336.6 541 384H607C624.7 384 639 369.7 639 352V320C639 
                             284.7 610.3 256 575 256ZM319 256C380.9 256 431 205.9 431 144C431 82.1 380.9 32 319 
                             32C257.1 32 207 82.1 207 144C207 205.9 257.1 256 319 256ZM395.8 288H387.5C366.7 298
                                343.6 304 319 304C294.4 304 271.4 298 250.5 288H242.2C178.6 288 127 339.6 127 403.2V432C127 
                             458.5 148.5 480 175 480H463C489.5 480 511 458.5 511 432V403.2C511 339.6 459.4 288 395.8 288ZM172.1
                            274.6C160.5 263.1 144.6 256 127 256H63C27.7 256 -1 284.7 -1 320V352C-1 369.7 13.3 384 31 384H96.9C103.2 
                            336.6 131.8 296.7 172.1 274.6Z" fill="#5BCAD6" />
                        </SVG>

                        <div style={{ fontSize: "25px", fontWeight: "500", color: "#444444", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                            <Countup prefix="+" suffix=" Students" style={{ paddingRight: "8px" }} end={500} duration={2} />
                        </div>
                    </FContainer>}
                    {animateSeg2 && <FContainer>
                        <SVG order={"2s"} width="95" height="100" viewBox="0 0 27 27" xmlns="https://www.w3.org/2000/svg" fill="#5BCAD6"><path d="M14.6362 0.00137843C13.1129 
                    -0.0256216 11.6234 0.342253 10.3364 1.26138C6.40679 3.71163 5.46854 9.11388 7.90304 13.5689C8.40029 8.16888 12.331 3.71163 
                    17.533 2.7655C19.9687 2.4865 21.7405 2.7655 21.7405 2.7655C19.801 1.20175 17.1719 0.0486284 14.6362 0.00137843ZM8.73442 
                    1.03975C4.97017 2.26488 1.03942 5.71638 1.53779 9.6145C1.53779 14.0695 5.96467 17.5233 10.3364 18.9711C6.90517 15.0168 
                    4.47067 10.1174 6.62954 4.71513C7.62742 2.43138 8.73329 1.03975 8.73329 1.03975H8.73442ZM20.0137 3.57775C16.876 3.53838 
                    12.4559 5.1055 10.8359 8.11263C15.7634 6.163 22.0747 6.60963 25.0627 11.9005C26.3373 14.0718 26.8345 15.7975 26.8345 
                    15.7975C27.4443 11.5653 26.4464 6.16413 22.573 4.15825C21.9633 3.7825 21.0599 3.59125 20.0137 3.57775ZM17.2045
                     7.66713C21.1342 11.6204 23.5687 18.0261 20.1925 22.9818C18.6985 25.1541 17.3688 26.4344 17.3688 26.4344H17.371C21.6325 
                     25.3769 26.0032 21.4236 26.0032 17.0238C26.0032 14.0729 22.9612 8.78088 17.2057 7.66713H17.2045ZM0.597292 10.6743C-0.896708 
                     14.5724 0.541042 19.4718 3.47504 21.4776C7.40467 24.4296 12.7754 22.9806 16.705 19.528C11.3354 20.5315 5.46742 19.528 2.48054 
                     14.6838C1.15192 12.4 0.596167 10.6743 0.596167 10.6743H0.597292ZM20.5233 14.2383C18.5849 19.6383 14.2132 23.4273 8.56792 
                     23.7063C5.96692 23.5386 4.13992 22.9818 4.13992 22.9818C6.85117 26.323 11.7775 27.7158 15.7072 26.2128C18.3644 25.1553 20.3568 22.2573
                     20.7989 18.9711C21.0757 17.3005 20.7449 15.9078 20.5233 14.2383Z" /></SVG>
                        <div style={{ fontSize: "25px", fontWeight: "500", color: "#444444", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                            <Countup prefix="+" suffix=" Practice Tests" style={{ paddingRight: "8px" }} end={1000} duration={2} />
                        </div>
                    </FContainer>}
                    {animateSeg2 && <FContainer>
                        <SVG order={"3s"} width="110" height="95" viewBox="0 0 23 29" fill="none" xmlns="https://www.w3.org/2000/svg">
                            <path d="M3.375 1H14.1084L21.5833 8.22838V25.3567C21.5833 25.9104 21.3331 26.4414 20.8877 26.833C20.4423 27.2245 19.8382 27.4444 19.2083 27.4444H3.375C2.74511 27.4444 2.14102 27.2245 1.69562 26.833C1.25022 26.4414 1 25.9104 1 25.3567V3.08772C1 2.53402 1.25022 2.003 1.69562 1.61148C2.14102 1.21996 2.74511 1 3.375 1V1Z" stroke="#5BCAD6" stroke-width="2" stroke-linejoin="round" />
                            <path d="M4.16675 19.6182H18.4167" stroke="#5BCAD6" stroke-width="2" stroke-linecap="round" />
                            <path d="M4.16675 23.5347H13.6667" stroke="#5BCAD6" stroke-width="2" stroke-linecap="round" />
                            <path d="M4.16675 15.1943L8.12508 6.44434L12.0834 15.1943M5.15633 13.0068H11.0938" stroke="#5BCAD6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M16.0417 11.5972V15.9722" stroke="#5BCAD6" stroke-width="2" stroke-linecap="round" />
                            <path d="M13.6667 13.7847H18.4167" stroke="#5BCAD6" stroke-width="2" stroke-linecap="round" />
                        </SVG>

                        <div style={{ fontSize: "25px", fontWeight: "500", color: "#444444", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                            <Countup prefix="+" suffix=" Exams" style={{ paddingRight: "8px" }} end={300} duration={2} />
                        </div>
                    </FContainer>}
                </Segment3>
                {windowDimensions.width > 1000 && <Segment4>
                    <Col lg={{ span: 12, offset: 0 }} style={{ backgroundColor: "#5BCAD6" }}></Col>
                    <div style={{ position: "absolute", width: "700px", top: "-12vh", left: "10%" }}>
                        <MidPic>
                            <img src={HomeImage1}></img>
                            <div style={{ width: "100%", height: "100%", backgroundColor: "rgba(60, 60, 60, 0.7)", display: "flex", flexDirection: "column", padding: "5vh 0 0 3vw" }}>
                                <div style={{ fontSize: "70px", fontWeight: "200", color: "white", zIndex: "1" }}>Shape Your</div>
                                <div style={{ fontSize: "70px", lineHeight: "70px", fontWeight: "700", color: "white", zIndex: "1" }}>Future</div>
                            </div>
                        </MidPic>
                    </div>

                    <Col lg={{ span: 12, offset: 0 }} style={{ backgroundColor: "white", display: "flex",color:"#3c3c3c", padding: "30px 40px 30px 30px",gap:"15px" ,flexDirection:"column" }}>
                        <div style={{ fontSize: "30px", fontWeight: "500" }}>
                            What makes us one of the top rated Online Training companies
                        </div>
                        <div style={{ fontSize: "21px", fontWeight: "300" }}>
                        Accordingly to our research and personal experience, even senior-level Project Managers tend to feel 
                        anxiety and self-doubt after deciding to take PMI certification. These emotions are caused by the uncertainty 
                        that exists around PMI certification and the lack of high-quality preparation materials. But what if, you can 
                        change the rules and get access to high-quality material? What if, you can change the amount of uncertainty that
                         goes along with PMI certification? These were two main issues that we wanted to address in our product. Therefore,
                          in our online courses, practice tests, and exams we are using only the latest available information and 
                        test question to keep our users prepared for any surprises during taking the exam.
                        </div>
                    </Col>
                </Segment4>}
                <Segment5>
                    <img src={HomeImage2}></img>
                    <div style={{ fontSize: "60px", lineHeight: "55px", color: "white" }}>Why join us?</div>
                    <div style={{ fontSize: "25px", color: "white", textAlign: "center", margin: "0 6vw 0 6vw", fontWeight: "300" }}>
                        Our programs were developed in collaboration with world-class experts in Project Management,
                     PMI acknowledged Project Managers, and PMP certificated Project Managers.
                    </div>
                    <WButton shape="round" size="lg">Read more</WButton>
                </Segment5>
                <Segment6 ref={containerRef}>
                    <div>
                        <BackRec1></BackRec1>
                        <BackRec2></BackRec2>
                    </div>
                    <div style={{ display: "flex", gap: "10px", fontSize: "30%", lineHeight: "60px", fontWeight: "100" }}>What <div style={{ fontWeight: "600", color: "#5BCAD6" }}>Students</div> Say</div>
                    <Row style={{ marginTop: "4vh", minHeight: "292px", justifyContent: "space-around" }} >
                        <Slide {...(renderReviews ? { timeout: 2000 } : {})}
                            direction="left" in={renderReviews} mountOnEnter unmountOnExit container={containerRef.current}>
                            <Comment1 xs={{ span: 24, offset: 0 }} lg={{ span: 12, offset: 10 }}>

                                <div style={{
                                    height: "100%", backgroundColor: "#F0F0F0", display: "flex",
                                    flexDirection: "column", gap: "10px", justifyContent: "center", padding: "20px 15px 20px 40px"
                                }}>
                                    <div style={{ color: "#444444", fontSize: "25px", fontWeight: "600", textAlign: "right" }}>{reviews[count].reviewTitle}</div>
                                    <div style={{ "fontSize": "16px", "fontWeight": "400", "color": "rgba(49, 49, 49, 1)", textAlign: "right" }}>
                                        {reviews[count].reviewText}
                                    </div>
                                    <Rating sx={{ alignSelf: "end" }} precision={0.5} readOnly name="size-small" value={reviews[count].rate} size="small" />
                                    <div style={{ fontSize: "18px", fontWeight: "600", color: "#6c6c6c", textAlign: "right" }}>{reviews[count].userName}</div>
                                </div>
                            </Comment1>
                        </Slide>
                    </Row>
                    <Row style={{ marginTop: "4vh", minHeight: "292px" }}>
                        <Slide {...(renderReviews ? { timeout: 2000 } : {})}
                            direction="right" in={renderReviews} mountOnEnter unmountOnExit container={containerRef.current}>
                            <Comment2 xs={{ span: 24, offset: 0 }} lg={{ span: 12, offset: 0 }}>
                                <div style={{
                                    height: "100%", backgroundColor: "#F0F0F0", display: "flex",
                                    flexDirection: "column", gap: "10px", justifyContent: "center", padding: "20px 30px 20px 15px"
                                }}>
                                    <div style={{ color: "#444444", fontSize: "25px", fontWeight: "600" }}>{reviews[count + 1].reviewTitle}</div>
                                    <div style={{ width: "95%", "fontSize": "16px", "fontWeight": "400", "color": "rgba(49, 49, 49, 1)" }}>
                                        {reviews[count + 1].reviewText}
                                    </div>
                                    <Rating precision={0.5} readOnly name="size-small" value={reviews[count + 1].rate} size="small" />
                                    <div style={{ fontSize: "18px", fontWeight: "600", color: "#6c6c6c" }}>{reviews[count + 1].userName}</div>
                                </div>
                            </Comment2>
                        </Slide>
                    </Row>
                    <div style={{ display: "flex", gap: "15px" }}>
                        <RButton onClick={() => reviewsLoop("previous")} shape="circle" size="lg"><LeftOutlined style={{ fontSize: "20px" }} /></RButton>
                        <RButton onClick={() => reviewsLoop("next")} shape="circle" size="lg"><RightOutlined style={{ fontSize: "20px" }} /></RButton>
                    </div>
                </Segment6>
                <Segment7>
                    <div style={{ display: "flex", gap: "10px", fontSize: "30%", lineHeight: "60px", fontWeight: "100", marginBottom: "20px", color: "#444444", width: "100%", alignItems: "baseline", justifyContent: "center" }}>
                        Our<div style={{ fontWeight: "500", color: "#5BCAD6" }}>Happy</div>Customers</div>
                    <Splide
                        options={{
                            type: 'loop',
                            perPage: 5,
                            perMove: 1,
                            speed: 1000,
                            interval: 2000,
                            pauseOnHover: true,
                            breakpoints: {
                                530: {
                                    perPage: 1,
                                },
                                640: {
                                    perPage: 2,
                                },
                                840: {
                                    perPage: 3,
                                },
                            },
                            height: '200px',
                            autoplay: true,
                            gap: '45px',
                            arrows: false,
                            pagination: false,
                        }}
                    >
                        {
                            carouselSvgs.map(svg => (
                                <SplideSlide style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    {svg}
                                </SplideSlide>

                            ))
                        }

                    </Splide>
                </Segment7>
                <Segment8 id='contactus'>
                    <SubSegment8 left={0} bottom={0} />
                    <SubSegment8 right={0} bottom={0} transform={"scaleX(-1)"} />
                    <SubSegment8 top={0} right={0} transform={"scaleX(-1) scaleY(-1)"} />
                    <SubSegment8 top={0} left={0} transform={"scaleY(-1);"} />
                    <Col xs={{ span: 24, offset: 0 }} lg={{ span: 10, offset: 0 }}>
                        <div style={{ color: "#5BCAD6", fontWeight: "500", fontSize: "35px", lineHeight: "35px", marginTop: "20px" }}>Contact Us</div>
                        <MyForm
                            requiredMark={'optional'}
                            layout="vertical"
                            form={form}
                            name="register"
                            onFinish={onFinish}
                            scrollToFirstError
                        >
                            <Form.Item
                                style={{ marginBottom: 25, marginTop: 30 }}
                                name="fullName"
                                label="Full Name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Full Name',
                                    },
                                ]}
                            >
                                <Input placeholder="Enter your Full Name" style={{ boxShadow: "1px 3px 5px 1px rgba(0, 0, 0, 0.12)", borderRadius: "6px", height: "36px" }} />
                            </Form.Item>
                            <Form.Item
                                style={{ marginBottom: 25 }}
                                name="email"
                                label="Email Address"
                                rules={[
                                    {
                                        type: 'email',
                                        message: 'The input is not valid E-mail!',
                                    },
                                    {
                                        required: true,
                                        message: 'Please input your E-mail!',
                                    },
                                ]}
                            >
                                <Input placeholder="Enter E-mail Subject" style={{ boxShadow: "1px 3px 5px 1px rgba(0, 0, 0, 0.12)", borderRadius: "6px", height: "36px" }} />
                            </Form.Item>
                            <Form.Item
                                style={{ marginBottom: 25 }}
                                name="subject"
                                label="Subject"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your message Subject!',
                                    },
                                ]}
                            >
                                <Input placeholder="Enter your E-mail" style={{ boxShadow: "1px 3px 5px 1px rgba(0, 0, 0, 0.12)", borderRadius: "6px", height: "36px" }} />
                            </Form.Item>

                            <Form.Item
                                style={{ marginBottom: 45 }}
                                name="message"
                                label="Message"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Message!',
                                    },
                                ]}
                            >
                                <Input.TextArea maxLength={150} style={{ boxShadow: "1px 3px 5px 1px rgba(0, 0, 0, 0.12)", height: "150px", borderRadius: "6px" }} />
                            </Form.Item>

                            <Form.Item style={{ marginBottom: 5 }} >{
                                <WButton style={{ width: "100px", borderRadius: "200px", boxShadow: "1px 3px 5px 1px rgba(0, 0, 0, 0.12)" }} size="lg" htmlType="submit">
                                    Send
                                </WButton>
                            }
                            </Form.Item>
                        </MyForm>
                    </Col>
                    <Col2 xs={{ span: 24, offset: 0 }} lg={{ span: 11, offset: 0 }} style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
                        <div style={{ color: "white", fontWeight: "600", fontSize: "100%", lineHeight: "120px" }}>ENGAGE & <br /> EXPERINCE</div>
                        <div style={{ color: "white", display: "flex", flexDirection: "column", gap: "25px", fontSize: "20px", fontWeight: "200" }}>
                            <div style={{ display: "flex", gap: "15px" }}>
                                <BsPhone style={{ width: "30px", height: "30px", color: "#5BCAD6" }}></BsPhone>
                                <div>+971 55 409 0055</div>
                            </div>
                            <div style={{ display: "flex", gap: "15px" }}>
                                <HiOutlineMail style={{ width: "30px", height: "30px", color: "#5BCAD6" }}></HiOutlineMail>
                                <div>info@exporagenius.com</div>
                            </div>
                            <div style={{ display: "flex", gap: "15px" }}>
                                <RiHome3Line style={{ width: "30px", height: "30px", color: "#5BCAD6" }}></RiHome3Line>
                                <div>FoRK 0242, Compass Building, A Shohada Road, <br />AL Hamra Industrial Zone-F2,Ras A Khaimah, United Arab Emirates</div>
                            </div>
                        </div>
                    </Col2>
                </Segment8>
            </MainContainer>
            <Footer></Footer>
        </div>
    );
}
const CrButton= styled(Button)`
font-weight: 600;
background-color: #444444;
border-color: #444444;
color: white;
&:hover{
    animation: mmm166 0.5s;
    animation-fill-mode: forwards;
}
@keyframes mmm166 {
    0% {
    color:white ;
    background-color: #444444;
    border-color: #444444;
   }
     
   100% {
    color: #444444;
    background-color: white;
    border-color: white;
   }
}
`
const MyForm = styled(Form)`
&>*>*>*{
    color:white !important;
}
`
const Col2 = styled(Col)`
font-size: clamp(65px, 5vw, 90px);
`
const Segment8 = styled(Row)`
padding:8vh 4vw 8vh 4vw;
position: relative;
background-color: #343434;
min-height: 720px;
backdrop-filter: blur(5px);
overflow: hidden;
flex-wrap: wrap-reverse;
justify-content: space-between;
`;
const SubSegment8 = styled.div`
position: absolute;
bottom: ${props => props.bottom};
left: ${props => props.left};
top: ${props => props.top};
right: ${props => props.right};
width: 0;
height: 0;
border-top: 17vw solid transparent;
border-left: 17vw solid #303030;
border-bottom: 0px solid transparent;
transform: ${props => props.transform};
filter: blur(2px);
`;
const Segment7 = styled.div`
margin: 10vh 0 0vh 0;
padding:25px 4vw 0 4vw;
background-color: #F3F3F3;
height: 320px;
font-size: clamp(110px, 20vw, 180px);
`;
const BackRec1 = styled.div`
position: absolute;
width: 1250.79px;
height: 1084.59px;
left: 1150px;
top: -75px;
border: 3px solid #3CA9E7;
box-sizing: border-box;
transform: rotate(56.97deg);
`
const BackRec2 = styled.div`
position: absolute;
width: 1250.79px;
height: 1084.59px;
right: 1100px;
bottom: -120px;
border: 3px solid #3CA9E7;
box-sizing: border-box;
transform: rotate(-123.03deg);

`
const Comment1 = styled(Col)`
display: flex;
min-height: 232px;
box-shadow: 0px 4px 44px rgba(0, 0, 0, 0.05);
border-radius:  186px  0px 0px 0px;
overflow: hidden;
background-color: black;
`;
const Comment2 = styled(Col)`
display: flex;
min-height: 232px;
box-shadow: 0px 4px 44px rgba(0, 0, 0, 0.05);
border-radius:  0px  0px 186px 0px;
overflow: hidden;
background-color: black;
`;
const Segment6 = styled.div`
    margin: 6vh 0 4vh 0;
    padding:0 4vw 0 4vw;
    display: flex;
    flex-direction: column;
    gap: 25px;
    align-items: center;
    overflow: hidden;
    position: relative;
    font-size: clamp(110px, 20vw, 180px);
`;
const MainContainer = styled.div`
  
`;
const SVG = styled.svg`
  animation: ${props => props.order} ${fadeInAnimation};
`;
const MidPic1 = styled.div`
background-color: #3c3c3c;
//background-blend-mode: multiply;
overflow: hidden;
    position: relative;
    &>img{  
    height: 125%;
    position: absolute;
    top: -9999px;
    left: -9999px;
    right: -9999px;
    bottom: -9999px;
    margin: auto;
    
    }
`;
const MidPic = styled.div`
//background-color: #3c3c3c;
//background-blend-mode: multiply;
width: 100%;
height:100%;
overflow: hidden;
    position: relative;
    &>img{  
    width:100%;
    height: 100%;
    position: absolute;
    top: -9999px;
    left: -9999px;
    right: -9999px;
    bottom: -9999px;
    margin: auto;
    
    }
`;

const ColAni = styled(Col)`
display: flex;
justify-content: center;
flex-direction: column;
  animation: 2s ${fadeInAnimation};
  @media (max-width: 1000px ) and (min-width: 240px) {
    align-items: center;
    text-align: center;
    &>div{
        text-align: center;
    }
  }
  font-size: clamp(60px, 6.5vw, 120px);
`;
const Carousel1 = styled(Carousel)`
  @media (max-width: 632px) {
    visibility: hidden;
  }
  @media (max-width: 1000px) {
    min-width: 400px;
    max-height:300px;
  }
  @media (min-width: 1000px) {
    min-width: 600px;
    max-height:450px;
  }
`;

const Header = styled(Row)`
@media (max-width: 1000px) {
    align-items: center;
}
min-height: 80vh;
justify-content: center;
margin:0 4vw 4vh 4vw;
flex-wrap: wrap-reverse;
`;
const Pic = styled.div`
@media (max-width: 1000px) {
    min-height: 300px;
}
  height: 100%;
  min-height: 350px;
  min-width: 300px;
  position: relative;
    overflow: hidden;
    position: relative;
    animation: 3s ${fadeInAnimation};
    &>img{  
    width:100%;
    min-width: 300px;
    position: absolute;
    top: -9999px;
    left: -9999px;
    right: -9999px;
    bottom: -9999px;
    margin: auto;
    }
`;
const Segment2 = styled(Row)`
  align-items: center;
  margin:2vh 4vw 0vh 4vw;
  justify-content: space-between;
  flex-wrap: wrap-reverse;
  gap:10px;
  padding: 5vh 3vw 5vh 3vw;
  font-size: clamp(80px, 8vw, 120px);
`;
const Segment3 = styled(Row)`
  justify-content: center;
  display: flex;
  min-height: 180px;
  padding: 8vh 4vw 8vh 4vw;
  align-items: center;
  background-color: #F3F3F3;
  gap: 2vw;
`;
const Segment4 = styled(Row)`
@media (min-width: 1000px) {
    justify-content: center;
  height: 550px;
  width: 100%;
  position: relative;
  margin: 20vh 0vw 8vh 0vw;
  align-items: center;
  &> *{
      height: 100%;
  }
}
@media (max-width: 1000px){
    visibility: hidden;
    width: 0px;
}
  
`;
const Segment5 = styled.div`
height: clamp(600px, 70vh, 750px);
width: 100%;
gap: 35px;
overflow: hidden;
position: relative;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
&>img{  
    height: 100%;
    position: absolute;
    top: -9999px;
    left: -9999px;
    right: -9999px;
    bottom: -9999px;
    margin: auto;
    z-index: -1;
}
`;
const FContainer = styled.div`
border-radius: 5px;
width:320px;
height: 180px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
gap: 1vw;
font-size: 22px;
`
const WButton = styled(Button)`
height: 45px;
font-weight: 600;
color: #444444;
&:hover{
    animation: mmm1 0.5s;
    animation-fill-mode: forwards;
}
@keyframes mmm1 {
    0% {
        color: #444444;
    background-color: white;
    border-color: white;
   }
     
   100% {
    color: white;
    background-color: #444444;
    border-color: #444444;
   }
}
`
const RButton = styled(Button)`
width: 55px;
height: 55px;
font-weight: 600;
color: #444444;
&:hover{
    animation: mmm1 0.5s;
    animation-fill-mode: forwards;
}
@keyframes mmm1 {
    0% {
        color: #444444;
    background-color: white;
    border-color: white;
   }
     
   100% {
    color: white;
    background-color: #444444;
    border-color: #444444;
   }
}
`