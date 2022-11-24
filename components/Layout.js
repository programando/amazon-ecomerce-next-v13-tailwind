import Head from 'next/head';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import { Store } from '../utils/Store';

export default function Layout({ title, children }) {
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);

  return (
    <>
      <Head>
        <title>{title ? title + ' - Amazona' : ''}</title>
        <meta name="description" content="Ecommerce Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col min-h-screen justify-between">
        <header>
          <nav className="flex h-12 justify-between shadow-md items-center px-4">
            <Link className="text-lg font-bold" href="/">
              Amazona
            </Link>
            <div>
              <Link className="p-2" href="/cart">
                Cart
                {cartItemsCount > 0 && (
                  <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                    {cartItemsCount}
                  </span>
                )}
              </Link>
              <Link className="p-2" href="/login">
                Login
              </Link>
            </div>
          </nav>
        </header>
        <main className="container m-auto mt-4 ">{children}</main>
        <footer className="flex justify-center items-center h-10 shadow-inner">
          <p> Copyright 2022</p>
        </footer>
      </div>
    </>
  );
}
