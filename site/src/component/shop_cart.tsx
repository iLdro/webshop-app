import React from "react";
import { Product } from "../type/product";
import '../assets/styles/cart.css'



const Cart: React.FC<Product> = ({ name, price, description, image, quantity, category }) => {
    return (
        <div id="Cart">
            <div id="CartHeader">Cart</div>
            <div id="ProductInCart">
                <h2>{name}</h2>
                <p>quantity : {quantity}</p>
                <button>Remove</button>
            </div>
            <div id="CartFoort">
                Total : €
                nombre de produit : 
            </div>

        </div>
    );   
}

export default Cart;