import styled from "styled-components";

const Container = styled.div`
  height: 70px;
  background-color: darkgreen;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  font-weight: 500;
`;

const Announcement = () => {
  return (
  <Container>Welcome to Rabbit online supermarket, 
      get your products delivered in less than 20 minutes !</Container>
  );
};

export default Announcement;
