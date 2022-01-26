import React, { Component, useEffect, useState } from "react";
import styled from 'styled-components';
import { Card, Rate, Pagination, Tooltip, Button } from 'antd';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import "./Product_Items.css";
import { connect } from "react-redux";
import { addProduct, removeProduct } from "../../Redux/Actions/CartActions";
import PuffLoader from "react-spinners/PuffLoader"
import noImage from "../../Images/noImage.png"

const mapDispatchToProps = (dispatch) => {
  return {
    addProduct: (type, product) => dispatch(addProduct(type, product)),
    removeProduct: (type, product) => dispatch(removeProduct(type, product))
  }
}
const mapStateToProps = (state) => {
  const userData = state.auth.userData;
  const { allPracticeTests } = state;
  const practiceTests = allPracticeTests.practiceTests
  const productsInCart = state.cart.productsWithID.filter(x => x.productType === "practiceTest")
  const loggedIn = state.auth.loggedIn
  return {
    practiceTests,
    userData,
    loggedIn,
    productsInCart
  }
}

class Products extends Component {
  constructor(props) {
    super(props);
  }

  state = { currentPage: 1, productsPerPage: 8, dataLoaded: false };

  changeCurrentPage = (page) => {
    this.setState(prevState => ({
      currentPage: page,
    }));
  }
  addToCart = (type, product) => {
    this.props.addProduct(type, product)
  }
  removeFromCart = (type, product) => {
    this.props.removeProduct(type, product)
  }
  render() {
    //console.log(this.props.userData)
    const productItems = this.props.practiceTests;
    const category = this.props.category;
    const type = this.props.type;
    const searchTerm = this.props.searchTerm;
    var FilteredProducts = [];
    category === "ALL" ? FilteredProducts = [...productItems] : FilteredProducts = productItems.filter((cat) => cat.testCategory === category);
    var FilteredProducts1 = [];
    type === "ALL" ? FilteredProducts1 = [...FilteredProducts] : FilteredProducts1 = FilteredProducts.filter((cat) => cat.testType === type);
    var FilteredProducts2 = [];
    searchTerm === "" ? FilteredProducts2 = [...FilteredProducts1] : FilteredProducts2 = FilteredProducts1.filter((cat) => cat.testTitle.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()));

    const indexOfLastProduct = this.state.currentPage * this.state.productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - this.state.productsPerPage;
    const currentProducts = FilteredProducts2.slice(indexOfFirstProduct, indexOfLastProduct);
    const numberOfProducts = FilteredProducts2.length;
    if(!this.state.dataLoaded) if(!this.props.practiceTests.loading){
      setTimeout(() => {
        this.setState({dataLoaded: true})
      }, 1000);
      
    }
    return (
      !this.state.dataLoaded ? <div style={{ width: "100%", height: "100%", marginTop:"15vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <PuffLoader css={"display: block; margin: 0 0 0 0;"} size={100} />
      </div> :
        <MainContainer>
          <PContainer>{
            currentProducts.map((product) => {
              return (
                <Card
                  hoverable
                  style={{ borderStyle: "solid", borderRadius: "5px", borderWidth: "2px", borderColor: "rgb(108, 108, 108, 0.3)", width: "240px", minHeight: "220px", height: "35.5vh", position: "relative" }}
                  cover={<Image><img alt="example" src={ product.testImageID?`https://exporagenius.com:5000/image/${product.testImageID}`:noImage} /></Image>}
                >
                  <ProductDtails>
                    <PTitle>{product.testTitle}</PTitle>
                    <PType>{product.testType}</PType>
                    <Rate className="rating" allowHalf disabled defaultValue={product.testRate} />
                    <PPrice>{"$ "}{parseFloat(product.testPrice).toFixed(2)}</PPrice>
                  </ProductDtails>
                  {
                    
                      this.props.productsInCart.findIndex(x => x.productID === product.key) === -1 ?
                        <Tooltip title="Add to Cart">
                          <Button onClick={() => this.addToCart("practiceTest", product.key)} style={{ position: "absolute", right: "20px", bottom: "13px" }} shape="circle" icon={<AiOutlineHeart />} />
                        </Tooltip> :
                        <Tooltip title="Remove from Cart">
                          <Button onClick={() => this.removeFromCart("practiceTest", product.key)} style={{ position: "absolute", right: "20px", bottom: "13px", borderColor: "#303030" }} shape="circle" icon={<AiFillHeart />} />
                        </Tooltip> 
                  }
                </Card>
              );
            })
          }
          </PContainer>
          {numberOfProducts>8&&<Pagination defaultPageSize={this.state.productsPerPage} size="small" total={numberOfProducts} onChange={(current, numberOfProducts) => { this.changeCurrentPage(current) }} />}
        </MainContainer>

    )
  }
}

Products.defaultProps = {
  category: "ALL",
  type: "ALL"
}
export default connect(mapStateToProps, mapDispatchToProps)(Products);

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

 width: 70 vw;
 justify-content: center;
 align-items: center;
`
const ProductDtails = styled.div`
 margin:0px;
 position: absolute;
 top:17.3vh;
 left: 16px;
 display:flex;
 flex-direction: column;
 gap:7px;
`
const PTitle = styled.div`
 font-size: 14px;
 font-weight: 600;
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