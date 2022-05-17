import Content from "../../components/Content";
import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import { XCircleIcon } from "@heroicons/react/outline";
import classNames from "classnames";

export default function Admin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();

  function handleEmail(e) {
    setEmail(e.target.value);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  function login() {
    setLoading(true);
    fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (!res.error) {
          router.push("/admin/products");
          return;
        }

        setError(true);
        setLoading(false);
      });
  }

  function submit({ key }) {
    if (key !== "Enter") {
      return;
    }

    login();
  }

  return (
    <div className="flex flex-col max-w-sm mx-auto pt-48 space-y-4">
      <h1 className="text-3xl font-bold text-center">Вход</h1>
      {error && (
        <div className="alert alert-error">
          <div>
            <XCircleIcon className="h-6 w-6" />
            <span>Неправильно введена почта или пароль.</span>
          </div>
        </div>
      )}
      <input
        className="input bg-gray-200"
        onKeyUp={submit}
        placeholder="Почта"
        value={email}
        onChange={handleEmail}
      />
      <input
        className="input bg-gray-200"
        onKeyUp={submit}
        placeholder="Пароль"
        value={password}
        onChange={handlePassword}
        type="password"
      />
      <button
        className={classNames("btn btn-primary", { loading: loading })}
        onClick={login}
      >
        Войти
      </button>
    </div>
  );
}

Admin.getLayout = (page) => {
  return (
    <>
      <Head>
        <title>Вход</title>
      </Head>
      <Content>{page}</Content>
    </>
  );
};
