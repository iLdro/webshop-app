import React from 'react';
import { Product } from '../type/product.ts';
import ProductCard from '../component/product_card.tsx';
import '../assets/styles/grid.css';
import axios from 'axios';

interface GridProps {
  products: Product[] | string;
  addToCart(props : Product): void;
}

const Grid = ({ products, addToCart }: GridProps) => {
  console.log(typeof products);
  console.log("blabla" + products);


  
  let productsArray: Product[] = [];

  if (typeof products === 'string') {
    try {
      productsArray = JSON.parse(products);
    } catch (error) {
      console.error('Error parsing products:', error);
    }
  } else {
    productsArray = products;
  }

 

  return (
      <>
        <div id="mainGrid">
            {productsArray.map((product: Product) => (
              console.log(product.inCardQuantity ),
            <ProductCard
                props = {product}
                addToCart = {addToCart}
            />
            ))}
        </div>
    </>
  );
}

export default Grid;
