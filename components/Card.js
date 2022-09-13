import Link from "next/link";
import { useState } from "react";
import { useEffect, useRef } from "react";
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
    return (
      <>
        <button className="md:hidden btn btn-square loading"></button>
        <div className="hidden md:inline">
          <button className="btn loading">Загрузка</button>
        </div>
      </>
    );
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
    <div>
      <Link href={href}>
        <a>
          <div className="py-2 flex items-center">
            <div className="max-w-[100px] md:max-w-[200px] w-full">
              <div className="w-full pb-full relative block">
                <Image src={src} layout="fill" objectFit="cover" alt="" />
              </div>
            </div>
            <div className="px-5">
              <h5 className="text-2xl pb-2 font-semibold tracking-tight">
                {title}
              </h5>
              <div className="flex justify-between items-center">
                <span className="text-xl md:text-3xl font-bold">{price} ₽</span>
              </div>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
}
