import Head from "next/head";
import Content from "../../components/Content";
import Header from "../../components/Header";
import Navigation from "../../components/Navigation";

export default function Contacts() {
  return "Контакты";
}

Contacts.getLayout = (page) => {
  return (
    <>
      <Head>
        <title>Контакты</title>
      </Head>
      <Header admin />
      <Content>
        <Navigation active="contacts" />
        {page}
      </Content>
    </>
  );
};
