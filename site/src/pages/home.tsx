import React from 'react';
import Cart from '../component/shop_cart';
import Grid from '../component/grid';
import { Product } from '../type/product';
import axios from 'axios';
import '../assets/styles/home.css';

const Home = () => {
  const [products, setProducts] = React.useState([]);
  const [cartProducts, setCartProducts] = React.useState([]);
  const [inCardQuantityState, setInCardQuantityState] = React.useState(0);

  const AddProduct = (props: Product) => {
    axios.post('http://localhost:5000/api/productsUpdateCard/', {
      _id: props._id,
      name: props.name,
      price: props.price,
      description: props.description,
      image: props.image,
      quantity: props.quantity,
      category: props.category,
      inCardQuantity: props.inCardQuantity + 1
    })
    .then(() => {
      setInCardQuantityState(inCardQuantityState + 1);
      props.inCardQuantity = props.inCardQuantity + 1;
      fetchCartProducts();
    })
    .catch((error) => {
      console.error('Error adding product:', error);
    });
  };
  
  const removeFromCart= (props: Product) =>{
    axios.post('http://localhost:5000/api/productsUpdateCard/', {
      _id: props._id,
      name: props.name,
      price: props.price,
      description: props.description,
      image: props.image,
      quantity: props.quantity,
      category: props.category,
      inCardQuantity: props.inCardQuantity - 1
    })
    .then(() => {
      if (props.inCardQuantity > 0){
        setInCardQuantityState(inCardQuantityState - 1); 
      }
      props.inCardQuantity = props.inCardQuantity - 1;
      fetchCartProducts();
    })
    .catch((error) => {
      console.error('Error adding product:', error);
    });
  }
  
  const fetchCartProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/productsInCard/');
      const data = await response.json();
      setCartProducts(data);
    } catch (error) {
      console.error('Error retrieving cart products:', error);
    }
  };

  React.useEffect(() => {
    (async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        const data = await response.json();
        setProducts(data);
        console.log('oui');
      } catch (error) {
        console.error('Error retrieving products:', error);
      }
    })();
    fetchCartProducts(); 
  }, []);

  return (
    <div>
      <h1>Home</h1>
      <div id="container">
        <div id="productGrid">
          <Grid
            products={products}
            addToCart={AddProduct}
          />
        </div>
        <div id="cart">
          <Cart 
            products={cartProducts} 
            removeFromCart={removeFromCart} 
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
