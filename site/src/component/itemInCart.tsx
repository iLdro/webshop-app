import React from "react";
import { Product } from "../type/product"



interface ProductProps{
    product: Product;
    removeFromCart(props : Product): void;
}


const itemInCart: React.FC<ProductProps> = ({product, removeFromCart }) => {
    const { name, inCardQuantity } = product;

    const removeProduct = () => {
        removeFromCart(product);
        
    }   

    return (
        <div id="ProductInCart">
            <h2>{name}</h2>
            <p>quantity: {inCardQuantity}</p>
            <button onClick={removeProduct}>Remove</button>
        </div>
    )
}

export default itemInCart;