import Content from "../../components/Content";
import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";

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

  return (
    <>
      <h1>Вход</h1>
      {error && (
        <div className="error">Неправильно введена почта или пароль.</div>
      )}
      <input placeholder="Почта" value={email} onChange={handleEmail} />
      <input placeholder="Пароль" value={password} onChange={handlePassword} />
      <button className="button" onClick={login} disabled={loading}>
        {loading ? "Загрузка..." : "Войти"}
      </button>
      <style jsx>{`
        h1 {
          text-align: center;
          margin: 0;
          margin-top: 100px;
          font-size: 40px;
        }

        input {
          display: block;
          margin-top: 20px;
          padding: 15px;
          font-size: 20px;
          border-radius: var(--radius);
          border: none;
          background: lightgray;
          outline-color: var(--blue);
          width: 100%;
          box-sizing: border-box;
        }

        .button {
          padding: 15px 0;
          font-size: 20px;
          color: white;
          background: var(--blue);
          text-align: center;
          margin-top: 20px;
          border-radius: var(--radius);
          width: 100%;
          border: none;
        }

        .button[disabled] {
          background: gray;
        }

        .error {
          background: var(--red);
          padding: 15px;
          border-radius: var(--radius);
          color: white;
          margin-top: 15px;
          border: 1px solid red;
        }
      `}</style>
    </>
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
