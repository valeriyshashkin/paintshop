import Card from "../components/Card";
import Header from "../components/Header";
import Content from "../components/Content";
import Head from "next/head";
import getProducts from "../utils/getProducts";

export default function Home({ products }) {
  return products.map(({ name, price, href }, id) => (
    <Card key={id} title={name} price={price} href={href} />
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
