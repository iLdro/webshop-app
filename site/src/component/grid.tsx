import React from 'react';
import { Product } from '../type/product.ts';
import ProductCard from '../component/shop_cart.tsx';
import '../assets/styles/grid.css'



const Grid = ({products}: {products: Product[]}) => {


    return (
    <>  <div id="maingrid">
            <div id="cardGrid" >
                {products.map((product: Product) => (
                    <ProductCard key={product.id} id={product.id} name={product.name} price={product.price} 
                    description={product.description} image={product.image} quantity={product.quantity} 
                    category={product.category} />
                ))}
            </div>
        </div>
    </>

    );
}




export default Grid;


