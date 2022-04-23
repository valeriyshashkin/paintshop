import Head from "next/head";
import Header from "../../../components/Header";
import Content from "../../../components/Content";
import Product from "../../../components/Product";

export default function Create() {
  return <Product />;
}

Create.getLayout = (page) => {
  return (
    <>
      <Head>
        <title>Добавить товар</title>
      </Head>
      <Header admin />
      <Content>{page}</Content>
    </>
  );
};
