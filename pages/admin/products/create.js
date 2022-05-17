import Head from "next/head";
import Header from "../../../components/Header";
import Content from "../../../components/Content";
import Product from "../../../components/Product";
import { ProductSkeleton } from "../../../components/Product";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Create() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/user")
      .then((res) => res.json())
      .then(({ error }) => {
        if (error) {
          router.push("/admin");
          return;
        }

        setLoading(false);
      });
  });

  if (loading) {
    return <ProductSkeleton />;
  }

  return <Product />;
}

Create.getLayout = (page) => {
  return (
    <>
      <Head>
        <title>Добавить товар</title>
      </Head>
      <Content>
        <Header admin />
        {page}
      </Content>
    </>
  );
};
