import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchPracticeTestsSuccess, fetchPurchasedPracticeTests, selectedPracticeTest } from '../../Redux/Actions/practiceTestsActions';
import noImage from "../../Images/noImage.png";
import { Row, Col, Typography, Button, Input, Affix, List, Skeleton, Card, Avatar } from "antd";
import Rating from '@mui/material/Rating';
import { PaperClipOutlined } from "@ant-design/icons"
import Navbar from "../../Components/AppNavbar/Navbar"
import Footer from "../../Components/Footer/Footer"
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { addProduct, removeProduct } from '../../Redux/Actions/CartActions';

const options = { year: 'numeric', month: 'long', day: 'numeric' };
const { Paragraph } = Typography;
const { Search } = Input;
function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

export default function SelectedTest() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = useLocation();
  const [toggleDes, setToggleDes] = useState(true);
  const [showDesButton, setShowDesButton] = useState(false);
  const [applyingCoupon, setApplyingCoupon] = useState(false);
  const [initLoadingReviews, setInitLoadingReviews] = useState(false);
  const [loadingReviews, setLoadingReviews] = useState(false);
  const productsInCart = useSelector(state => state.cart.productsWithID.filter(x => x.productType === "practiceTest"));
  const [addedToCart, setAddedToCart] = useState(productsInCart.findIndex(x => x.productID === state.testID) !== -1)
  const purchasedPracticeTestsIDs= useSelector(state=>state.allPracticeTests.purchasedPracticeTestsIDs)
  const [purchased, setPurchased]= useState(true)
  const [reviews, setReviews] = useState([{
    userName: "john Doe",
    userID: "456464",
    reviewRate: "4",
    reviewText: "great test!",
    reviewDate: new Date(),
    reviewValue: 5,
  },
  {
    userName: "jack Doe",
    userID: "45646433",
    reviewRate: "3",
    reviewText: "great!",
    reviewDate: new Date(),
    reviewValue: 3,
  },
  {
    userName: "mike Doe",
    userID: "45646433",
    reviewRate: "3",
    reviewText: "great!",
    reviewDate: new Date(),
    reviewValue: 2.5,
  }]);
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  const test = useSelector(state => state.selectedPracticeTest)
  const auth = useSelector(state => state.auth)
  const relatedTests = useSelector(state => state.allPracticeTests.practiceTests);
  useEffect(() => {
    if (!state || !state.testID) navigate(-1)
  }, [])
  useEffect(() => {
    dispatch(fetchPurchasedPracticeTests(auth.userData._id))
  }, [auth.loggedIn])
  
  useEffect(() => {
    if(purchasedPracticeTestsIDs){
      //console.log(purchasedPracticeTestsIDs.includes(state.testID))
      setPurchased(purchasedPracticeTestsIDs.includes(state.testID))
    }
  }, [purchasedPracticeTestsIDs])
  
  useEffect(() => {
    dispatch(selectedPracticeTest(state.testID))
    dispatch(fetchPracticeTestsSuccess());
  }, []);
  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }
    //console.log(windowDimensions)
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [windowDimensions]);
  //console.log(relatedTests);
  const loadMoreReviews = () => {
    setReviews([...reviews, ...new Array(2).fill({ loading: true })])
    //console.log(reviews);
    setTimeout(() => {
      //reviews.splice(-1, 2)
      setReviews([...reviews, {
        userName: "john Doe",
        userID: "456464",
        reviewRate: "4",
        reviewText: "great test!",
        reviewDate: new Date(),
        loading: false,
        reviewValue: 3.5,
      }, {
        userName: "john Doe",
        userID: "456464",
        reviewRate: "4",
        reviewText: "great test!",
        reviewDate: new Date(),
        loading: false,
        reviewValue: 4.5,
      }])
      //console.log(reviews);
    }, 1000);
  }

  const loadMore =
    !initLoadingReviews && !loadingReviews ? (
      <div
        style={{
          textAlign: 'center',
          marginTop: 10,
          height: 32,
          lineHeight: '32px',
        }}
      >
        <Button onClick={() => { loadMoreReviews() }}>loading more</Button>
      </div>
    ) : null;
  const SideColumn = test.testLoaded && !purchased ?
    <div style={{ display: "flex", flexDirection: "column", padding: "25px", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.16)", gap: 10 }}>
      <div style={{ fontSize: "18px", color: "#444444" }}>
        <div style={{ fontSize: "23px", fontWeight: "600", marginBottom: 5 }}>What You'll Get</div>
        <ul style={{ marginBottom: 40 }}>
          <li>{test.testExamsIDs.length} Certified Exams</li>
          <li>Full lifetime access</li>
          <li>Certificate of completion</li>
        </ul>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center" }}>
        <div style={{ fontSize: "30px", fontWeight: "600", color: "#444444" }}>
          {`$${test.testPrice -1}.99`}
        </div>
        <TButton onClick={() => setApplyingCoupon(true)} style={{ fontSize: "17px", fontWeight: "500", color: "#444444", textDecoration: "underline" }}>
          Apply Coupon
        </TButton>
      </div>
      {applyingCoupon && <div><div style={{ fontSize: "17px", fonWeight: "400", color: "#969696", marginBottom: "30px" }}>
        0% off
      </div>
        <Search
          style={{ margin: "0px 0 15px 0" }}
          placeholder="Enter Coupon"
          allowClear
          enterButton={
            <Button1 type="primary" >
              Apply
            </Button1>}
          size="large"
          onSearch={null}
        /></div>}
      <div style={{ fontSize: "13px", fonWeight: "300", color: "#969696", alignSelf: "center", marginBottom: "5px" }}>
        30-Day Money-Back Guarantee
      </div>
      {addedToCart ? 
      <Button2 
      onClick={() => {
        setAddedToCart(false)
        dispatch(removeProduct("practiceTest", state.testID))
        }} type="primary" size="large">
        Remove From Cart
      </Button2> :
        <Button2   onClick={() => {
          setAddedToCart(true)
          dispatch(addProduct("practiceTest", state.testID))
        }} type="primary" size="large">
          Add to Cart
        </Button2>}
      <Button1  onClick={() => {
        auth.loggedIn ? navigate("/cart/checkout", {state:{
          product:[{
            productType: "practiceTest",
            product: test,
          }]
        }}) : navigate("/login", {
          state: {
            previousPage: location.pathname,
          }
        })
      }} type="primary" size="large">
        Buy Now
      </Button1>
    </div> : <div></div>
  if (test.testLoaded) return (
    <div>
      <Navbar></Navbar>
      <MainContainer>
        <Section1>
          <Background>
            <img src={test.testImageID ? `http://localhost:5000/image/${test.testImageID}` : noImage}></img>
            <Fill></Fill>
          </Background>
          <Row style={{ position: "absolute", top: 0, padding: "8vh 0 0 4vw", width: "100%" }}>
            <Col lg={{ span: 14 }} style={{ display: "flex", flexDirection: "column", color: "white", gap: 22 }}>
              <div style={{ fontSize: "50px", fontWeight: "300", lineHeight: "50px" }}>{test.testTitle}</div>
              <div style={{ fontSize: "20px", fontWeight: "300" }}>{test.testBrief}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 15, color: "#C4C4C4", fontWeight: 200 }}><Rating name="read-only" value={4} readOnly /><div>{`(5,000 ratings)`}</div></div>
              <div style={{ display: "flex", alignItems: "center", gap: 30, fontWeight: 200, flexWrap: "wrap" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <svg width="23" height="23" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 25C6.37258 25 1 19.6274 1 13C1 6.37258 6.37258 1 13 1C19.6274 1 25 6.37258 25 13C25 17.1606 22.8826 20.8266 19.6667 22.9793L13 14.3333V6.33333" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  </svg> {`Created On ${new Date(test.testCreatedDate).toLocaleDateString("en-US", options)}`}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <svg width="24" height="24" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M25.4968 13.6459L25.919 13.7109L25.8996 13.2841C25.7789 10.6284 24.6924 8.22467 23.0202 6.19417L22.7398 5.85377L22.472 6.20406C20.9984 8.13101 18.834 9.7311 16.1938 10.879L15.8551 11.0263L16.0203 11.3565C16.1164 11.5487 16.2098 11.7276 16.2993 11.8992C16.55 12.3792 16.7705 12.8015 16.9346 13.294L17.0264 13.5693L17.314 13.5301C19.8463 13.1848 22.4958 13.1842 25.4968 13.6459ZM21.28 5.11L21.482 4.84066L21.2207 4.62836C19.2927 3.06183 16.765 2.1 14 2.1C13.0372 2.1 12.0754 2.22039 11.1151 2.46045L10.6136 2.58583L10.9163 3.00492C12.4226 5.09063 13.6974 7.17649 14.8569 9.37968L15.0075 9.66568L15.3045 9.53837C17.7945 8.47124 19.8338 7.03822 21.28 5.11ZM9.02803 3.52073L8.84941 3.28715L8.58853 3.42281C5.58567 4.98429 3.30113 7.7489 2.45977 11.2345L2.35215 11.6804L2.8106 11.6665C6.67095 11.5495 10.089 11.1984 12.9313 10.3693L13.3426 10.2494L13.1431 9.87032C11.9652 7.63249 10.5537 5.51587 9.02803 3.52073ZM2.45 13.3H2.1V13.65V14C2.1 16.8887 3.18324 19.5326 4.86316 21.5725L5.16972 21.9447L5.42862 21.5379C7.83507 17.7563 11.0356 15.3578 14.9244 14.0997L15.3118 13.9743L15.1297 13.6101C15.0469 13.4444 14.956 13.2753 14.8632 13.1026C14.6741 12.7506 14.4773 12.3842 14.325 12.0033L14.2024 11.6969L13.8893 11.8013C10.7886 12.8349 6.86332 13.3 2.45 13.3ZM6.58923 22.9103L6.4155 23.1795L6.66845 23.3763C9.91279 25.8996 14.239 26.6204 18.2029 25.1789L18.4729 25.0807L18.4293 24.7968C17.9584 21.7361 17.1348 18.796 16.0777 15.9771L15.9638 15.6735L15.6524 15.7639C11.9411 16.8414 8.95995 19.2356 6.58923 22.9103ZM20.0714 23.6242L20.1594 24.1523L20.6079 23.8598C23.3793 22.0524 25.1792 19.1644 25.7779 15.8115L25.8397 15.4654L25.4933 15.4052C22.7867 14.9345 20.4123 14.813 18.1454 15.1709L17.7259 15.2372L17.8711 15.6363C18.8003 18.1917 19.6096 20.853 20.0714 23.6242ZM0.35 14C0.35 6.4933 6.4933 0.35 14 0.35C21.5067 0.35 27.65 6.4933 27.65 14C27.65 21.5067 21.5067 27.65 14 27.65C6.4933 27.65 0.35 21.5067 0.35 14Z" fill="white" stroke="#303030" stroke-width="0.7" />
                  </svg> English
                </div>
              </div>
            </Col>
          </Row>
        </Section1>
        <Section2 style={{ padding: " 4vh 4vw 0 4vw" }}>
          <Col lg={{ span: 13 }} style={{ color: "#3c3c3c", display: "flex", flexDirection: "column", gap: 40 }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Header>Description</Header>
              <Paragraph style={{ fontSize: "20px", margin: "0 0 12px 0", color: "#444444" }} ellipsis={{ rows: toggleDes ? 9 : null, onEllipsis: () => setShowDesButton(true) }}>
                {test.testDescription}
              </Paragraph>
              {showDesButton && <MyButton onClick={() => setToggleDes(v => !v)} >Read{toggleDes ? ' more' : ' less'}</MyButton>}
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Header>What You Will Practice</Header>
              {
                test.whatStudentWillPractice.map(w => (
                  <div style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 18, lineHeight: "25px", margin: "10px 0 10px 0", color: "#444444" }}><PaperClipOutlined style={{ alignSelf: "flex-start", marginTop: "3px" }} />{w}</div>
                ))
              }
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Header>Test Content</Header>
              <ul style={{ marginBottom: 10, display: "flex", gap: 20, padding: "0 0 0 18px", flexWrap: "wrap", color: "#6c6c6c" }}>
                <li>{test.testExamsIDs.length} Exams</li>
                <li>{test.testExams.reduce((sum, x) => sum + x.examQuestionsIDs.length, 0)} Qestions</li>
                <li>{test.testExams.reduce((sum, x) => sum + parseInt(x.examPeriod), 0)} Minutes total Period</li>
              </ul>
              <List
                split
                itemLayout="horizontal"
                dataSource={test.testExams}
                renderItem={item => (
                  <List.Item style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 5 }}>
                    <div style={{ minWidth: "350px", wordWrap: "break-word", fontSize: "16px", fontWeight: 500, color: "#444444" }}>{item.examName}</div>
                    <div>
                      <div></div>
                      <ul style={{ display: "flex", gap: 30, color: "#6c6c6c" }}>
                        <li>{item.examQuestionsIDs.length} Qestions</li>
                        <li>{item.examPeriod} Minutes</li>
                      </ul>
                    </div>
                  </List.Item>
                )}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Header>Related Tests</Header>
              <CSplide
                options={{
                  type: 'loop',
                  perPage: 2,
                  perMove: 1,
                  breakpoints: {
                    530: {
                      perPage: 1,
                    },
                    640: {
                      perPage: 1,
                    },
                  },
                  gap: 15,
                  pagination: false,
                }}
              >
                {
                  relatedTests.map(item => (
                    <SplideSlide style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: 5 }}>
                      <CCard
                        cover={<Image onClick={() => navigate(`/practicetests/${item.testTitle}`, {
                          state: {
                            testID: item.key,
                          }
                        })}
                        ><img alt="example" src={item.testImageID ? `http://localhost:5000/image/${item.testImageID}` : noImage} /></Image>}
                      >
                        <ProductDtails onClick={() => navigate(`/practicetests/${item.testTitle}`, {
                          state: {
                            testID: item.key,
                          }
                        })}>
                          <PTitle>{item.testTitle}</PTitle>
                          <PType>{item.testType}</PType>
                          <Rating size="small" name="read-only" value={4} readOnly />
                          <PPrice>{"$ "}{parseFloat(item.testPrice).toFixed(2)}</PPrice>
                        </ProductDtails>
                      </CCard>
                    </SplideSlide>
                  ))
                }

              </CSplide>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Header>Reviews</Header>
              <List
                className="demo-loadmore-list"
                loading={initLoadingReviews}
                itemLayout="horizontal"
                loadMore={loadMore}
                dataSource={reviews}
                renderItem={item => (
                  <List.Item>
                    <Skeleton avatar title={false} loading={item.loading} active>
                      <List.Item.Meta
                        avatar={<Avatar>Y</Avatar>}
                        title={
                          <div>
                            <div style={{ marginBottom: 5 }}>{item.userName}</div>
                            <div style={{ display: "flex", gap: 15, alignItems: "center" }}>
                              <Rating size="small" name="read-only" value={item.reviewValue} readOnly />
                              <div style={{ color: "#6c6c6c" }}>{new Date(item.reviewDate).toLocaleDateString("en-US", options)}</div>
                            </div>
                          </div>}
                        description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                      />

                    </Skeleton>
                  </List.Item>
                )}
              />
            </div>
          </Col>
          <Col xs={{ span: 24, offset: 0 }} lg={{ span: 7, offset: 3 }} style={{ marginBottom: "20px" }}  >
            {windowDimensions.width > 1000 ? <Affix offsetTop={80} >
              {SideColumn}
            </Affix> : SideColumn}
          </Col>
        </Section2>
      </MainContainer>
      <Footer></Footer>
    </div>
  );
  else return <div></div>
}
const CSplide = styled(Splide)`
padding: 50px;
&>*>*{
  background-color: white;
}
&>*>*>*{
  width: 260px !important
}
`
const Header = styled.div`
width: 100%;
font-size: 40px;
color:#444444;
font-weight: 400;
margin-bottom: 10px;
`
const MyButton = styled(Button)`
height: 42px;
width: 120px;
font-weight: 600;
color: #444444;
&:hover{
    animation: mmm1333 0.5s;
    animation-fill-mode: forwards;
}
@keyframes mmm1333 {
    0% {
        color: #444444;
    background-color: white;
   }
     
   100% {
    color: white;
    background-color: #444444;
    border-color: #444444;
   }
}
`
const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin-bottom: 8vh;
`
const Section1 = styled.div`
  position: relative;
  min-height: 70vh;
  width: 100%;
`
const Section2 = styled(Row)`
flex-wrap: wrap-reverse;
`
const Fill = styled.div`
height: 100%;
width: 100%;
position: absolute;
background: linear-gradient(90deg, #303030 35%, rgba(48, 48, 48,0.95), rgba(48, 48, 48,0.8), rgba(48, 48, 48,0.3));
`
const Background = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
&>img{
  position: absolute;
  right: 0;
  height: 100%;
}
`
const Button1 = styled(Button)`
background-color: #444444;
border-color: #444444;
&:hover{
    animation: btnmove11111 0.8s;
    animation-fill-mode: forwards;
    
}

@keyframes btnmove11111 {
    0% {
      color: white;
        background-color: #444444;
   }
     
   100% {
     color: #444444;
    background-color: white;
    border-color: #444444;
   }
}`
const Button2 = styled(Button)`
background-color: #5BCAD6;
border-color: #5BCAD6;
&:hover{
    animation: btnmove22 0.8s;
    animation-fill-mode: forwards;
}

@keyframes btnmove22 {
    100% {
        color: #444444;
      background-color: white;
    border-color: #444444;
   }
     
   0% {
     color: white;
    background-color: #5BCAD6;
    border-color: #5BCAD6;
   }
}
`
const TButton = styled.div`
color: #444444;
&:hover{
  cursor: pointer;
    animation: tbtnmove 0.8s;
    animation-fill-mode: forwards;
}

@keyframes tbtnmove {
    0% {
      color: #444444;
   }
     
   100% {
    color: #5BCAD6;
   }
}
`
const CCard = styled(Card)`
border-style: solid;
border-radius: 5px; 
width: 260px; 
min-height: 220px;
box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.16);
cursor: pointer;
&>*:nth-child(2){
  padding: 10px;
  background-color: #F9F9F9;
}
`

const Image = styled.div`
position: relative;
 width: 100%;
 height:15.5vh;
 overflow: hidden;
 border-radius:5px 5px 0 0;
 & > img{
    width:100%;
    position: absolute;
    top: -9999px;
    left: -9999px;
    right: -9999px;
    bottom: -9999px;
    margin: auto;
 }
`
const ProductDtails = styled.div`
 display:flex;
 flex-direction: column;
 gap: 10px;
 width: 100%;
`
const PTitle = styled.div`
 font-size: 14px;
 font-weight: 600;
 width: 100%;
 word-wrap: break-word;
 margin-bottom: 3px;
`
const PPrice = styled.div`
font-size: 13px;
 font-weight: 600;
 
`
const PType = styled.div`
 text-decoration: underline;
 font-size: 10px;
 font-weight: 400;
`