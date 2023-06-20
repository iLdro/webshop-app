import React from "react";
import { Product } from "../type/product"
import axios from 'axios';




const itemInCart: React.FC<Product> = ({_id , name, price, description, image, quantity, category, inCardQuantity }) => {
    
    const removeFromCart = () => {
        console.log("remove from cart")
        axios.delete(`http://localhost:3000/cart/${_id}`)
        .then(res => {
            console.log(res);
            console.log(res.data);
        })
        .catch(err => {
            console.log(err);
        })
        }

    return (
        <div id="ProductInCart">
                <h2>{name}</h2>
                <p>quantity : {inCardQuantity}</p>
                <button onClick={removeFromCart}>Remove</button>
            </div>
    )
}

export default itemInCart;