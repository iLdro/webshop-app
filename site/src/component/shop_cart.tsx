import { useEffect, useState } from "react";
import { Product } from "../type/product";
import ItemInCart from '../component/itemInCart.tsx';
import '../assets/styles/shop_cart.css';
import Axios from 'axios';

interface CartProps {
    products: Product[] | string;
    removeFromCart(props: Product): void;
}

const Cart = ({ products, removeFromCart }: CartProps) => {
    
    const [cartArray, setCartArray] = useState<Product[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [cartQuantity, setCartQuantity] = useState<number>(0);

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


    useEffect(() => {
        let total = 0;
        cartArray.forEach((product: Product) => {
            total += product.price * product.inCardQuantity;
        });
        setTotal(total);
    }, [cartArray]);

    

    useEffect(() => {
        let cartQuantity = 0;
        cartArray.forEach((product: Product) => {
            cartQuantity += product.inCardQuantity;
        });
        setCartQuantity(cartQuantity);
    }, [cartArray]);

    return (
        <div id="Cart">
            <div id="CartHeader">Cart</div>
            <div id="itemList">
                {cartArray.map((product: Product) => (
                    <div id="itemInCart">
                    <ItemInCart
                        key={product._id}
                        product={product}
                        removeFromCart={removeFromCart}
                    />
                    </div>
                ))}
            </div>
            <div id="CartFoot">
                <div>Total : {total} €</div>
                <div>nombre de produit : {cartQuantity}</div>
            </div>
        </div> 
    );   
}

export default Cart;
