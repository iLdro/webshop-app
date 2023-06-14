import React from "react";
import { Product } from "../type/product";
import '../assets/styles/product_card.css'



const ProductCard: React.FC<Product> = ({ name, price, description, image, quantity, category }) => {
    return (
        <div id="Pcard">
            <h1>{name}</h1> 
            <p>{description}</p>
            <p>{price}€</p>
            <button >Add to cart</button>
        </div>
    );
    }
        

export default ProductCard;