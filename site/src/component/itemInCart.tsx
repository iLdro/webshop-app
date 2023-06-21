import React from "react";
import { Product } from "../type/product"
import '../assets/styles/cart.css'



interface ProductProps{
    product: Product;
    removeFromCart(props : Product , quantity : number): void;
}


const itemInCart: React.FC<ProductProps> = ({product, removeFromCart }) => {
    const { name, inCardQuantity } = product;

    const removeProduct = () => {
        removeFromCart(product, -1);
        
    }   

    return (
        <div id="ProductInCart">
            <h2>{name}</h2>
            <p>quantity: {inCardQuantity}</p>
            <button id="removeButton" onClick={removeProduct}>Remove</button>
        </div>
    )
}

export default itemInCart;