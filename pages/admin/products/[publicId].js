import Head from "next/head";
import Content from "../../../components/Content";
import Header from "../../../components/Header";
import Product from "../../../components/Product";
import { useRouter } from "next/router";
import useSWR from "swr";
import fetcher from "../../../utils/fetcher";
import { useEffect } from "react";
import { useState } from "react";
import { ProductSkeleton } from "../../../components/Product";

export default function Edit() {
  const [product, setProduct] = useState();
  const router = useRouter();
  const { publicId } = router.query;
  const { data } = useSWR(`/api/products/${publicId}`, fetcher);

  useEffect(() => {
    if (data) {
      setProduct(data.product);
    }
  }, [data]);

  if (!data) {
    return <ProductSkeleton />;
  }

  return <Product edit={product} publicId={publicId} />;
}

Edit.getLayout = (page) => {
  return (
    <>
      <Head>
        <title>Редактировать товар</title>
      </Head>
      <Header admin />
      <Content>{page}</Content>
    </>
  );
};
