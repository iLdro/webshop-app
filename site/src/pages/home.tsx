import React from 'react';
import ProductCard from '../component/product_card';
import Cart from '../component/shop_cart';
import Grid from '../component/grid'

const Home = () => {

  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    fetch('http://localhost:5000/')
      .then(response => response.json())
      .then(data => setProducts(data));
      
  } , []);

  console.log(products);

  return (
    <div>
      <h1>Home</h1>
      <div>
      <Grid products={products} />
      {/*<ProductCard id={0} name="test" price={20} description="test" image={''} quantity={0} category={''} />
      <Cart id={0} name="test" price={20} description="test" image={''} quantity={0} category={''} /> */}
      </div>
    </div>
  );
};

export default Home;