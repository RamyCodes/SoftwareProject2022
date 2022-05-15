import {Link} from 'react-router-dom';
import styled from "styled-components";

const Container = styled.div`
  height: 90 px;
  background-color: green; // or remove bc useless
`;

const Success = () => {

  return (
    <Container>
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 100,
        color: 'white',
      }}
    >
        <div>
            Payment Success !    
        </div>

      {
        <Link style={{color: "black"}} to={`/Home`}>
      <button style={{ color: 'white', background: 'black', height: 100, width: 200, fontSize: 20, padding: 10, marginTop: 20 }}>Go to Homepage</button>
      </Link>
        }

    </div>
    </Container>
  );
};

export default Success;
