import Header from "../components/Header";
import Card from "../components/Card";
import Content from "../components/Content";
import Head from "next/head";
import { useState } from "react";
import Link from "next/link";
import { useEffect } from "react";
import { useAtom } from "jotai";
import data from "../data";
import total from "../utils/total";
import slugify from "slugify";
import cartAtom from "../utils/cart";
import { useRouter } from "next/router";

export default function Cart() {
  const router = useRouter();
  const [totalPrice, setTotalPrice] = useState(0);
  const [mount, setMount] = useState(false);
  const [showCart, setShowCart] = useState([]);

  useEffect(() => {
    if (router.isReady) {
      setTotalPrice(total(JSON.parse(router.query.cart)));
      setShowCart(JSON.parse(router.query.cart));
    }
  }, [router]);

  useEffect(() => {
    setMount(true);
  }, []);

  return (
    <>
      <Header />
      <Content>
        <Head>
          <title>Заказ</title>
        </Head>
        {/* <div>
          <div className="fixed bg-[#121212] bottom-0 left-0 right-0 z-10 text-3xl">
            <div className="max-w-screen-lg mx-auto p-4 flex items-center justify-between">
              <span className="font-bold">{totalPrice} ₽</span>
              <span className="py-2 rounded-xl text-3xl font-bold">
                Заказ
              </span>
            </div>
          </div>
        </div> */}
        {mount && (
          <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-0">
            {showCart.map(({ name, amount }, i) => (
              <Card
                showCart
                amount={amount}
                image={
                  data.products.find(
                    (p) => name === slugify(p.name).toLowerCase()
                  ).image
                }
                key={i}
                name={
                  data.products.find(
                    (p) => name === slugify(p.name).toLowerCase()
                  ).name
                }
                price={
                  data.products.find(
                    (p) => name === slugify(p.name).toLowerCase()
                  ).price
                }
              />
            ))}
          </div>
        )}
        <div className="h-16"></div>
      </Content>
    </>
  );
}
