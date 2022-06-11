import React from "react";
import { ShoppingBasketOutlined } from "@material-ui/icons";
import styled from "styled-components";
import Announcement from "../Components/Announcement"
import Navbar from "../Components/Navbar";
import axios from "axios";
import { Search, Add, Remove } from "@material-ui/icons";
import { useState, useEffect } from "react";
import { addProduct } from "../redux/cartRedux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";


//document.getElementById("searchTxt").value;

const Container = styled.div``;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 0px;
  padding: 5px;
  background-color: blue;
  border-color: black;

`;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
`;

const ImgContainer = styled.div`
  flex: 1;
  display: flex;
`;


const Image = styled.img`
transition: all 0.5s ease;
&:hover {
  background-color: white;
  transform: scale(1.3);
}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
`;

const Title = styled.h1`
  font-weight: 200;

`;


const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: 180px;
  margin-top: 100px;
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
  cursor: pointer;
  font-weight: 500;
  background-color: blue;
  border: blue;
  color: white;
  margin-left: 10px;
`;

function Product(){
  const [product, setProduct] = useState([]);
  const [search, setSearch] = useState("");
  const [searchButton, setSearchButton] = useState("");
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();


const handleClick = () =>{
  setQuantity(1);
  setSearchButton(search);
}

const handleCart = (index)=>{

  if(product[index].stock < 1)
  return(alert("Item is currently not available !"));
  dispatch(
  addProduct({ product, id: product[index]._id, stock: product[index].stock, name: product[index].name, image: product[index].image, price: product[index].price*quantity, quantity, total:  product.forEach.price*quantity})
  )
  alert("Added to cart successfully !");
}



const handleQuantity = (type, search) =>{
  if(product.length === 0 | product.length > 1)
  return(alert("Feature available only in search !"));
  if(product[0].stock === 0)
  return(alert("Item is currently not available !"));
  if(type === "dec"){
   quantity > 1 && setQuantity(quantity - 1);
  }
  else if(quantity < product[0].stock){
    setQuantity(quantity + 1);
  }
  else{
    alert(`Only ${product[0].stock} of this product left !`)
  }
}

  useEffect(()=> {
    axios.get(`http://localhost:5000/api/products?name=${searchButton}`)
        .then( res => {
          console.log(res)
          setProduct(res.data)
        })
        .catch(err => {
          console.log(err)
        })
        
    },[searchButton])
  
  return(
    <Container>
    <Navbar />
    <SearchContainer>
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search / Select" style={{height: 40, width: 320, marginLeft: 600}} />
            <Button type = "button" onClick={handleClick} id="buttonTxt">
            <Search style={{ color: "white", fontSize: 26, padding: 10, backgroundColor: "blue"}} />
            </Button>
          </SearchContainer>
          
          
    <Wrapper>
    
      <InfoContainer>
      
       {
              
    <div>
      <ul>
        {
          product.map((product, index) => 
            <div>
            <br/>
            <br/>
            <hr size="2" width="90%" color="black"/>
            <br/><br/><h1> Product {index +1}</h1><br/>
        <div style={{display: "flex", justifyContent: "space-between"}}> 
          <div>
            <Title key={product.name}>   name: {product.name} </Title>
            <Title key={product.price + index +2}>  price: EGP {product.price} </Title>
            <Title key={product.price + index +3}>  stock: {product.stock} </Title>
            <Title key={product.price + index +4}> category: {product.category} </Title>
            <Title key={product.price + index +5}> weight: {product.weight} </Title>
            <Title key={product.price + index +6}> measurement: {product.measurement} </Title>
            <Title key={product.price + index +7}> cumulative price: EGP {parseInt(product.price * quantity)} </Title>
          </div>
          <div>
              <Image id={product.name} onClick={() => handleCart(index)} style={{height: "250px"}} key={product.image} src={product.image}/>
          </div>
        </div>
          <br/>
          <AmountContainer key= {product.image +"Amount"}>
            <Remove id={product.name + "remove"} key={product.name + "-remove"} onClick={() => handleQuantity("dec", search)} />
            <Amount key={product.name}>{quantity}</Amount>
            <Add id={product.name + "add"} key={product.name+ "-add"} onClick={() => handleQuantity("inc", search)} />
          </AmountContainer>
          <br/>
      </div>)
         
        }
      </ul>
    </div>
              
          }
        
      </InfoContainer>
    </Wrapper>
  </Container>

      
      
  )
}

    
export default Product;