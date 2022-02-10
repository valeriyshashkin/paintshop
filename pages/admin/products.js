import Head from "next/head";
import Content from "../../components/Content";
import Header from "../../components/Header";
import Navigation from "../../components/Navigation";

export default function Products() {
  return "Товары";
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
