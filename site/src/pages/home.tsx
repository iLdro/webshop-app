import React from 'react';
import Cart from '../component/shop_cart';
import Grid from '../component/grid';
import { Product } from '../type/product';
import axios from 'axios';
import '../assets/styles/home.css';

const Home = () => {
  const [products, setProducts] = React.useState([]);
  const [cartProducts, setCartProducts] = React.useState([]);
  const [formdata , setFormData] = React.useState({} as Product);


  
  const upDateProduct = (product: Product, quantity: number) => {
    const  updatedProducts = products.map((p : Product) : Product => {
      if (p._id === product._id) {
        return { ...p, inCardQuantity: p.inCardQuantity + quantity };
      }
      return p;
    });
  
    axios
      .post('http://localhost:5000/api/productsUpdateCard/', {
        _id: product._id,
        name: product.name,
        price: product.price,
        description: product.description,
        image: product.image,
        quantity: product.quantity,
        category: product.category,
        inCardQuantity: product.inCardQuantity + quantity,
        oldQuantity: product.oldQuantity
      })
      .then(() => {
        console.log('Product added');
        setProducts(updatedProducts);
        fetchCartProducts();
      })
      .catch((error) => {
        console.error('Error adding product:', error);
      });
  };
  
  

  
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
  
  
  const addProduct = async () => {
    axios.post('http://localhost:5000/api/createProduct', {
      name: formdata.name,  
      price: formdata.price,
      description: formdata.description,
      image: formdata.image,
      quantity: formdata.quantity,
      category: formdata.category,
      inCardQuantity: 0      
    })
    .then(() => {
      console.log('Product added');
      fetchCartProducts();
    }
    )
    .catch((error) => {
      console.error('Error adding product:', error);
    }
    );
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formdata,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };


  return (
    <div>
      <h1 id="title">Home</h1>
      <div id="container">
        <div id="productGrid">
          <Grid
            products={products}
            addToCart={upDateProduct}
          />
        </div>
        <div id="cart">
          <Cart 
  
            products={cartProducts} 
            removeFromCart={upDateProduct} 
          />
        </div>
      </div>
      <div id="AddForm">
        <h2>Ajouter un produit</h2>
        <form onSubmit={() => {addProduct()}}>
        
          <input type="text" name="name" placeholder="Nom"  value={formdata.name} onChange={handleChange}/>
          <input type="number" name="price" placeholder="Prix" value={formdata.price} onChange={handleChange}/>
          <input type="text" name="description" placeholder="Description" value={formdata.description} onChange={handleChange} />
          <input type="text" name="image" placeholder="Image" value={formdata.image} onChange={handleChange}/>
          <input type="number" name="quantity" placeholder="Quantité" value={formdata.quantity} onChange={handleChange}/>
          <input type="text" name="category" placeholder="Categorie"value={formdata.category} onChange={handleChange} />
          <button id="buttonForm" >Envoyer</button>
        </form>
      </div>

    </div>
  );
};

export default Home;
