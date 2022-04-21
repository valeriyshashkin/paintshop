import Head from "next/head";
import Header from "../../../components/Header";
import Content from "../../../components/Content";

export default function Create() {
  return "Добавить товар";
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
