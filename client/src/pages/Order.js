import Announcement from "../Components/Announcement";
import React from 'react'
import Navbar from "../Components/Navbar";
import styled from "styled-components";
import { Add, CenterFocusStrong, Remove } from "@material-ui/icons";
import {Link} from 'react-router-dom';
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router";
import { red } from "@material-ui/core/colors";



const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
  color: white;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 30px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: black;
  color: black;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;


const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid black;
  border-radius: 10px;
  padding: 20px;
  height: 30vh;
  background-color: black;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: green;
  color: white;
  font-weight: 600;
`;

const Cart = () => {
  const location = useLocation();
  const cart = useSelector(state => state.cart)
  const [order, setOrder] = useState([]);
  let priceFinal = 0;
  const data = location.state?.stripeData;
  const email = sessionStorage.getItem('email');
  console.log(email)

  useEffect(()=> {
    // console.log("currentUser order:" + sessionStorage.getItem('currentUser') );
    // if(sessionStorage.getItem('currentUser') === null){
    //   const DeleteOrders = () =>{
    //     axios.delete(`http://localhost:5000/api/orders`)
    //     .then( res => {
    //       console.log(res)
    //     })
    //     .catch(err => {
    //       console.log(err)
    //     })
    //   }
      
    //   DeleteOrders();
    // }
    axios.get(`http://localhost:5000/api/orders?token=`)
        .then( res => {
          console.log(res)
          setOrder(res.data)
        })
        .catch(err => {
          console.log(err)
        })
        
    },[])

    const handleOrder = (oStatus, orderId, shippingStatus) => {
      let res = "PROCESSING"
      if(oStatus === "FULLFILLED" || oStatus === "FULL"){
        res = "FULLFILLED"
      }
      if(oStatus === "delivered"){
        axios.put(`http://localhost:5000/api/orders/${orderId}`, {
        status : "FULLFILLED"
        
      })
      
      }
      if(oStatus === "CANCELLED"){
        res = "CANCELLED"
        
      }
      if(oStatus === "PROCESSING"){
        const times = async () =>{
         setTimeout(res = "PROCESSING", 1000)
        }
        times()
      }
      if(oStatus === "shipped"){
        res = "PROCESSING"

      }
      if(shippingStatus === "SHIPPED"){
        res = "PROCESSING"
        axios.put(`http://localhost:5000/api/orders/${orderId}`, {
        status : "delivered"
      })
      .then(axios.get('http://localhost:5000/api/shipped'))
      }
      if(shippingStatus === "CREATED"){
        axios.put(`http://localhost:5000/api/orders/${orderId}`, {
        status : "shipped"
      })
        res = "PROCESSING"
      }
      if(oStatus === "CREATED"){
        res = "CREATED"
        axios.put(`http://localhost:5000/api/orders/${orderId}`, {
        status : "PROCESSING"
        
      })
      }
      return res;
    }

    const test = (sStatus) => {
      let res = "";
      if(sStatus == "CANCELLED")
        res = "";
      if(sStatus == "CREATED")
        res = "";
      if(sStatus == "PROCESSING")
        res = "CREATED";
      if(sStatus == "shipped")
        setTimeout(res = "SHIPPED", 5000)
      if(sStatus == "delivered"){
        res = "DELIVERED"
        axios.get('http://localhost:5000/api/delivered')
      }
      if(sStatus == "FULLFILLED")
        res = "DELIVERED";
      if(sStatus == "FULL")
        res = "RETURNED";
      return res;
    }

    const Return = (orderStatus, shippingStatus, orderId) => {
      console.log(orderStatus, shippingStatus)
      if(orderStatus === "delivered" && shippingStatus === "DELIVERED"){
        alert("Order return for order id " + orderId +" requested !")
        axios.put(`http://localhost:5000/api/orders/${orderId}`, {
          status : "FULL"
        })
        .then(axios.get("http://localhost:5000/api/returned"))
        window.location.replace("/order");
      }
      else{
        alert("You can't return the order after it was fullfilled !")
      }
    }

    const Cancel = async (orderId, orderStatus) => {
      if(orderStatus == "CANCELLED")
      {
        alert("Order is already cancelled !")
        return;
      }
      if(orderStatus == "FULLFILLED" || orderStatus == "FULL")
      {
        alert("You can't cancel now, order is already fullfilled !")
        return;
      }
      if(test(orderStatus) == "SHIPPED")
      {
        alert("You can't cancel now, order is already shipped !")
        return;
      }
      await axios.put(`http://localhost:5000/api/orders/${orderId}`, {
        status : "CANCELLED"
      })
      .then(axios.get("http://localhost:5000/api/cancelled"))

      .then((data) => {
        console.log(data);
        alert("Order " + orderId + " is now cancelled !");
        window.location.replace("/order");
      })
      .catch((err) => {
        console.log(err);
      })
    }

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title style={{color: "black"}}>Your order</Title>
        <Top>
        <Link style={{color: "white", background: "black"}} to={`/Product`}>
          <TopButton style={{color: "white"}}>GO BACK TO CATALOG</TopButton>
          </Link>
        </Top>
        <Bottom>
          <Info>
            <Hr />
            {order.map((order, index)=>(<Product>
            <ProductDetail>
              <Details>
              <ProductPrice>
                  <b>Order ID:</b> {order._id}
                  </ProductPrice>
                <ProductPrice>
                  <b>First Product:</b> {order.products[0].item} ({order.products[0].quantity}) 
                  </ProductPrice>
                  <ProductPrice>
                  <b>Shipping address:</b> {order.address}
                  </ProductPrice>
              </Details>
            </ProductDetail>
            <PriceDetail>
              <ProductAmountContainer>
              <ProductPrice>
              <br></br>
                 <b>Order status: </b> {handleOrder(order.status, order._id, test(order.status))}
                 </ProductPrice>
              </ProductAmountContainer>
              <ProductPrice>
                 <b>Shipping: </b> {test(order.status)}
                 </ProductPrice>
                 <br></br>
              <ProductPrice> <b>Order price: </b> {order.amount} EGP</ProductPrice>
              <div>
              <TopButton id={order._id} onClick={() => Cancel(order._id, order.status)} style={{height: "70px", backgroundColor: "red", marginTop: "10px", marginBottom: "10px", width: "120px", color: "white", fontSize: 18, marginRight: "10px"}} >CANCEL</TopButton>
              <TopButton id={order._id + "return"} onClick={() => Return(order.status, test(order.status), order._id)} style={{height: "70px", backgroundColor: "red", marginTop: "10px", marginBottom: "10px", width: "120px", color: "white", fontSize: 18, marginRight: "10px"}} >RETURN</TopButton>
              </div>
            </PriceDetail>
            
          </Product>
          ))}

            <Hr/>
          </Info>
          
          <Summary>
            <SummaryTitle style={{color: "white"}}>Order Details</SummaryTitle>
            <SummaryItem>
              <SummaryItemText style={{color: "white"}}>Subtotal</SummaryItemText>
              {order.map((order)=>(
              <SummaryItemPrice style={{color: "white"}}>{priceFinal += order.amount} EGP</SummaryItemPrice>
              ))}
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText style={{color: "white"}}>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice style={{color: "white"}}>0 EGP</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
            </SummaryItem>
            <SummaryItem type="total">
              <b>
              <SummaryItemText style={{color: "white"}}>Total</SummaryItemText>
              </b>
              <b>
              <SummaryItemPrice style={{color: "white"}}>{priceFinal} EGP</SummaryItemPrice>
              </b>
              
            </SummaryItem>
            <TopButton style={{width: "350px", color: "white", fontSize: 18}} disabled>PAID</TopButton>
          </Summary>
          
        </Bottom>
      </Wrapper>
    </Container>
  );
};

export default Cart;
