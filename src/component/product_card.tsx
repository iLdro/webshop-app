import React from "react";
import { Product } from "../type/product";



const ProductCard: React.FC<Product> = ({ name, price, description }) => {
    return (
        <div>
        <h1>{name}</h1>
        <p>{price}</p>
        <p>{description}</p>
        </div>
    );
    }
        

export default ProductCard;