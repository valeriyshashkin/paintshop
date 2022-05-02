import Head from "next/head";
import Content from "../../components/Content";
import Header from "../../components/Header";
import Navigation from "../../components/Navigation";
import useSWR from "swr";
import fetcher from "../../utils/fetcher";
import { useState } from "react";
import { useEffect } from "react";

function ContactsSkeleton() {
  return (
    <>
      <div className="page">
        <label></label>
        <div className="input"></div>
        <div className="button">Сохранить</div>
      </div>
      <style jsx>{`
        .button {
          border-radius: 8px;
          color: lightgray;
          background: lightgray;
          display: inline-block;
          padding: 10px;
          user-select: none;
        }

        .page {
          margin-top: 20px;
        }

        label {
          background: lightgray;
          border-radius: var(--radius);
          width: 100px;
          display: block;
          height: 19px;
        }

        .input {
          display: block;
          padding: 15px;
          background: lightgray;
          border: none;
          outline-color: var(--blue);
          border-radius: var(--radius);
          margin: 20px 0;
          width: 100%;
          box-sizing: border-box;
          height: 46px;
        }

        @media (min-width: 700px) {
          .input {
            width: 50%;
          }
        }
      `}</style>
    </>
  );
}

export default function Contacts() {
  const { data } = useSWR("/api/contact/get", fetcher);
  const [email, setEmail] = useState("");

  function changeEmail(e) {
    setEmail(e.target.value);
  }

  useEffect(() => {
    if (data) {
      setEmail(data.contacts.email);
    }
  }, [data]);

  if (!data) {
    return <ContactsSkeleton />;
  }

  return (
    <>
      <div className="page">
        <label>Электронная почта для заказов</label>
        <input value={email} onChange={changeEmail} />
        <div className="button">Сохранить</div>
      </div>
      <style jsx>{`
        .button {
          border-radius: 8px;
          cursor: pointer;
          color: white;
          background: var(--blue);
          display: inline-block;
          padding: 10px;
        }

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
