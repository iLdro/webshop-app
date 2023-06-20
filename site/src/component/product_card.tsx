import React from "react";
import { Product } from "../type/product.ts";
import '../assets/styles/product_card.css'
import axios from 'axios';
import { useState } from "react";

interface ProductProps {
    props: Product;
    addToCart(props : Product): void;
}

const ProductCard: React.FC<ProductProps> = ({props, addToCart }) => {

    const AddProduct  = () => {
        console.log("inCardQuantity" + props.inCardQuantity)
        addToCart(props);
    }
    
    return (
        <div id="Pcard">
            
            <h1>{props.name}</h1> 
            <p>{props.description}</p>
            <p>{props.price}€</p>
            <button onClick={AddProduct}>Add to cart</button>
            
        </div>
    );
}

export default ProductCard;