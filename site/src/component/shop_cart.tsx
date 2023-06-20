import React, { useEffect, useState } from "react";
import { Product } from "../type/product";
import ItemInCart from '../component/itemInCart.tsx';
import '../assets/styles/shop_cart.css';
import Axios from 'axios';

const Cart = ({ products }: { products: Product[] | string }) => {
    const [cartArray, setCartArray] = useState<Product[]>([]);

    useEffect(() => {
        const fetchCartProducts = async () => {
            try {
                const response = await Axios.get('http://localhost:5000/api/productsInCard/');
                const data = response.data;
                if (typeof products === 'string') {
                    try {
                        setCartArray(JSON.parse(products));
                    } catch (error) {
                        console.error('Error parsing products:', error);
                    }
                } else {
                    setCartArray(products);
                }
            } catch (error) {
                console.error('Error retrieving cart products:', error);
            }
        };

        fetchCartProducts();
    }, [products]);

    return (
        <div id="Cart">
            <div id="CartHeader">Cart</div>
            <div id="itemList">
                {cartArray.map((product: Product) => (
                    <ItemInCart
                        _id={product._id}
                        name={product.name}
                        price={product.price}
                        description={product.description}
                        image={product.image}
                        quantity={product.quantity}
                        category={product.category}
                        inCardQuantity={product.inCardQuantity}
                    />
                ))}
            </div>
            <div id="CartFoot">
                Total : €
                nombre de produit :
            </div>
        </div> 
    );   
}

export default Cart;
