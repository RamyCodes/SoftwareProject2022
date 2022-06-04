import styled from "styled-components";
import Navbar from '../Components/Navbar';
import axios from 'axios';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("83846.jpg")
      center;
  background-size: cover;

`;

const Wrapper = styled.div`
width: 33%;
padding: 20px;
background-color: white;
align-items: center;
margin-left: 500px;
margin-top: 200px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Register = () => {
  
  function fn1()
  {
    var pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    var email = document.getElementById("text1").value;
    document.getElementById("all").remove();

    if(email.match(pattern)){
       axios.post('http://localhost:5000/api/users/register', {
        email: email,
      })
      .then(window.alert("Email saved !"))
      .catch(function(err){
        console.log(err);
      });
    }
    else{alert("Please enter a valid email !");}
  }

  return (
    <Container>
      <Navbar />
      <Wrapper id="all">
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Input id="text1" type="text" required placeholder="email" />
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button type="button" onClick={() => fn1()}>CREATE</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
