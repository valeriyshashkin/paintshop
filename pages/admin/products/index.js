import Head from "next/head";
import Content from "../../../components/Content";
import Header from "../../../components/Header";
import Navigation from "../../../components/Navigation";
import Card from "../../../components/Card";
import { useRouter } from "next/router";
import useSWR from "swr";
import fetcher from "../../../utils/fetcher";
import { useState } from "react";
import { useEffect } from "react";
import { CardSkeleton } from "../../../components/Card";

export default function Products() {
  const { data } = useSWR("/api/products", fetcher);
  const [products, setProducts] = useState([]);
  const router = useRouter();

  function toCreate() {
    router.push("/admin/products/create");
  }

  useEffect(() => {
    if (data) {
      setProducts(data.products);
    }
  }, [data]);

  if (!data) {
    return (
      <>
        <div className="page">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
        <style jsx>{`
          .page {
            margin-top: 10px;
            margin-bottom: 70px;
          }
        `}</style>
      </>
    );
  }

  if (data.error) {
    router.push("/admin");

    return (
      <>
        <div className="page">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
        <style jsx>{`
          .page {
            margin-top: 10px;
            margin-bottom: 70px;
          }
        `}</style>
      </>
    );
  }

  return (
    <>
      <div className="page">
        {products.map(({ name, price, href, publicId, src }, id) => (
          <Card
            key={id}
            title={name}
            price={price}
            href={href}
            publicId={publicId}
            admin
            src={src}
          />
        ))}
      </div>
      <div className="button-create" onClick={toCreate}>
        <svg
          fill="black"
          xmlns="http://www.w3.org/2000/svg"
          height="48"
          width="48"
        >
          <path d="M22.5 38V25.5H10V22.5H22.5V10H25.5V22.5H38V25.5H25.5V38Z" />
        </svg>
      </div>
      <style jsx>{`
        .page {
          margin-top: 10px;
          margin-bottom: 70px;
        }

        .button-create {
          position: fixed;
          bottom: 0;
          right: 0;
          border-radius: 100px;
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 10px;
          margin-right: 10px;
          cursor: pointer;
          background: white;
          box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
            rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
        }

        @media (min-width: 1024px) {
          .button-create {
            right: 50%;
            transform: translateX(512px);
          }
        }
      `}</style>
    </>
  );
}

Products.getLayout = (page) => {
  return (
    <>
      <Head>
        <title>Товары</title>
      </Head>
      <Header admin />
      <Content>
        <Navigation active="products" />
        {page}
      </Content>
    </>
  );
};
