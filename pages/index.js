import Card from "../components/Card";
import Header from "../components/Header";
import Content from "../components/Content";
import Head from "next/head";
import getProducts from "../utils/getProducts";
import useSWR from "swr";
import fetcher from "../utils/fetcher";

export default function Home({ products }) {
  const { data } = useSWR("/api/cart", fetcher);

  return products.map(({ name, price, href, publicId }, id) => (
    <Card data={data} key={id} title={name} price={price} publicId={publicId} href={href} />
  ));
}

export async function getStaticProps() {
  return {
    props: { products: await getProducts() },
    revalidate: 60,
  };
}

Home.getLayout = (page) => {
  return (
    <>
      <Head>
        <title>Каталог красок</title>
      </Head>
      <Content>
        <Header />
        {page}
      </Content>
    </>
  );
};
