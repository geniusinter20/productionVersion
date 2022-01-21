import React, { useEffect, useState, useRef } from 'react'
import { useDispatch } from 'react-redux';
import "./Cart.css";
import { Row, Col, Button, Image } from 'antd';
import NavBar from '../../Components/AppNavbar/Navbar';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Radio from '@mui/material/Radio';
import { BsPaypal } from "react-icons/bs"
import { HiLockClosed } from "react-icons/hi"
import { clearCart } from "../../Redux/Actions/CartActions"
import { useNavigate } from 'react-router-dom';
import noImage from "../../Images/noImage.png"

export default function CheckOut() {
    const paypal = useRef();
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const products = useSelector(state => state.cart.products)
    const [total, setTotal] = useState(0)
    const [selectedValue, setSelectedValue] = React.useState('paypal');
    const [checkingOut, setCheckingOut] = useState(false)

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };
    const getImageID = (product) => {
        var imageidprefix = null;
        Object.keys(product).forEach(k => {
            if (k.match(/[^.]*(?:ImageID)/g)) imageidprefix = k.match(/[^.]*(?:ImageID)/g)[0]
        })
        return product[Object.keys(product).filter(k => k === imageidprefix)[0]]
    }
    const getproductName = (product) => {
        var titleprefix = null;
        Object.keys(product).forEach(k => {
            if (k.match(/[^.]*(?:Title|Name)/g)) titleprefix = k.match(/[^.]*(?:Title|Name)/g)[0]
        })
        return product[Object.keys(product).filter(k => k === titleprefix)[0]]
    }
    const getproductDescription = (product) => {
        var descriptionprefix = null;
        Object.keys(product).forEach(k => {
            if (k.match(/[^.]*(?:Description)/g)) descriptionprefix = k.match(/[^.]*(?:Description)/g)[0]
        })
        return product[Object.keys(product).filter(k => k === descriptionprefix)[0]]
    }
    const getproductPrice = (product) => {
        var Priceprefix = null;
        Object.keys(product).forEach(k => {
            if (k.match(/[^.]*(?:Price)/g)) Priceprefix = k.match(/[^.]*(?:Price)/g)[0]
        })
        return product[Object.keys(product).filter(k => k === Priceprefix)[0]]
    }
    const calculateTotal = (products) => {
        var temp = 0;
        products.forEach(p => {
            switch (p.productType) {
                case "practiceTest":
                    temp += p.product.testPrice;
                    break;
                default:
                    break;
            }
        })
        setTotal(temp)
    }
    const generateItems = () => {
        return products.map(p => {
            switch (p.productType) {
                case "practiceTest":
                    return (
                        {
                            name: getproductName(p.product),
                            description: getproductDescription(p.product),
                            unit_amount: {
                                currency_code: "USD",
                                value: getproductPrice(p.product)
                            },
                            quantity: "1"
                        }
                    )
                default:
                    return null;
            }
        })
    }
    const checkOut = () => {
        setCheckingOut(true)
        window.paypal && window.paypal
            .Buttons({
                createOrder: (data, actions, err) => {
                    return actions.order.create({
                        intent: "CAPTURE",
                        purchase_units: [{
                            description: "Genius Cart Checkout",
                            amount: {
                                currency_code: "USD",
                                value: total,
                                breakdown: {
                                    item_total: {
                                        currency_code: "USD",
                                        value: total
                                    }
                                }
                            },
                            items: generateItems(products),
                            note_to_payer: 'Contact us for any questions on your order.'
                        }],
                    });
                },
                onApprove: async (data, actions) => {
                    const order = await actions.order.capture();
                    if (order.status === "COMPLETED") {
                        navigate("/")
                        dispatch(clearCart())
                    }
                    console.log(order);
                },
                onError: (err) => {
                    console.log(err);
                },
            })
            .render(paypal.current);
    }

    useEffect(() => {
        if (products.length > 0) calculateTotal(products)
    }, [products])

    return (
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", gap: "5vh" }}>
            <NavBar></NavBar>
            <Row style={{ margin: "3vh 4vw 3vh 4vw", flexWrap: " wrap-reverse", justifyContent: "space-around" }} >
                <Col xs={{ span: 24, offset: 0 }} lg={{ span: 12, offset: 0 }} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    <div style={{ fontSize: "38px", fontWeight: "300", color: "#444444", marginBottom: "10px" }}>
                        Checkout
                    </div>
                    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                        <ListItem
                            key={1}
                            secondaryAction={
                                <IconButton edge="end" aria-label="comments">
                                    <BsPaypal />
                                </IconButton>
                            }
                            disablePadding
                            sx={{
                                boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.26)"
                            }}
                        >
                            <ListItemButton role={undefined} onClick={null} dense  >
                                {/* <Checkbox
                                        edge="start"
                                        checked={checked.indexOf(value) !== -1}
                                        tabIndex={-1}
                                        disableRipple
                                        inputProps={{ 'aria-labelledby': labelId }}
                                    /> */}
                                <Radio
                                    checked={selectedValue === 'paypal'}
                                    onChange={handleChange}
                                    value="paypal"
                                    name="radio-buttons"
                                    sx={{
                                        '& .MuiSvgIcon-root': {
                                            fontSize: 19,
                                            color: "#444444"
                                        },
                                    }}
                                />
                                <ListItemText sx={{
                                    '& .MuiListItemText-primary': {
                                        fontSize: 22,
                                    },
                                }}
                                    id={1} primary={`PayPal`}
                                />
                            </ListItemButton>
                        </ListItem>
                        <div style={{ fontSize: "14px", fonWeight: "300", color: "#969696", marginTop: "10px" }}>
                            Other payment Options will be avaliable soon!
                        </div>
                    </List>

                    <div style={{ display: "flex", gap: "10px", boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.16)", width: "100%", padding: "20px", alignItems: "center" }}>
                        <HiLockClosed style={{ width: "60px", height: "100%", color: "#6c6c6c" }} />
                        <div style={{ fontSize: "17px", fonWeight: "300", color: "#444444" }}>
                            In order to complete your transaction, we will transfer you over to PayPal's secure servers.
                        </div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "center", marginTop: "15px", flexDirection: "column" }} ref={paypal}></div>
                    <div style={{ fontSize: "24px", fontWeight: "500", color: "#444444" }}>
                        Order Details</div>
                    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                        {
                            products.map(p => (
                                <ListItem
                                    key={1}
                                    secondaryAction={
                                        <ListItemText edge="end" sx={{
                                            '& .MuiListItemText-primary': {
                                                fontSize: 17,
                                                fontWeight: "500"
                                            },
                                        }}
                                            id={1} primary={`$${getproductPrice(p.product) - 1}.99`}
                                        />
                                    }
                                    sx={{
                                        boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.26)",
                                        padding: "5px",
                                        display: "flex",
                                        gap: "12px",
                                        '&.MuiListItem-root': {
                                            height: "40px"
                                        },

                                    }}
                                >
                                    <Image fallback={noImage} width={39} height={24}
                                        src={`http://localhost:5000/image/${getImageID(p.product)}`}></Image>
                                    <ListItemText sx={{
                                        '& .MuiListItemText-primary': {
                                            fontSize: 17,
                                        },
                                    }}
                                        id={1} primary={getproductName(p.product)}
                                    />

                                </ListItem>
                            ))
                        }
                    </List>
                </Col>

                <Col xs={{ span: 24, offset: 0 }} lg={{ span: 7, offset: 1 }} style={{ marginBottom: "20px" }} >
                    <div style={{ display: "flex", flexDirection: "column", gap: "15px", padding: "25px", maxHeight: "300px", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.16)" }}>
                        <div style={{ fontSize: "30px", color: "#444444" }}>
                            Summary
                        </div>
                        <div style={{ fontSize: "15px", lineHeight: "15px", fontWeight: "500", display: "flex", justifyContent: "space-between", alignItems: "baseline", width: "100%" }}>
                            <div>Original Price:</div>
                            {`$${total - 1}.99`}
                        </div>
                        <Divider light={true} />
                        <div style={{ fontSize: "20px", lineHeight: "18px", fontWeight: "500", color: "#444444", display: "flex", justifyContent: "space-between", alignItems: "baseline", width: "100%" }}>
                            <div>Total:</div>
                            {`$${total - 1}.99`}
                        </div>
                        <div style={{ fontSize: "13px", fonWeight: "300", color: "#969696", alignSelf: "center", marginBottom: "10px" }}>
                            By completing your purchase you agree to these Terms of Service.
                        </div>
                        {!checkingOut && <Button1 onClick={() => checkOut()} type="primary" size="large">
                            Proceed
                        </Button1>}
                        {checkingOut && <Button2 onClick={() => navigate(-1)} type="primary" size="large">
                            Cancel Order
                        </Button2>}
                    </div>
                </Col>
            </Row>
        </div>
    )
}

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
}`
const Button2 = styled(Button)`
background-color: white;
border-color: #444444;
color: #444444;
&:hover{
    animation: btnmove11 0.8s;
    animation-fill-mode: forwards;
    border-color: #444444;
}

@keyframes btnmove11 {
    0% {
        background-color: white;
   }
     
   100% {
    background-color: #444444;
   }
}
`
