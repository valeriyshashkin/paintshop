import Header from "../components/Header";
import Card from "../components/Card";
import Content from "../components/Content";
import Head from "next/head";
import { useState } from "react";
import Link from "next/link";
import useSWR from "swr";
import fetcher from "../utils/fetcher";
import { useEffect } from "react";
import { getCookie } from "cookies-next";
import { CardSkeleton } from "../components/Card";
import client, { urlFor } from "../client";
import slugify from "slugify";

export default function Cart({ contacts }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const [forceUpdateToggler, setForceUpdateToggler] = useState(false);
  const [textarea, setTextarea] = useState("");

  function updateTextarea() {
    const counts = JSON.parse(localStorage.getItem("counts"));

    const result = data
      .map(
        (c) =>
          `${c.name} - ${c.price} ₽ x ${
            counts.find((count) => count.publicId === c._id).count
          }`
      )
      .join("\n");

    setTextarea(`${result}\nИтого: ${totalPrice} ₽`);
  }

  function rerender() {
    setForceUpdateToggler((v) => !v);
  }

  const { data } = useSWR(getCookie("cart") ? "/api/cart" : null, fetcher);

  useEffect(() => {
    if (!getCookie("cart")) {
      setLoading(false);
    }

    if (data) {
      const counts = JSON.parse(localStorage.getItem("counts"));
      setTotalPrice(
        data.reduce(
          (a, b) =>
            a +
            Number(b.price) * counts.find((c) => c.publicId === b._id).count,
          0
        )
      );
      setProducts(data);
      setLoading(false);
    }
  }, [data, forceUpdateToggler]);

  return (
    <Content>
      <Head>
        <title>Корзина</title>
      </Head>
      <Header />
      <div>
        <div className="fixed bottom-0 left-0 right-0 bg-white z-10 border-t text-3xl">
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
                  href={`mailto:${
                    contacts.find((c) => c.name === "Email").value
                  }`}
                >
                  {contacts.find((c) => c.name === "Email").value}
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
      {loading && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      )}
      {!loading && !products.length && (
        <div className="text-center mt-24">
          Корзина пуста. Добавьте любой товар из{" "}
          <Link href="/">
            <a className="link link-primary">каталога</a>
          </Link>
        </div>
      )}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {products.map(({ name, price, photo, _id }) => (
          <Card
            src={urlFor(photo).width(500).url()}
            key={_id}
            title={name}
            price={price}
            href={`/product/${_id}/${slugify(name)}`}
            publicId={_id}
            data={data}
            onChange={rerender}
            cart
          />
        ))}
      </div>
    </Content>
  );
}

export async function getStaticProps() {
  const contacts = await client.fetch(`*[_type == "contacts"]`);

  return {
    props: { contacts },
    revalidate: 60,
  };
}
