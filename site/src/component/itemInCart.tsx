import React from "react";
import { Product } from "../type/product"

const itemInCart: React.FC<Product> = ({_id , name, price, description, image, quantity, category, inCardQuantity }) => {
    return (
        <div id="ProductInCart">
                <h2>{name}</h2>
                <p>quantity : {inCardQuantity}</p>
                <button>Remove</button>
            </div>
    )
}

export default itemInCart;