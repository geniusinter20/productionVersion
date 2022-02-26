import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import "./Cart.css";
import { Row, Col, Tag, Tooltip, Empty, Button, Input, Card } from 'antd';
import NavBar from '../../Components/AppNavbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import Rating from '@mui/material/Rating';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { loadCart, removeProduct } from '../../Redux/Actions/CartActions';
import Grow from '@mui/material/Grow';
import { Typography } from '@mui/material';
import emptyCart from "../../Images/emptyCart.png"
import { Navigate, useNavigate } from 'react-router-dom';
import PuffLoader from "react-spinners/PuffLoader";
import noImage from "../../Images/noImage.png";
import { useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet';

const { Search } = Input;
function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}

export default function Cart() {
    const dispatch = useDispatch()
    const location = useLocation();
    const cart = useSelector(state => state.cart)
    const auth = useSelector(state => state.auth)
    const [show, setShow] = useState([])
    const [total, setTotal] = useState(0)
    const [products, setProducts] = useState([])
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
    const navigate = useNavigate()
    useEffect(() => {
        dispatch(loadCart())
    }, []);
    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }
        //console.log(windowDimensions)
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [windowDimensions]);
    useEffect(() => {
        if (cart.cartLoaded) {
            setShow(new Array(cart.productsWithID.length).fill(true))
            setProducts(cart.products)
            if (cart.productsWithID.length >= 0) calculateTotal(cart.products)
        }
        //console.log("cart", cart.products)
    }, [cart])
    const calculateTotal = (products) => {
        var total = 0;
        products.forEach(p => {
            //console.log(products);
            total += getproductPrice(p.product)
            //console.log(getproductPrice(p.product));
        })
        setTotal(total)
    }
    const getproductPrice = (product) => {
        var Priceprefix = null;
        Object.keys(product).forEach(k => {
            if (k.match(/[^.]*(?:Price)/g)) Priceprefix = k.match(/[^.]*(?:Price)/g)[0]
        })
        return product[Object.keys(product).filter(k => k === Priceprefix)[0]]
    }
    const drawComponent = (productType, product) => {
        switch (productType) {
            case "practiceTest":
                return (
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <Image onClick={() => navigate(`/practicetests/${product.testTitle}`, {
                            state: {
                                testID: product.key,
                            }
                        })}><img alt="example" src={product.testImageID !== "no image" ? `https://exporagenius.com:5000/image/${product.testImageID}` : noImage} /></Image>
                        <Information onClick={() => navigate(`/practicetests/${product.testTitle}`, {
                            state: {
                                testID: product.key,
                            }
                        })}>
                            <ProductName>{product.testTitle}</ProductName>
                            <Tooltip title={product.testBrief}>
                                <Typography variant="caption" style={{ maxWidth: "290px", fontSize: "13px", color: "#6C6C6C" }} component="div" noWrap={true}>
                                    {product.testBrief}
                                </Typography>
                            </Tooltip>
                            <MyRating><Rating precision={0.5} readOnly name="size-small" value={3.5} size="small" />3.5</MyRating>
                            <Info>
                                <Type color="#f0f0f0">PRACTICE-TEST</Type>
                                <div style={{ color: "#868686", fontWeight: "600" }}>{`${product.testExamsIDs.length} Tests`}</div>
                                <Seperator></Seperator>
                                <div style={{ color: "#868686", fontWeight: "600" }}>{`Valid for ${product.testValidationPeriod} days`}</div>
                            </Info>
                        </Information>
                        <Price>
                            <div>${product.testPrice > 0 ? parseFloat(product.testPrice).toFixed(2) : 0}</div>
                        </Price>
                    </div>
                )
            default:
                <div></div>;
        }
    }
    const drawComponentS = (productType, product, index) => {
        switch (productType) {
            case "practiceTest":
                return (
                    <CCard
                        hoverable
                        cover={<Image1 onClick={() => navigate(`/practicetests/${product.testTitle}`, {
                            state: {
                                testID: product.key,
                            }
                        })}
                        ><img alt="example" src={product.testImageID !== "no image" ? `https://exporagenius.com:5000/image/${product.testImageID}` : noImage} />
                        </Image1>}
                    >
                        <ProductDtails onClick={() => navigate(`/practicetests/${product.testTitle}`, {
                            state: {
                                testID: product.key,
                            }
                        })}>
                            <PTitle>{product.testTitle}</PTitle>
                            <Type color="#f0f0f0">PRACTICE-TEST</Type>
                            <Rating size="small" name="read-only" value={4} readOnly />
                            <PPrice>{"$ "}{parseFloat(product.testPrice).toFixed(2)}</PPrice>
                        </ProductDtails>
                        {
                            <Tooltip title="Remove from Cart">
                                <Button
                                onClick={() => {
                                    var temp = [...show]
                                    temp[index] = false
                                    setShow(temp)
                                    calculateTotal(products.filter(p => p.product.key === product.key))
                                    dispatch(removeProduct("practiceTest", product.key))
                                }}
                                 style={{ position: "absolute", right: "20px", bottom: "13px" }} shape="circle" icon={<DeleteIcon />} />
                            </Tooltip>
                        }
                    </CCard>
                )
            default:
                <div></div>;
        }
    }
    return (
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", gap: "5vh" }}>
            <Helmet>
                <title>Cart</title>
                <meta name="description" content="Genius Cart" />
            </Helmet>
            <NavBar></NavBar>
            <Row style={{ margin: windowDimensions.width > 768 ? "3vh 4vw 3vh 4vw" : "3vh 0 3vh 0", flexWrap: " wrap-reverse", justifyContent: "space-around" }} >
                <Col xs={{ span: 24, offset: 0 }} lg={{ span: 15 }} xl={{ span: 16, offset: 0 }}>
                    <div style={{ margin: windowDimensions.width > 768 ? "0 0 0 0" : "0 0 0 4vw", fontSize: "38px", fontWeight: "300", color: "#444444", marginBottom: 20 }}>
                        Cart
                    </div>
                    {
                        !cart.cartLoaded ? <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <PuffLoader css={"display: block; margin: 0 0 0 0;"} size={75} />
                        </div>
                            :
                            products.length ?
                                <List style={windowDimensions.width>768?{ minWidth: "500px", maxWidth:"800px" }:{ display: "flex", flexWrap:"wrap" ,alignItems: "center", justifyContent: "center", width:"100%"}}>
                                    {
                                        products.map((item, ind) => {
                                            return (
                                                <Grow
                                                    in={show[ind]}
                                                    style={{ transformOrigin: '0 0 0' }}
                                                    {...(show[ind] ? { timeout: 1000 + ind * 500 } : {})}
                                                >
                                                    <Listitem
                                                    style={windowDimensions.width>768?{}:{width: "300px"}}
                                                        secondaryAction={
                                                            windowDimensions.width>768 &&
                                                            <Tooltip title="Remove from Cart">
                                                                <IconButton onClick={() => {
                                                                    var temp = [...show]
                                                                    temp[ind] = false
                                                                    setShow(temp)
                                                                    calculateTotal(products.filter(p => p.product.key === item.product.key))
                                                                    dispatch(removeProduct(item.productType, item.product.key))
                                                                }} className='hi' edge="end" aria-label="delete">
                                                                    <DeleteIcon />
                                                                </IconButton></Tooltip>
                                                        }
                                                        divider={true} alignItems="flex-start" key={1}>
                                                        {windowDimensions.width>768? drawComponent(item.productType, item.product):drawComponentS(item.productType, item.product, ind)}
                                                    </Listitem>
                                                </Grow>
                                            )
                                        }
                                        )

                                    }
                                    {/* <Divider variant="inset" component="li" /> */}
                                </List>
                                : <SEmpty
                                    image={emptyCart}
                                    imageStyle={{
                                        height: 200,
                                    }}
                                    description={
                                        <div>Cart is Empty!</div>
                                    }
                                >
                                    {/* <Button type="primary">Create Now</Button> */}
                                </SEmpty>
                    }
                </Col>

                <Col xs={{ span: 24, offset: 0 }} lg={{ span: 8 }} xl={{ span: 7, offset: 1 }} style={{ marginBottom: "20px" }} >
                    <div style={{ display: "flex", flexDirection: "column", padding: "25px", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.16)" }}>
                        <div style={{ fontSize: "22px", color: "#6c6c6c" }}>
                            Total:
                        </div>
                        <div style={{ fontSize: "35px", fontWeight: "600", color: "#444444" }}>
                            {total > 0 ? `$${parseFloat(total).toFixed(2) }` : 0}
                        </div>
                        <div style={{ fontSize: "17px", fonWeight: "400", color: "#969696", marginBottom: "30px" }}>
                            0% off
                        </div>
                        {/* <MySearch
                            style={{ margin: "0px 0 20px 0" }}
                            placeholder="Enter Coupon"
                            allowClear
                            enterButton={
                                <Button1 type="primary" >
                                    Apply
                                </Button1>}
                            size="large"
                            onSearch={null}
                        /> */}
                        <div style={{ fontSize: "13px", fonWeight: "300", color: "#969696", alignSelf: "center", marginBottom: "10px" }}>
                            30-Day Money-Back Guarantee
                        </div>
                        {products.length > 0 && <Button1 onClick={() => {
                            auth.loggedIn ? navigate("checkout") : navigate("/login", {
                                state: {
                                    previousPage: location.pathname,
                                }
                            })
                        }} type="primary" size="large">
                            Checkout
                        </Button1>}
                    </div>
                </Col>
            </Row>
        </div>
    )
}
const CCard = styled(Card)`
border-style: solid;
border-radius: 5px; 
border-width: 1px;
border-color: rgb(108, 108, 108, 0.3); 
width: 260px; 
min-height: 220px;
&>*:nth-child(2){
  padding: 10px;
}
`
const Image1 = styled.div`
position: relative;
 width: 100%;
 height:150px;
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
const PType = styled.div`
 text-decoration: underline;
 font-size: 10px;
 font-weight: 400;
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
`
const PPrice = styled.div`
font-size: 13px;
 font-weight: 600;
 
`
const SEmpty = styled(Empty)`
display: flex ; 
flex-direction: column ;
align-items: center ;
justify-content: center;
font-size: 20px;
font-weight: 500;
color: #6c6c6c;
&>:nth-child(1){
    margin-right: 42px;
}
`
const Button1 = styled(Button)`
background-color: #444444;
border-color: #444444;
&:hover{
    animation: btnmove 0.8s;
    animation-fill-mode: forwards;
}

@keyframes btnmove {
    0% {
        background-color: #444444;
   }
     
   100% {
    background-color: #5BCAD6;
   }
}

`
const MySearch = styled(Search)`
`

const Listitem = styled(ListItem)`
&>*:nth-child(1){
    width: 100%;
    margin: 1vh 0 1vh 0;
}
`
const Price = styled.div`
font-size: 20px;
font-weight: 600;
  align-self: flex-start;
  margin-left: 2vw;
  color: #6C6C6C;

`
const Image = styled.div`
cursor: pointer;
position: relative;
width: 25%;
max-width: 200px;
 min-height:110px;
 min-width:100px;
 overflow: hidden;
 border-radius:5px 5px 5px 5px;
 margin: 0 10px 0 0;
 border: solid 0.2px #6c6c6c;
 & > img{
    height:100%;
    position: absolute;
    top: -9999px;
    left: -9999px;
    right: -9999px;
    bottom: -9999px;
    margin: auto;
 }
`
const Information = styled.div`
display: flex;
flex-direction: column;
gap: 4px;
align-items: flex-start;
cursor: pointer;
`
const ProductName = styled.div`
font-weight: 500;
font-size: 17px;

`
const MyRating = styled.div`
font-size: 14px;
font-weight: 600;
color: #ffb300;
display: flex;
align-items: center;
gap: 5px;
`
const Info = styled.div`
display: flex;
align-items: center;
gap: 5px;
`
const Seperator = styled.div`
 height: 5px;
  width: 5px;
  background-color: #6C6C6C;
  border-radius: 50%;
  display: inline-block;
`
const Type = styled(Tag)`
font-weight: 500;
color: #262626;
max-width: 110px;
`