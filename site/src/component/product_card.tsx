import React from "react";
import { Product } from "../type/product.ts";
import '../assets/styles/product_card.css'
import axios from 'axios';

interface ProductProps {
    product: Product;
    addToCart(product: Product): void;
}

const ProductCard: React.FC<ProductProps> = ({ product, addToCart }) => {
    const { name, description, price } = product;

    const handleAddToCart = () => {
        addToCart(product);
    }
    
    return (
        <div id="Pcard">
            <h1>{name}</h1> 
            <p>{description}</p>
            <p>{price}€</p>
            <button onClick={handleAddToCart}>Add to cart</button>
        </div>
    );
}

export default ProductCard;
