import React from "react";
import styled from "styled-components";
import Announcement from "../Components/Announcement"
import Navbar from "../Components/Navbar";
import axios from "axios";
import { useState, useEffect } from "react";

//document.getElementById("searchTxt").value;

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: #f8f4f4;
  }
`;

function Product(){
  const [product, setProduct] = useState([])

  useEffect(()=> {
    axios.get('http://localhost:5000/api/products')
        .then( res => {
          console.log(res)
          setProduct(res.data)
        })
        .catch(err => {
          console.log(err)
        })
        
    },[])
  
  return(
    <Container>
    <Navbar />
    <Announcement />
    <Wrapper>
      <ImgContainer>

      </ImgContainer>
      <InfoContainer>
              <h1> Fetched data from Product api: </h1>  {
              
    <div>
      <ul>
        {
          product.map(product => 
            <div>
            <br/>
        <Title>  item name: {product.item} </Title>
        <Price> item price: {product.price} </Price>
        <Price> item availability: {product.availability} </Price>
         <Desc> item category: {product.category} </Desc>
           
        <AddContainer>
        <Button>ADD TO CART</Button>
      </AddContainer>
      </div>)
         
        }
      </ul>
    </div>
              
          }
        
      </InfoContainer>
    </Wrapper>
  </Container>

    // <div>
    //   <ul>
    //     {
    //       product.map(product => <li key = {product._id}>{product.item}</li>)
    //     }
    //   </ul>
    // </div>
      
      
  )
}


    /*

    useEffect(()=>{
      fetch(
"http://localhost:5000/api/products?item=")
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    items: json,
                    DataisLoaded: true
                });
            })
    }, [])
    */
    
export default Product;