import ProductItem from './ProductItem';
import classes from './Products.module.css';

const DUMMY_PRODUCTS = [
  {
    id: 'p1',
    price: 6,
    title: 'my book',
    description: 'a book',
  },
  {
    id: 'p2',
    price: 12,
    title: 'other book',
    description: 'a different book',
  }
];

const Products = (props) => {

  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCTS.map(book =>
          <ProductItem
            id={book.id}
            title={book.title}
            price={book.price}
            description={book.description}
          />)}
      </ul>
    </section>
  );
};

export default Products;
