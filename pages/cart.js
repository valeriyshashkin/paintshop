import Header from "../components/Header";
import Card from "../components/Card";
import Content from "../components/Content";
import Head from "next/head";
import { useState } from "react";
import Link from "next/link";
import useSWR from "swr";
import fetcher from "../utils/fetcher";
import { useEffect } from "react";
import { getCookie, setCookies } from "cookies-next";
import { CardSkeleton } from "../components/Card";
import getContacts from "../utils/getContacts";

export default function Cart({ contacts }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { data, mutate } = useSWR(
    getCookie("cart") ? "/api/cart" : null,
    fetcher
  );

  function onRemoveFromCart(publicId) {
    mutate(() => {
      const filteredIds = JSON.parse(getCookie("cart")).filter(
        (p) => p !== publicId
      );
      setCookies("cart", JSON.stringify(filteredIds));
      const filteredProducts = products.filter((p) => p.publicId !== publicId);
      setProducts(filteredProducts);
      return filteredProducts;
    }, false);
  }

  useEffect(() => {
    if (!getCookie("cart")) {
      setLoading(false);
    }

    if (data) {
      setProducts(data);
      setLoading(false);
    }
  }, [data]);

  return (
    <>
      <div>
        <p className="total">
          Итого: <span className="price">1000 ₽</span>
        </p>
        <p className="tip">
          Чтобы заказать товары, напишите нам на почту{" "}
          <a href={`mailto:${contacts.email}`}>{contacts.email}</a>. В тексте письма
          укажите товары, которые вы хотите приобрести.
        </p>
      </div>
      {loading && (
        <>
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </>
      )}
      {!loading && !products.length && (
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

export async function getStaticProps() {
  return {
    props: { contacts: await getContacts() },
    revalidate: 60,
  };
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
