import Content from "../components/Content";
import Header from "../components/Header";
import data from "../data";
import { useAtom } from "jotai";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import cartAtom from "../utils/cart";
import { DocumentDuplicateIcon } from "@heroicons/react/outline";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export default function Order() {
  const [cart] = useAtom(cartAtom);
  const [mount, setMount] = useState(false);
  const [domain, setDomain] = useState("");

  useEffect(() => {
    setMount(true);
    setDomain(window.location.hostname);
  }, []);

  function copy() {
    navigator.clipboard.writeText(
      `https://${domain}/show?cart=${JSON.stringify(cart)}`
    );
    toast("Ссылка скопирована", {
      hideProgressBar: true,
      position: "bottom-right",
      autoClose: 3000
    });
  }

  return (
    <>
      <Head>
        <title>Заказ | ПромТехКраски</title>
      </Head>
      <ToastContainer />
      <Header />
      <Content>
        {mount && (
          <div className="md:text-xl mt-8 md:mt-32 text-center">
            <div className="mb-4">
              Скопируйте ссылку ниже и отправьте её на{" "}
              <a className="text-blue-500" href={`mailto:${data.email}`}>
                {data.email}
              </a>
            </div>
            <div className="relative max-w-screen-sm mx-auto">
              <input
                className="block rounded-xl px-3 py-2 w-full pr-12 bg-neutral-900"
                readOnly
                value={`https://${domain}/show?cart=${JSON.stringify(cart)}`}
              />
              <button
                onClick={copy}
                className="absolute right-0 top-1/2 -translate-y-1/2 p-1 mr-2 bg-neutral-800 rounded-xl"
              >
                <DocumentDuplicateIcon className="w-6" />
              </button>
            </div>
            <Link href="/cart">
              <a className="border border-blue-500 transition sm:hover:bg-transparent sm:hover:text-blue-500 inline-block mt-6 bg-blue-500 text-lg py-2 px-4 rounded-xl">
                Вернуться в корзину
              </a>
            </Link>
          </div>
        )}
      </Content>
    </>
  );
}
