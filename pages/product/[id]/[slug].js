import { useRouter } from "next/router";
import Header from "../../../components/Header";
import Content from "../../../components/Content";
import Head from "next/head";

export default function Product() {
  const router = useRouter();
  const { id, slug } = router.query;

  return (
    <div className="page">
      <div className="image half"></div>
      <div className="after-image half">
        <h1>Белая краска тратата тратата тратата</h1>
        <p className="price">1000 ₽</p>
        <div className="button">Добавить в корзину</div>
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

        .button {
          background: var(--blue);
          color: white;
          font-size: 16px;
          display: inline-block;
          width: 100%;
          text-align: center;
          padding: 15px 0;
          border-radius: var(--radius);
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
