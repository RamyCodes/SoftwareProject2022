import React from "react";

class Product extends React.Component {
   
    // Constructor 
    constructor(props) {
        super(props);
   
        this.state = {
            items: [],
            DataisLoaded: false
        };
    }
   
    // ComponentDidMount is used to
    // execute the code 
    componentDidMount() {
        fetch(
"http://localhost:5000/api/products")
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    items: json,
                    DataisLoaded: true
                });
            })
    }
    render() {
        const { DataisLoaded, items } = this.state;
        if (!DataisLoaded) return <div>
            <h1> Fetching... </h1> </div> ;
   
        return (
        <div className = "Product">
            <h1> Fetched data from Product api: </h1>  {
                items.map((item) => ( 
                <ol><br/>
                    item name: {item.item},
                    item price: {item.price},
                    item category: {item.category},
                    item availability: {item.availability},
                    </ol>
                ))
            }
        </div>
    );
}
}
   
export default Product;