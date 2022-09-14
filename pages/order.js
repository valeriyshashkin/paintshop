import slugify from "slugify";
import Content from "../components/Content";
import Header from "../components/Header";
import data from "../data";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import total from "../utils/total";

const cartAtom = atomWithStorage("cart", []);

export default function Order() {
  const [cart] = useAtom(cartAtom);
  const [mount, setMount] = useState(false);

  useEffect(() => {
    setMount(true);
  }, []);

  return (
    <>
      <Head>
        <title>Заказ</title>
      </Head>
      <Header />
      <Content>
        {mount && (
          <div className="text-center text-xl mt-48">
            <div className="mb-4">
              Скопируйте ваш заказ ниже и отправьте его на{" "}
              <a className="text-blue-500" href={`mailto:${data.email}`}>
                {data.email}
              </a>
            </div>
            {cart.map((c, i) => {
              const { price, name } = data.products.find(
                (p) => slugify(p.name).toLowerCase() === c.name
              );

              return (
                <div key={i}>
                  {name} ({c.amount} шт.) = {price * c.amount} ₽
                </div>
              );
            })}
            <div>Итого: {total(cart)} ₽</div>
            <Link href="/cart">
              <a className="inline-block mt-8 bg-blue-500 text-lg py-2 px-4 rounded-xl">
                Вернуться в корзину
              </a>
            </Link>
          </div>
        )}
      </Content>
    </>
  );
}
