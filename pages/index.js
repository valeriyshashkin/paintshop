import Card from "../components/Card";
import Header from "../components/Header";
import Content from "../components/Content";
import Head from "next/head";
import getProducts from "../utils/getProducts";
import useSWR from "swr";
import fetcher from "../utils/fetcher";

export default function Home({ products, preview }) {
  const { data } = useSWR("/api/cart", fetcher);

  return (
    <>
      <Header preview={preview} />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map(({ name, price, href, publicId, src }, id) => (
          <Card
            src={src}
            data={data}
            key={id}
            title={name}
            price={price}
            publicId={publicId}
            href={href}
          />
        ))}
      </div>
    </>
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

Home.getLayout = (page) => {
  return (
    <>
      <Head>
        <title>Каталог красок</title>
      </Head>
      <Content>{page}</Content>
    </>
  );
};
