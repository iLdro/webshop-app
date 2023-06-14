import React from "react";
import { Product } from "../type/product.ts";
import '../assets/styles/product_card.css'
import axios from 'axios';
import { useState } from "react";


const ProductCard: React.FC<Product> = ({_id , name, price, description, image, quantity, category, inCardQuantity }) => {

    const [inCardQuantityState, setInCardQuantityState] = useState(inCardQuantity)


    const addToCart  = () => {
        console.log("inCardQuantity" + inCardQuantity)
        axios.post('http://localhost:5000/api/productsUpdateCard/', {
            _id : _id,
            name: name,
            price: price,
            description: description,
            image: image,
            quantity: quantity,
            category: category,
            inCardQuantity : inCardQuantity 
        }).then(() => {
            setInCardQuantityState(inCardQuantityState + 1)
            console.log("nouvelle quantité ajoutée" + inCardQuantity)
            console.log("success")
        }
        )
    }


    
    
    return (
        <div id="Pcard">
            
            <h1>{name}</h1> 
            <p>{description}</p>
            <p>{price}€</p>
            <button onClick={addToCart}>Add to cart</button>
            
        </div>
    );
}

export default ProductCard;