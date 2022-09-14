import slugify from "slugify";
import Content from "../components/Content";
import Header from "../components/Header";
import data from "../data";
import { useAtom } from "jotai";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import total from "../utils/total";
import cartAtom from "../utils/cart";

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
          <div className="md:text-xl mt-8 md:mt-32">
            <div className="mb-4">
              Скопируйте ваш заказ ниже и отправьте его на{" "}
              <a className="text-blue-500" href={`mailto:${data.email}`}>
                {data.email}
              </a>
            </div>
            <div className="border-b border-gray-500 mb-3"></div>
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
