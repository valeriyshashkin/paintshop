import Link from "next/link";
import { useRouter } from "next/router";
import { ShoppingBagIcon } from "@heroicons/react/outline";
import { LogoutIcon } from "@heroicons/react/outline";
import { UserCircleIcon } from "@heroicons/react/outline";
import { XCircleIcon } from "@heroicons/react/outline";
import { useState } from "react";

export default function Header({ admin, preview }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  function logout() {
    fetch("/api/logout").then(() => router.push("/"));
  }

  function handleEmail(e) {
    setEmail(e.target.value);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  function login() {
    fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then(({ error }) => {
        if (error) {
          setError(error);
          return;
        }

        document.getElementById("login").checked = false;
        router.push("/");
      });
  }

  return (
    <>
      {preview && (
        <div className="text-center mb-4">Вы в режиме редактирования</div>
      )}
      <header className="flex justify-between items-center pb-4">
        <Link href="/">
          <a>
            <h1 className="text-2xl font-bold">Краски</h1>
          </a>
        </Link>
        {!preview && (
          <label
            htmlFor="login"
            className="modal-button cursor-pointer ml-auto mr-4"
          >
            <UserCircleIcon className="w-6 h-6" />
          </label>
        )}

        <input type="checkbox" id="login" className="modal-toggle" />
        <label htmlFor="login" className="modal cursor-pointer">
          <label
            className="modal-box relative flex flex-col items-center space-y-6"
            htmlFor=""
          >
            <h3 className="text-2xl font-bold text-center">Вход</h3>
            {error && (
              <div className="alert alert-error shadow-lg">
                <div>
                  <XCircleIcon className="stroke-current flex-shrink-0 h-6 w-6" />
                  <span>Неправильно введена почта или пароль</span>
                </div>
              </div>
            )}
            <input
              type="text"
              value={email}
              onChange={handleEmail}
              placeholder="Почта"
              className="input input-bordered w-full max-w-lg"
            />
            <input
              type="password"
              value={password}
              onChange={handlePassword}
              placeholder="Пароль"
              className="input input-bordered w-full max-w-lg"
            />
            <button onClick={login} className="btn btn-primary w-full max-w-lg">
              Войти
            </button>
          </label>
        </label>
        {admin ? (
          <LogoutIcon className="w-6 h-6" onClick={logout} />
        ) : (
          <Link href="/cart">
            <a>
              <ShoppingBagIcon className="w-6 h-6" />
            </a>
          </Link>
        )}
      </header>
    </>
  );
}
