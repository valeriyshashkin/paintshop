import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { setCookies, getCookie } from "cookies-next";
import { useEffect } from "react";
import { useSWRConfig } from "swr";
import Image from "next/image";
import classNames from "classnames";

function Button({ active, cart, onClick, skeleton, disabled }) {
  if (skeleton) {
    return <button className="btn loading">Загрузка</button>;
  }

  return cart ? (
    <button onClick={onClick} className="btn btn-primary" disabled={disabled}>
      Убрать
    </button>
  ) : (
    <button
      onClick={onClick}
      className={classNames("btn btn-primary", { "btn-outline": active })}
      disabled={disabled}
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
  onRemoveFromCart,
  src,
  disabled,
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
      <Link href={href}>
        <a className="w-full pb-full relative block">
          <Image
            className="rounded-t-lg"
            src={src}
            layout="fill"
            objectFit="cover"
            alt=""
          />
        </a>
      </Link>
      <div className="px-5 py-5">
        <Link href={href}>
          <a>
            <h5 className="text-xl pb-2 font-semibold tracking-tight text-gray-900">
              {title}
            </h5>
          </a>
        </Link>
        <div className="flex justify-between items-center">
          <span className="text-3xl font-bold text-gray-900">{price} ₽</span>
          {data || cart ? (
            <Button
              onClick={cart ? handleRemove : toggleActive}
              cart={cart}
              active={active}
              disabled={disabled}
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
    <div className="bg-gray-100 rounded-lg">
      <div className="w-full pb-full block"></div>
      <div className="px-5 py-5"></div>
    </div>
  );
}
