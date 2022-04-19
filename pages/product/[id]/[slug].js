import Header from "../../../components/Header";
import Content from "../../../components/Content";
import Head from "next/head";
import { useState } from "react";

function Button({ active, onClick }) {
  return (
    <>
      <div onClick={onClick} className="button">{active ? "Добавлено" : "Добавить в корзину"}</div>
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
  )
}

export default function Product() {
  const [active, setActive] = useState(false);

  function toggleActive() {
    setActive(!active);
  }

  return (
    <div className="page">
      <div className="image half"></div>
      <div className="after-image half">
        <h1>Белая краска тратата тратата тратата</h1>
        <p className="price">1000 ₽</p>
        <Button onClick={toggleActive} active={active} />
        <p className="description-title">Описание</p>
        <p className="description">
          Здесь должно быть описание тратата тратата тратата тратата тратата
          тратата тратата тратата тратата тратата тратата тратата тратата
        </p>
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
