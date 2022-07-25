import Link from "next/link";
import { useState } from "react";
import { setCookies, getCookie } from "cookies-next";
import { useEffect, useRef } from "react";
import { useSWRConfig } from "swr";
import Image from "next/image";

function Button({
  active,
  onClick,
  skeleton,
  publicId,
  deactivate,
  onChange,
  cart,
}) {
  const [count, setCount] = useState(1);
  const onChangeRef = useRef();
  onChangeRef.current = onChange;

  useEffect(() => {
    if (!active) {
      return;
    }
    const counts = JSON.parse(localStorage.getItem("counts") || "[]");
    if (counts.length === 0) {
      return;
    }

    setCount(counts.find((c) => c.publicId === publicId).count);
  }, [publicId, active]);

  useEffect(() => {
    if (onChangeRef.current) {
      onChangeRef.current();
    }
  }, [count]);

  function minus() {
    const counts = JSON.parse(localStorage.getItem("counts"));

    if (counts.find((c) => c.publicId === publicId).count === 1) {
      localStorage.setItem(
        "counts",
        JSON.stringify(counts.filter((c) => c.publicId !== publicId))
      );
      setCount(0);
      deactivate();
      return;
    }

    localStorage.setItem(
      "counts",
      JSON.stringify(
        counts.map((c) =>
          c.publicId === publicId ? { publicId, count: c.count - 1 } : c
        )
      )
    );
    setCount(count - 1);
  }

  function plus() {
    const counts = JSON.parse(localStorage.getItem("counts"));
    localStorage.setItem(
      "counts",
      JSON.stringify(
        counts.map((c) =>
          c.publicId === publicId ? { publicId, count: c.count + 1 } : c
        )
      )
    );
    setCount(count + 1);
  }

  if (skeleton) {
    return <button className="btn loading">Загрузка</button>;
  }

  if (cart) {
    return (
      <div className="btn-group">
        <button onClick={minus} className="btn btn-primary btn-outline">
          -
        </button>
        <div className="flex items-center bg-primary text-base-100 px-4">
          {count}
        </div>
        <button onClick={plus} className="btn btn-primary btn-outline">
          +
        </button>
      </div>
    );
  }

  return active ? (
    <Link href="/cart">
      <a className="btn btn-primary btn-outline">В корзине</a>
    </Link>
  ) : (
    <button onClick={onClick} className="btn btn-primary">
      Купить
    </button>
  );
}

export default function Card({
  data,
  title,
  price,
  href,
  publicId,
  src,
  onChange,
  cart,
}) {
  const [active, setActive] = useState(false);
  const { mutate } = useSWRConfig();

  function deactivate() {
    const cart = JSON.parse(getCookie("cart") || "[]");
    setCookies("cart", JSON.stringify(cart.filter((id) => id !== publicId)));

    mutate(
      "/api/cart",
      data.filter((d) => d.id !== publicId)
    );
    setActive(false);
  }

  function activate() {
    const cart = JSON.parse(getCookie("cart") || "[]");
    cart.push(publicId);
    setCookies("cart", JSON.stringify(cart));

    const counts = JSON.parse(localStorage.getItem("counts") || "[]");
    counts.push({
      publicId,
      count: 1,
    });
    localStorage.setItem("counts", JSON.stringify(counts));

    setActive(true);
    mutate("/api/cart");
  }

  useEffect(() => {
    if (data) {
      setActive(data.some((product) => product.id === publicId));
    }
  }, [data, publicId]);

  return (
    <div className="bg-neutral rounded-lg">
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
            <h5 className="text-xl pb-2 font-semibold tracking-tight line-clamp-2">
              {title}
            </h5>
          </a>
        </Link>
        <div className="flex justify-between items-center">
          <span className="text-3xl font-bold">{price} ₽</span>
          {data ? (
            <Button
              onClick={activate}
              active={active}
              publicId={publicId}
              deactivate={deactivate}
              onChange={onChange}
              cart={cart}
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
    <div className="bg-neutral-focus rounded-lg">
      <div className="w-full pb-full block"></div>
      <div className="px-5 py-5"></div>
    </div>
  );
}
