import Header from "../components/Header";
import Card from "../components/Card";
import Content from "../components/Content";
import Head from "next/head";
import { useState } from "react";
import Link from "next/link";
import { useEffect } from "react";
import { CardSkeleton } from "../components/Card";
import slugify from "slugify";
import { promises as fs } from "fs";
import path from "path";
import { parse } from "yaml";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

const productsInCartAtom = atomWithStorage("productsInCart", []);

export default function Cart({ contacts }) {
  const [productsInCart] = useAtom(productsInCartAtom);

  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [forceUpdateToggler, setForceUpdateToggler] = useState(false);
  const [textarea, setTextarea] = useState("");

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

  return (
    <Content>
      <Head>
        <title>Корзина</title>
      </Head>
      <Header />
      <div>
        <div className="fixed bottom-0 bg-neutral left-0 right-0 z-10 text-3xl">
          <div className="max-w-screen-lg mx-auto p-4 flex items-center justify-between">
            <span className="font-bold">{totalPrice} ₽</span>
            <label
              htmlFor="buy"
              onClick={updateTextarea}
              className="btn btn-primary modal-button"
            >
              Купить
            </label>
          </div>
          <input type="checkbox" id="buy" className="modal-toggle" />
          <div className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Заказ товаров</h3>
              <p className="py-4 text-base">
                Чтобы заказать выбранные товары, скопируйте список товаров ниже
                и отправьте его на{" "}
                <a
                  className="link link-primary"
                  href={`mailto:${contacts["почта"]}`}
                >
                  {contacts["почта"]}
                </a>
              </p>
              <textarea
                value={textarea}
                readOnly
                className="textarea textarea-bordered w-full mb-4 h-32"
              ></textarea>
              <label
                htmlFor="buy"
                className="btn btn-primary btn-outline w-full"
              >
                Закрыть
              </label>
            </div>
          </div>
        </div>
      </div>
      {products.length === 0 && (
        <div className="text-center mt-24">
          Корзина пуста. Добавьте любой товар из{" "}
          <Link href="/">
            <a className="link link-primary">каталога</a>
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
  );
}

export async function getStaticProps() {
  const contacts = parse(
    await fs.readFile(path.join(process.cwd(), "контакты.yml"), "utf8")
  );

  return { props: { contacts } };
}
