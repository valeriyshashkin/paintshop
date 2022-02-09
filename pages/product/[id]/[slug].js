import { useRouter } from "next/router";
import Header from "../../../components/Header";
import Content from "../../../components/Content";
import Head from "next/head";

export default function Product() {
  const router = useRouter();
  const { id, slug } = router.query;

  return (
    <>
      <div className="image"></div>
      <h1>Белая краска тратата тратата тратата</h1>
      <div className="button">Добавить в корзину</div>
      <p className="description-title">Описание</p>
      <p className="description">
        Здесь должно быть описание тратата тратата тратата тратата тратата
        тратата тратата тратата тратата тратата тратата тратата тратата
      </p>
      <style jsx>{`
        .image {
          width: 100%;
          padding-bottom: 100%;
          background: gray;
        }

        h1 {
          margin: 10px 0;
        }

        .button {
          background: gray;
          color: white;
          font-size: 16px;
          display: inline-block;
          width: 100%;
          text-align: center;
          padding: 15px 0;
          border-radius: 8px;
        }

        .description-title {
          font-size: 20px;
          margin-bottom: 15px;
        }

        .description {
          margin-top: 0;
        }
      `}</style>
    </>
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
