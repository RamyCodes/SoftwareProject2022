import Announcement from "../Components/Announcement";
import React from 'react'
import Navbar from "../Components/Navbar";
import styled from "styled-components";
import { Add, Remove } from "@material-ui/icons";
import {Link} from 'react-router-dom';
import { useSelector } from "react-redux";
import { useEffect, useState} from "react";
import StripeCheckout from "react-stripe-checkout";
import { userRequest } from "../requestMethods";
import {useNavigate} from 'react-router-dom';
import { removeProducts } from "../redux/cartRedux";
import { useDispatch } from "react-redux";
import { createContext } from "react";

const KEY = process.env.REACT_APP_STRIPE;

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
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

const TopTexts = styled.div`
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
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
  const cart = useSelector((state) => state.cart)
  const [stripeToken, setStripeToken] = useState(null);
  const navigate = useNavigate();
  const onToken = (token) => {
    setStripeToken(token);
  };
  console.log(stripeToken);
  let address = "";
  let tokken = "ddd";
  let email = "";
  const dispatch = useDispatch();

  const verifyCartItems = () => {
    if(cart.total === 0){
      let txt = ""
      window.alert("Your cart is empty ! Redirecting to catalog...")
      window.location.replace("/product");
      return;
    }
  }

  const reduceStock = (id, stock, quantity) =>{
    let count = stock - quantity;
    try {
      const res = userRequest.put(`/products/${id}`, {
        stock: count,
      });
    } catch (err){
      console.log(err.response);
  }
  }

  const createOrder = async () => {
    try {
      const res = await userRequest.post("/orders", {
        token: tokken,
        products: cart.products.map((item) => ({
          item: item.item,
          quantity: item.quantity,
        })),
        amount: cart.total,
        address: address
      });
      console.log("inside create order " + address)
      console.log("inside create order " + tokken)
      createShipping();
    } catch (err){
      console.log(err.response);
  }
  };

  const createShipping = async () => {
    console.log(tokken);
    try {
      const res = await userRequest.post(`/shippings/`, {
        status: "CREATED",
        orderid: tokken,
      });
    }
    catch (err){
      console.log(err.response);
  }
  }

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post("/checkout/payment", {
          tokenId: stripeToken.id,
          amount: cart.total * 100,
        });
        alert("Payment Success ! Redirecting to your Orders...")
        sessionStorage.setItem('currentUser', '1');
        navigate("/Order", {state: {stripeData: stripeToken.id, products: cart}});
        address = res.data.source.address_line1
        tokken = stripeToken.id
        email = stripeToken.email
        sessionStorage.setItem('email', email)
        console.log("response email data : " + email)
        for (let i = 0; i < cart.products.length; i++) {
          // console.log(cart.products, cart.products[i]?.stock, cart.products[i]?.quantity)
          reduceStock(cart.products[i].id, cart.products[i]?.stock, cart.products[i]?.quantity);
          }
        createOrder();
        dispatch(removeProducts());
      } catch(err){
        alert("Payment failed !")
        console.log(err.response);
    }
    };
    stripeToken && makeRequest();
  }, [stripeToken, navigate]);

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>Your cart</Title>
        <Top>
        <Link style={{color: "white", background: "black"}} to={`/Product`}>
          <TopButton style={{color: "white"}}>GO BACK TO CATALOG</TopButton>
          </Link>
        </Top>
        <Bottom>
          <Info>
            <Hr />

          {cart.products.map(product=>(<Product>
            <ProductDetail>
            <Image img src={product.image} />
              <Details>
                <ProductName>
                  <b>Product:</b> {product.name}
                </ProductName>
                <ProductSize>
                  <b>Quantity:</b> {product.quantity}
                </ProductSize>
              </Details>
            </ProductDetail>
            <PriceDetail>
              <ProductAmountContainer>
                <Add />
                <ProductAmount>{product.quantity}</ProductAmount>
                <Remove />
              </ProductAmountContainer>
              <ProductPrice>{parseInt(product.price)} EGP</ProductPrice>
            </PriceDetail>
          </Product>
          ))}
            <Hr/>
          </Info>
          <Summary>
            <SummaryTitle>Order Details</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>{parseInt(cart.total)} EGP</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>0 EGP</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
            </SummaryItem>
            <SummaryItem type="total">
              <b>
              <SummaryItemText>Total</SummaryItemText>
              </b>
              <b>
              <SummaryItemPrice>{parseInt(cart.total)} EGP</SummaryItemPrice>
              </b>
              
            </SummaryItem>
            <StripeCheckout 
          name= "Rabbit supermarket"
          image=""
          billingAddress
          shippingAddress
          description = {`Total amount to be paid: ${parseInt(cart.total)} EGP`}
          currency= "EGP"
          amount={parseInt(cart.total)*100}
          token={onToken}
          stripeKey={KEY}
          
          >
            <TopButton onClick={() => {verifyCartItems()}} style={{width: "350px", color: "white"}}>CHECKOUT NOW</TopButton>
            </StripeCheckout>
          </Summary>
        </Bottom>
      </Wrapper>
      <TopButton onClick={createOrder} style={{width: "350px", color: "white"}}>Order test</TopButton>
    </Container>
  );
};

export default Cart;
