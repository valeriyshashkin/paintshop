import Head from "next/head";
import Content from "../../components/Content";
import Header from "../../components/Header";
import Navigation from "../../components/Navigation";

export default function Contacts() {
  return (
    <>
      <div className="page">
        <label>Электронная почта для заказов</label>
        <input />
      </div>
      <style jsx>{`
        .page {
          margin-top: 20px;
        }

        input {
          display: block;
          padding: 15px;
          background: lightgray;
          border: none;
          outline-color: var(--blue);
          border-radius: var(--radius);
          margin: 20px 0;
          width: 100%;
          box-sizing: border-box;
        }

        @media (min-width: 700px) {
          input {
            width: 50%;
          }
        }
      `}</style>
    </>
  );
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
