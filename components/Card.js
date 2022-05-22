import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { setCookies, getCookie } from "cookies-next";
import { useEffect } from "react";
import { useSWRConfig } from "swr";
import Image from "next/image";
import classNames from "classnames";

function Button({ active, cart, onClick, admin, skeleton, href }) {
  if (skeleton) {
    return <button className="btn loading">Загрузка</button>;
  }

  return cart ? (
    <button onClick={onClick} className="btn btn-primary">
      Убрать
    </button>
  ) : admin ? (
    <a href={href} className="btn btn-primary">Изменить</a>
  ) : (
    <button
      onClick={onClick}
      className={classNames("btn btn-primary", { "btn-outline": active })}
    >
      {active ? "Добавлено" : "В корзину"}
    </button>
  );
}

export default function Card({
  data,
  title,
  price,
  cart,
  href,
  publicId,
  admin,
  onRemoveFromCart,
  src,
}) {
  const [active, setActive] = useState(false);
  const router = useRouter();
  const { mutate } = useSWRConfig();

  function toggleActive() {
    if (!active) {
      const cart = JSON.parse(getCookie("cart") || "[]");
      cart.push(publicId);
      setCookies("cart", JSON.stringify(cart));
    } else {
      const cart = JSON.parse(getCookie("cart") || "[]");
      setCookies("cart", JSON.stringify(cart.filter((id) => id !== publicId)));
    }

    setActive(!active);
    mutate("/api/cart");
  }

  function toEdit() {
    router.push(`/admin/products/${publicId}`);
  }

  function handleRemove() {
    onRemoveFromCart(publicId);
  }

  useEffect(() => {
    if (data) {
      setActive(data.some((product) => product.publicId === publicId));
    }
  }, [data, publicId]);

  return (
    <div className="bg-white rounded-lg shadow-md">
      <a href={href} className="w-full pb-full relative block">
        <Image
          className="rounded-t-lg"
          src={src}
          layout="fill"
          objectFit="cover"
          alt=""
        />
      </a>
      <div className="px-5 py-5">
        <a href={href}>
          <h5 className="text-xl pb-2 font-semibold tracking-tight text-gray-900">
            {title}
          </h5>
        </a>
        <div className="flex justify-between items-center">
          <span className="text-3xl font-bold text-gray-900">{price} ₽</span>
          {data || cart || admin ? (
            <Button
              onClick={admin ? toEdit : cart ? handleRemove : toggleActive}
              cart={cart}
              active={active}
              admin={admin}
              href={`/admin/products/${publicId}`}
            />
          ) : (
            <Button skeleton />
          )}
        </div>
      </div>
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="card">
      <a className="image-link">
        <div className="image"></div>
      </a>
      <div className="description">
        <a className="title-link">
          <p className="title"></p>
        </a>
        <div className="price-and-button">
          <p className="price"></p>
          <Button skeleton />
        </div>
      </div>
    </div>
  );
}
