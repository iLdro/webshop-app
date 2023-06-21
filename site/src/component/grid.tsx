import { Product } from '../type/product.ts';
import ProductCard from '../component/product_card.tsx';
import '../assets/styles/grid.css';

interface GridProps {
  products: Product[] | string;
  addToCart(props: Product): void;
}

const Grid = ({ products, addToCart }: GridProps) => {
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
            key={product._id}
            product={product}
            addToCart={addToCart}
          />
        ))}
      </div>
    </>
  );
}

export default Grid;
