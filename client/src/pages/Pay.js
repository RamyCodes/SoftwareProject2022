import { useEffect,useState } from "react";
import StripeCheckout from "react-stripe-checkout"
import { userRequest } from "../requestMethods";
import { useNavigate } from "react-router";

const KEY = process.env.REACT_APP_STRIPE;
const Pay = () => {
    
    const[stripeToken, setStripeToken] = useState(null);
    const history = useNavigate();
    const onToken = (token)=>{
        setStripeToken(token);
    };

    useEffect(()=>{
        const makeRequest = async () =>{
            try{
              const res = await userRequest.post("/checkout/payment", 
                  {
                    tokenId: stripeToken.id,
                    amount: 200,
                  }
                );
                history.push("/success", {data: res.data});
                console.log(res.data);
            }catch(err){
                console.log(err.response.data);
            }
        };
        stripeToken && makeRequest();
    },[stripeToken, 200, history]);

    return(
        <div style={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent:"center",
        }}
        >
          <StripeCheckout 
          name= "Rabbit supermarket"
          image=""
          billingAddress
          shippingAddress
          description = "Your total is 20 egp"
          amount={200}
          token={onToken}
          stripeKey={KEY}
          >
            <button style={{
                border: "none",
                width: 120,
                borderRadius: 5,
                padding: "20px",
                backgroundColor: "black",
                color: "white",
                fontWeight: "600",
                cursor: "pointer",
            }}
            >
                Pay Now
            </button>
            </StripeCheckout>
        </div>
    )
};

export default Pay