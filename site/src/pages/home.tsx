import React from 'react';
import ProductCard from '../component/product_card';
import Cart from '../component/shop_cart';
import Grid from '../component/grid'
import { Product } from '../type/product';

const Home = () => {

  const [products, setProducts] = React.useState([]);
  const [cartProducts, setCartProducts] = React.useState([]);

  const getPingFromBackend = async () => {
    try{
      const response = await fetch('http://localhost:5000//api/sendUpdate/');
      const data = await response.json();
      setProducts(data);
    }
    catch(error){
      console.error('Error retrieving products:', error);
    }
  }




  React.useEffect(() => {
    (async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        const data = await response.json();
        setProducts(data);
        console.log("oui")
      } catch (error) {
        console.error('Error retrieving products:', error);
      }
    })();
  },[]);
  
  
  

  React.useEffect(() => {
    (async () => {
      try {
        const response = await fetch('http://localhost:5000/api/productsInCard/');
        const data = await response.json();
        setCartProducts(data);
      } catch (error) {
        console.error('Error retrieving products:', error);
      }
    })();
  },[]);

  return (
    <div>
      <h1>Home</h1>
      <div id="body" >
        <div id="productGrid">
          <Grid products={products} />
        </div>
      
        <div id="cart">
          <Cart products={cartProducts}/>
        </div>
      </div>
      
    </div>
  );
};

export default Home;