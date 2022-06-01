import Card from "../components/Card";
import Header from "../components/Header";
import Content from "../components/Content";
import Head from "next/head";
import getProducts from "../utils/getProducts";
import useSWR from "swr";
import fetcher from "../utils/fetcher";
import { PlusCircleIcon } from "@heroicons/react/outline";
import Link from "next/link";

export default function Home({ products, preview }) {
  const { data } = useSWR("/api/cart", fetcher);

  return (
    <Content preview={preview}>
      <Head>
        <title>Каталог красок</title>
      </Head>
      <Header preview={preview} />
      {preview && (
        <Link href="/product/create/new">
          <a className="btn btn-outline btn-primary w-full flex mb-4">
            <PlusCircleIcon className="h-6 w-6 mr-2" />
            Добавить товар
          </a>
        </Link>
      )}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.slice(0).reverse().map(({ name, price, href, publicId, src }, id) => (
          <Card
            src={src}
            data={data}
            key={id}
            title={name}
            price={price}
            publicId={publicId}
            href={href}
            disabled={preview}
          />
        ))}
      </div>
    </Content>
  );
}

export async function getStaticProps(context) {
  if (context.preview) {
    return {
      props: { products: await getProducts(), preview: true },
    };
  }

  return {
    props: { products: await getProducts(), preview: false },
    revalidate: 60,
  };
}
