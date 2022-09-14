import Header from "../components/Header";
import Card from "../components/Card";
import Content from "../components/Content";
import Head from "next/head";
import { useState } from "react";
import Link from "next/link";
import { useEffect } from "react";
import slugify from "slugify";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import data from "../data";

const productsInCartAtom = atomWithStorage("productsInCart", []);

export default function Cart() {
  const [productsInCart] = useAtom(productsInCartAtom);

  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [forceUpdateToggler, setForceUpdateToggler] = useState(false);
  const [textarea, setTextarea] = useState("");

  const [modal, setModal] = useState(false);

  function updateTextarea() {
    const counts = JSON.parse(localStorage.getItem("counts"));

    const result = productsInCart
      .map(
        (c) =>
          `${c.content.split("+")[0]} - ${c.content.split("+")[1]} ₽ x ${
            counts.find((count) => count.publicId === c.id).count
          }`
      )
      .join("\n");

    setTextarea(`${result}\nИтого: ${totalPrice} ₽`);
  }

  function rerender() {
    setForceUpdateToggler((v) => !v);
  }

  useEffect(() => {
    if (productsInCart) {
      const counts = JSON.parse(localStorage.getItem("counts"));
      setTotalPrice(
        productsInCart.reduce(
          (a, b) =>
            a +
            Number(b.content.split("+")[1]) *
              counts.find((c) => c.publicId === b.id).count,
          0
        )
      );
      setProducts(productsInCart);
    }
  }, [productsInCart, forceUpdateToggler]);

  function showModal() {
    setModal(true);
  }

  function hideModal() {
    setModal(false);
  }

  return (
    <>
      <Header />
      <Content>
        <Head>
          <title>Корзина</title>
        </Head>
        <div>
          <div className="fixed bottom-0 left-0 right-0 z-10 text-3xl">
            <div className="max-w-screen-lg mx-auto p-4 flex items-center justify-between">
              <span className="font-bold">{totalPrice} ₽</span>
              <button
                onClick={showModal}
                className="bg-blue-500 px-4 py-2 rounded-xl text-lg"
              >
                Заказать
              </button>
            </div>
          </div>
        </div>
        {modal && (
          <div className="absolute top-0 left-0 right-0 bottom-0 rounded-lg bg-neutral-800 p-4 m-auto w-1/2 h-1/2">
            Чтобы заказать выбранные товары, скопируйте список товаров ниже и
            отправьте его на{" "}
            <a className="link link-primary" href={`mailto:${data.email}`}>
              {data.email}
            </a>
            {/* <textarea
            value={textarea}
            readOnly
            className="textarea textarea-bordered w-full mb-4 h-32"
          ></textarea> */}
            <button
              onClick={hideModal}
              className="bg-blue-500 py-2 rounded-xl text-lg w-full"
            >
              Закрыть
            </button>
          </div>
        )}
        {products.length === 0 && (
          <div className="text-center mt-48 text-xl">
            Корзина пуста. Добавьте любой товар из{" "}
            <Link href="/">
              <a className="text-blue-500">каталога</a>
            </Link>
          </div>
        )}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {products.map(({ content, attachments, id }) => (
            <Card
              src={attachments[0].url}
              key={id}
              title={content.split("+")[0]}
              price={content.split("+")[1]}
              href={`/product/${id}/${slugify(content.split("+")[0])}`}
              publicId={id}
              productsInCart={productsInCart}
              onChange={rerender}
              cart
            />
          ))}
        </div>
      </Content>
    </>
  );
}
