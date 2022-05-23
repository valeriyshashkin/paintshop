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
import { PlusCircleIcon } from "@heroicons/react/outline";

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

  if (data?.error) {
    router.push("/admin");
  }

  if (!data || data.error) {
    return (
      <>
        <div className="bg-gray-100 w-[140px] h-[48px] rounded-lg my-4"></div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />  
          <CardSkeleton />
        </div>
      </>
    );
  }

  return (
    <>
      <div className="btn btn-primary gap-2 my-4" onClick={toCreate}>
        <PlusCircleIcon className="w-6 h-6" />
        Добавить
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
    </>
  );
}

Products.getLayout = (page) => {
  return (
    <>
      <Head>
        <title>Товары</title>
      </Head>
      <Content>
        <Header admin />
        <Navigation active="products" />
        {page}
      </Content>
    </>
  );
};
