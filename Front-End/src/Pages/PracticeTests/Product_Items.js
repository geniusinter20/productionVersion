import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import { Card, Rate, Pagination, Tooltip, Button } from 'antd';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import "./Product_Items.css";
import { addProduct, removeProduct } from "../../Redux/Actions/CartActions";
import PuffLoader from "react-spinners/PuffLoader"
import noImage from "../../Images/noImage.png"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Rating from '@mui/material/Rating';

function Products(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(8);
  const [dataLoaded, setDataLoaded] = useState(false);
  const practiceTests = useSelector(state => state.allPracticeTests.practiceTests);
  const productsInCart = useSelector(state => state.cart.productsWithID.filter(x => x.productType === "practiceTest"));
  const auth = useSelector(state => state.auth);
  const changeCurrentPage = (page) => {
    setCurrentPage(page)
  }
  const addToCart = (type, product) => {
    dispatch(addProduct(type, product))
  }
  const removeFromCart = (type, product) => {
    dispatch(removeProduct(type, product))
  }
  const productItems = practiceTests;
  const category = props.category;
  const type = props.type;
  const searchTerm = props.searchTerm;
  var FilteredProducts = [];
  category === "ALL" ? FilteredProducts = [...productItems] : FilteredProducts = productItems.filter((cat) => cat.testCategory === category);
  var FilteredProducts1 = [];
  type === "ALL" ? FilteredProducts1 = [...FilteredProducts] : FilteredProducts1 = FilteredProducts.filter((cat) => cat.testType === type);
  var FilteredProducts2 = [];
  searchTerm === "" ? FilteredProducts2 = [...FilteredProducts1] : FilteredProducts2 = FilteredProducts1.filter((cat) => cat.testTitle.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()));

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = FilteredProducts2.slice(indexOfFirstProduct, indexOfLastProduct);
  const numberOfProducts = FilteredProducts2.length;
  if (!dataLoaded) if (!practiceTests.loading) {
    setTimeout(() => {
      setDataLoaded(true)
    }, 200);

  }
  return (
    !dataLoaded ? <div style={{ width: "100%", height: "100%", marginTop: "15vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <PuffLoader css={"display: block; margin: 0 0 0 0;"} size={100} />
    </div> :
      <MainContainer>
        <PContainer>{
          currentProducts.map((product) => {
            return (
              <CCard
                hoverable
                cover={<Image onClick={() => navigate(`/practicetests/${product.testTitle}`, {
                  state: {
                    testID: product.key,
                  }
                })}
                ><img alt="example" src={product.testImageID!=="no image" ? `https://exporagenius.com:5000/image/${product.testImageID}` : noImage} /></Image>}
              >
                <ProductDtails onClick={() => navigate(`/practicetests/${product.testTitle}`, {
                  state: {
                    testID: product.key,
                  }
                })}>
                  <PTitle>{product.testTitle}</PTitle>
                  <PType>{product.testType}</PType>
                  <Rating size="small" name="read-only" value={4} readOnly />
                  <PPrice>{"$ "}{parseFloat(product.testPrice).toFixed(2)}</PPrice>
                </ProductDtails>
                {

                  productsInCart.findIndex(x => x.productID === product.key) === -1 ?
                    <Tooltip title="Add to Cart">
                      <Button onClick={() => addToCart("practiceTest", product.key)} style={{ position: "absolute", right: "20px", bottom: "13px" }} shape="circle" icon={<AiOutlineHeart />} />
                    </Tooltip> :
                    <Tooltip title="Remove from Cart">
                      <Button onClick={() => removeFromCart("practiceTest", product.key)} style={{ position: "absolute", right: "20px", bottom: "13px", borderColor: "#303030" }} shape="circle" icon={<AiFillHeart />} />
                    </Tooltip>
                }
              </CCard>
            );
          })
        }
        </PContainer>
        {numberOfProducts > 8 && <Pagination defaultPageSize={productsPerPage} size="small" total={numberOfProducts} onChange={(current, numberOfProducts) => { changeCurrentPage(current) }} />}
      </MainContainer>

  )
}
Products.defaultProps = {
  category: "ALL",
  type: "ALL"
}
export default Products;

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
const MainContainer = styled.div`
 display:flex;
 gap: 3vh;
 flex-direction: column;
 justify-content: center;
 align-items: center;
 margin-bottom: 0;
`
const PContainer = styled.div`
 display:flex;
 flex-wrap: wrap;
 gap: 3vh;
 color:#303030;
 width: 70vw;
 justify-content: center;
 align-items: center;
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