import Head from "next/head";
import Content from "../../../components/Content";
import Header from "../../../components/Header";
import Product from "../../../components/Product";

export default function Edit() {
  return <Product edit />;
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
