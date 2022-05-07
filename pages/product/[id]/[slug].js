import Header from "../../../components/Header";
import Content from "../../../components/Content";
import Head from "next/head";
import { useState } from "react";
import prisma from "../../../utils/prisma";
import slugify from "slugify";
import useSWR from "swr";
import fetcher from "../../../utils/fetcher";
import { useEffect } from "react";
import { getCookie, setCookies } from "cookies-next";
import { useSWRConfig } from "swr";

function Button({ active, onClick, skeleton }) {
  return (
    <>
      <div onClick={onClick} className="button">
        {active ? "Добавлено" : "Добавить в корзину"}
      </div>
      <style jsx>{`
        .button {
          background: ${skeleton
            ? "lightgray"
            : active
            ? "white"
            : "var(--blue)"};
          color: ${skeleton ? "lightgray" : active ? "black" : "white"};
          font-size: 16px;
          display: inline-block;
          width: 100%;
          text-align: center;
          padding: 15px 0;
          border-radius: var(--radius);
          cursor: ${skeleton ? "auto" : "pointer"};
          border: 1px solid
            ${skeleton ? "lightgray" : active ? "black" : "var(--blue)"};
          user-select: none;
        }
      `}</style>
    </>
  );
}

export default function Product({ name, description, price, publicId }) {
  const [active, setActive] = useState(false);
  const { data } = useSWR("/api/cart", fetcher);
  const { mutate } = useSWRConfig();

  function toggleActive() {
    if (!active) {
      const cart = JSON.parse(getCookie("cart") || "[]");
      cart.push(publicId);
      setCookies("cart", JSON.stringify(cart));
    } else {
      const cart = JSON.parse(getCookie("cart") || "[]");
      setCookies("cart", JSON.stringify(cart.filter((id) => id !== publicId)));
    }

    setActive(!active);
    mutate("/api/cart");
  }

  useEffect(() => {
    if (data) {
      setActive(data.some((product) => product.publicId === publicId));
    }
  }, [data]);

  return (
    <div className="page">
      <div className="image half"></div>
      <div className="after-image half">
        <h1>{name}</h1>
        <p className="price">{price} ₽</p>
        {data ? (
          <Button onClick={toggleActive} active={active} />
        ) : (
          <Button skeleton />
        )}
        <p className="description-title">Описание</p>
        <p className="description">{description}</p>
      </div>
      <style jsx>{`
        .image {
          width: 100%;
          padding-bottom: 100%;
          background: gray;
        }

        @media (min-width: 700px) {
          .image {
            padding-bottom: 50%;
          }

          .after-image {
            margin-left: 10px;
          }

          .half {
            width: 50%;
          }

          .page {
            display: flex;
            align-items: flex-start;
          }
        }

        h1 {
          margin: 10px 0;
        }

        .price {
          font-weight: bold;
          font-size: 30px;
          margin: 0;
          margin-bottom: 15px;
        }

        .description-title {
          font-size: 20px;
          margin-bottom: 15px;
        }

        .description {
          margin-top: 0;
        }
      `}</style>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const product = await prisma.product.findUnique({
    where: {
      publicId: params.id,
    },
    select: {
      name: true,
      description: true,
      price: true,
      publicId: true,
    },
  });

  return {
    props: product,
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  const products = await prisma.product.findMany({
    select: {
      publicId: true,
      name: true,
    },
  });

  const paths = products.map(({ publicId, name }) => ({
    params: {
      id: publicId,
      slug: slugify(name),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

Product.getLayout = (page) => {
  return (
    <>
      <Head>
        <title>Товар</title>
      </Head>
      <Header />
      <Content>{page}</Content>
    </>
  );
};
