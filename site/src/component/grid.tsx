import React from 'react';
import { Product } from '../type/product.ts';
import ProductCard from '../component/product_card.tsx';
import '../assets/styles/grid.css';

const Grid = ({ products }: { products: Product[] | string }) => {
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
            <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                description={product.description}
                image={product.image}
                quantity={product.quantity}
                category={product.category}
                inCard={product.inCard}
            />
            ))}
        </div>
    </>
  );
}

export default Grid;
