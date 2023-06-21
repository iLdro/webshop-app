import React from "react";
import { Product } from "../type/product.ts";
import '../assets/styles/product_card.css'

interface ProductProps {
    product: Product;
    addToCart(product: Product ,  quantity : number): void;
}

const ProductCard: React.FC<ProductProps> = ({ product, addToCart }) => {
    const { name, image, description, price } = product;

    const handleAddToCart = () => {
        addToCart(product,1);
    }
    
    return (
        <div id="Pcard">
            <h1>{name}</h1> 
            <img src={image} alt="image" />
            <p>{description}</p>
            <p>{price}€</p>
            <button onClick={handleAddToCart}>Add to cart</button>
        </div>
    );
}

export default ProductCard;
