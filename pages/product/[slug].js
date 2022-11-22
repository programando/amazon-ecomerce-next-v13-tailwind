import Image from 'next/image';
import Layout from '../../components/Layout';
import Link from 'next/link';
import React, { useContext } from 'react';
import data from '../../utils/data.js';
import { useRouter } from 'next/router';
import { Store } from '../../utils/Store';

export default function ProductScreen() {
  const { state, dispatch } = useContext(Store);
  const { query } = useRouter();
  const router = useRouter();
  const { slug } = query;
  const product = data.products.find((x) => x.slug === slug);
  if (!product) {
    return <div>Product not found</div>;
  }
  const addToCartHandler = () => {
    const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    if (product.countInStock < quantity) {
      alert('no product in store');
      return;
    }
    dispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...product, quantity: quantity },
    });
    router.push('/cart');
  };

  return (
    <Layout title={product.name}>
      <div className="py-2">
        <Link className="font-bold" href="/">
          {' '}
          Back to products
        </Link>
      </div>
      <div className="grid md:grid-cols-4 md:gap-8">
        <div className="md:col-span-2">
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
            layut="responsive"
          ></Image>
        </div>
        <div>
          <ul>
            <li>
              <h1 className="text-lg"> {product.name}</h1>
            </li>
            <li> Category : {product.category}</li>
            <li> Brand : {product.brand}</li>
            <li>
              {' '}
              {product.rating} of {product.numReviews} reviwes
            </li>
            <li> description : {product.description}</li>
          </ul>
        </div>
        <div className="card  p-5">
          <div className="mb-2 flex justify-between">
            <div>Price</div>
            <div>${product.price}</div>
          </div>
          <div className="mb-2 flex justify-between">
            <div>status</div>
            <div>{product.countInStock > 0 ? 'In stock' : 'unavailable'}</div>
          </div>
          <button className="primary-button w-full" onClick={addToCartHandler}>
            {' '}
            Add to cart
          </button>
        </div>
      </div>
    </Layout>
  );
}
