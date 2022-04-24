import Header from "../../../components/Header";
import Content from "../../../components/Content";
import Head from "next/head";
import { useState } from "react";
import prisma from "../../../utils/prisma";
import slugify from "slugify";

function Button({ active, onClick }) {
  return (
    <>
      <div onClick={onClick} className="button">
        {active ? "Добавлено" : "Добавить в корзину"}
      </div>
      <style jsx>{`
        .button {
          background: ${active ? "white" : "var(--blue)"};
          color: ${active ? "black" : "white"};
          font-size: 16px;
          display: inline-block;
          width: 100%;
          text-align: center;
          padding: 15px 0;
          border-radius: var(--radius);
          cursor: pointer;
          border: 1px solid ${active ? "black" : "var(--blue)"};
          user-select: none;
        }
      `}</style>
    </>
  );
}

export default function Product({ name, description, price }) {
  const [active, setActive] = useState(false);

  function toggleActive() {
    setActive(!active);
  }

  return (
    <div className="page">
      <div className="image half"></div>
      <div className="after-image half">
        <h1>{name}</h1>
        <p className="price">{price} ₽</p>
        <Button onClick={toggleActive} active={active} />
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
