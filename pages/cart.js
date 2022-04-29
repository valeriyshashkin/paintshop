import Header from "../components/Header";
import Card from "../components/Card";
import Content from "../components/Content";
import Head from "next/head";
import { useState } from "react";
import Link from "next/link";
import useSWR from "swr";
import fetcher from "../utils/fetcher";
import { useEffect } from "react";

export default function Cart() {
  const [cartIsEmpty, setCartIsEmpty] = useState(
    typeof window !== "undefined" ? localStorage.getItem("cart") : true
  );
  const publicIds =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
  const [products, setProducts] = useState([]);
  let data;
  let mutate;

  if (publicIds.length > 0) {
    const { data: swrData, mutate: swrMutate } = useSWR(
      `/api/cart/${JSON.stringify(publicIds)}`,
      fetcher
    );
    data = swrData;
    mutate = swrMutate;
  }

  function onRemoveFromCart(publicId) {
    mutate(products.filter(id => id !== publicId), false);
  }

  useEffect(() => {
    if (data) {
      setProducts(data);
      setCartIsEmpty(false);
    }
  }, [data]);

  if (!data) {
    return "Загрузка...";
  }

  return (
    <>
      <div>
        <p className="total">
          Итого: <span className="price">1000 ₽</span>
        </p>
        <p className="tip">
          Чтобы заказать товары, напишите нам на почту{" "}
          <a href="mailto:admin@admin.com">admin@admin.com</a>. В тексте письма
          укажите товары, которые вы хотите приобрести.
        </p>
      </div>
      {cartIsEmpty && (
        <div className="card-is-empty">
          Корзина пуста. Добавьте любой товар из{" "}
          <Link href="/">
            <a>каталога</a>
          </Link>
        </div>
      )}
      {products.map(({ name, price, href, publicId }, id) => (
        <Card
          cart
          key={id}
          title={name}
          price={price}
          href={href}
          publicId={publicId}
          onRemoveFromCart={onRemoveFromCart}
        />
      ))}
      <style jsx>{`
        div {
          padding-bottom: 10px;
        }

        .card-is-empty {
          margin-top: 120px;
          text-align: center;
        }

        p {
          margin: 0;
        }

        .price {
          font-weight: bold;
        }

        .tip {
          margin-top: 10px;
        }

        .total {
          font-size: 30px;
        }
      `}</style>
    </>
  );
}

Cart.getLayout = (page) => {
  return (
    <>
      <Head>
        <title>Корзина</title>
      </Head>
      <Content>
        <Header back cart />
        {page}
      </Content>
    </>
  );
};
