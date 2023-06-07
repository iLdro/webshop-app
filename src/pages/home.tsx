import React from 'react';
import ProductCard from '../component/product_card';

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <ProductCard id={0} name="test" price={20} description="test" image={''} quantity={0} category={''} />
    </div>
  );
};

export default Home;