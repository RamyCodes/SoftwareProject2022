import { useEffect,useState } from "react";
import StripeCheckout from "react-stripe-checkout"
import axios from "axios"

const KEY ="pk_test_51Kz0mQCAdufLrSrfWGUsQ9RrhPoNSZbzvVqtkZuUTNTAP5TqUcZELqguSxM1QXfWPTPuIIx6PBZ7JV86U7wPDPrn00qaqkrqay"

const Pay = () => {
    
    const[stripeToken, setStripeToken] = useState(null);

    const onToken = (token)=>{
        setStripeToken(token);
    };

    useEffect(()=>{
        const makeRequest = async () =>{
            try{
              const res = await axios.post(
                  "http://localhost:5000/api/checkout/payment",
                  {
                    tokenId: stripeToken.id,
                    amount: 200,
                  }
                );
                console.log(res.data);
                
            }catch(err){
                console.log(err);
            }
        };
     //   stripeToken && makeRequest
    },[stripeToken]);

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