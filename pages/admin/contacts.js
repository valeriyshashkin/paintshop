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
    <div className="flex flex-col max-w-sm">
      <label className="bg-gray-100 my-4 h-[20px] rounded-lg">
      </label>
      <div className="bg-gray-100 mb-4 h-[48px] rounded-lg"></div>
      <div className="bg-gray-100 h-[48px] rounded-lg my-4"></div>
    </div>
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
    <div className="flex flex-col max-w-sm">
      <label className="label my-2">
        <span className="label-text">Электронная почта для заказов</span>
      </label>
      <input
        className="input bg-gray-200 mb-4"
        value={email}
        onChange={changeEmail}
      />
      <div
        className={classNames("btn btn-primary", { loading: updating })}
        onClick={updating ? undefined : save}
      >
        Сохранить
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
