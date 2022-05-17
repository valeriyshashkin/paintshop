import Head from "next/head";
import Content from "../../components/Content";
import Header from "../../components/Header";
import Navigation from "../../components/Navigation";
import useSWR, { mutate } from "swr";
import fetcher from "../../utils/fetcher";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import classNames from "classnames";

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
  const { data, mutate } = useSWR("/api/contacts", fetcher);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const router = useRouter();

  function changeEmail(e) {
    setEmail(e.target.value);
  }

  function save() {
    setUpdating(true);
    fetch("/api/contacts/edit", {
      method: "POST",
      body: JSON.stringify({ email }),
    }).then(() => {
      mutate({ contacts: { email } });
      setUpdating(false);
    });
  }

  useEffect(() => {
    fetch("/api/user")
      .then((res) => res.json())
      .then(({ error }) => {
        if (error) {
          router.push("/admin");
          return;
        }

        setLoading(false);
      });
  }, [router]);

  useEffect(() => {
    if (data) {
      setEmail(data.contacts.email);
    }
  }, [data]);

  if (!data || loading) {
    return <ContactsSkeleton />;
  }

  return (
    <div className="flex flex-col max-w-sm space-y-4">
      <label>Электронная почта для заказов</label>
      <input
        className="input bg-gray-200"
        value={email}
        onChange={changeEmail}
      />
      <div
        className={classNames("btn btn-primary", { loading: updating })}
        onClick={updating ? undefined : save}
      >
        {updating ? "Загрузка..." : "Сохранить"}
      </div>
    </div>
  );
}

Contacts.getLayout = (page) => {
  return (
    <>
      <Head>
        <title>Контакты</title>
      </Head>
      <Content>
        <Header admin />
        <Navigation active="contacts" />
        {page}
      </Content>
    </>
  );
};
