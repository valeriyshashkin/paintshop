import Link from "next/link";
import Image from "next/image";
import slugify from "slugify";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import cartAtom from "../utils/cart";

export default function Card({ name, price, image, forCart }) {
  const [mount, setMount] = useState(false);
  const [cart, setCart] = useAtom(cartAtom);

  useEffect(() => {
    setMount(true);
  }, []);

  function minus() {
    const prevAmount = cart.find(
      (c) => c.name === slugify(name).toLowerCase()
    ).amount;

    if (prevAmount === 1) {
      setCart(cart.filter((c) => c.name !== slugify(name).toLowerCase()));
      return;
    }

    const updatedCart = cart.map((c) =>
      c.name === slugify(name).toLowerCase()
        ? { name: c.name, amount: c.amount - 1 }
        : c
    );

    setCart(updatedCart);
  }

  function plus() {
    const updatedCart = cart.map((c) =>
      c.name === slugify(name).toLowerCase()
        ? { name: c.name, amount: c.amount + 1 }
        : c
    );

    setCart(updatedCart);
  }

  return (
    <div className="relative">
      <Link href={`/product/${slugify(name).toLowerCase()}`}>
        <a className="block">
          <div className="py-2 flex items-center">
            <div className="max-w-[100px] md:max-w-[200px] min-w-[100px] md:min-w-[200px] w-full">
              <div className="w-full pb-full relative block">
                <Image src={image} layout="fill" objectFit="cover" alt="" />
              </div>
            </div>
            <div className="px-5 pb-2">
              <h5 className="text-lg md:text-2xl font-semibold tracking-tight line-clamp-2">
                {name}
              </h5>
              <div className="flex justify-between items-center">
                <span className="text-xl md:text-3xl font-bold">{price} ₽</span>
              </div>
            </div>
          </div>
        </a>
      </Link>
      {forCart && mount && (
        <div className="absolute right-0 bottom-0 pb-2 md:pb-0 md:top-1/2 md:-translate-y-1/2 flex items-center ml-auto">
          <button
            onClick={minus}
            className="border-blue-500 border text-blue-500 w-6 h-6 flex items-center justify-center md:w-10 md:h-10 text-lg rounded-xl"
          >
            -
          </button>
          <div className="px-4 font-bold text-lg">
            {cart.find((c) => c.name === slugify(name).toLowerCase()).amount}
          </div>
          <button
            onClick={plus}
            className="border-blue-500 border text-blue-500 w-6 h-6 flex items-center justify-center md:w-10 md:h-10 text-lg rounded-xl"
          >
            +
          </button>
        </div>
      )}
    </div>
  );
}
