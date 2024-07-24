import Link from "next/link";
import Image from "next/image";
import slugify from "slugify";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import cartAtom from "../utils/cart";

export default function Card({
  name,
  description,
  image,
  forCart,
  showCart,
  amount,
}) {
  const [mount, setMount] = useState(false);
  const [cart, setCart] = useAtom(cartAtom);

  useEffect(() => {
    setMount(true);
  }, []);

  function minus(e) {
    e.preventDefault();

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

  function plus(e) {
    e.preventDefault();

    const updatedCart = cart.map((c) =>
      c.name === slugify(name).toLowerCase()
        ? { name: c.name, amount: c.amount + 1 }
        : c
    );

    setCart(updatedCart);
  }

  return (
    <div className="relative md:hover:bg-neutral-800 transition rounded-xl">
      <Link href={`/product/${slugify(name).toLowerCase()}`}>
        <a>
          <div className="md:p-2">
            <div className="w-full mx-auto">
              <div className="w-full pb-full relative block">
                <Image className="rounded-xl" src={image} layout="fill" objectFit="cover" alt="" />
              </div>
            </div>
            <div>
              <h5 className="pt-2 text-md font-semibold tracking-tight line-clamp-2">
                {name}
              </h5>
              {forCart && mount ? (
                <div className="flex items-center justify-center pt-2">
                  <button
                    onClick={minus}
                    className="sm:hover:bg-blue-500 sm:hover:text-white border-blue-500 border text-blue-500 w-10 h-10 text-lg rounded-full"
                  >
                    -
                  </button>
                  <div className="px-4 font-bold text-lg">
                    {cart.find((c) => c.name === slugify(name).toLowerCase()).amount}
                  </div>
                  <button
                    onClick={plus}
                    className="sm:hover:bg-blue-500 sm:hover:text-white border-blue-500 border text-blue-500 w-10 h-10 text-lg rounded-full"
                  >
                    +
                  </button>
                </div>
              ) : !showCart &&
              <button className="text-blue-500 transition sm:hover:text-white sm:hover:bg-blue-500 mt-4 border border-blue-500 py-2 w-full rounded-xl">
                Купить
              </button>
              }
              {showCart && mount && (
                <div className="text-2xl font-bold md:text-3xl">
                  {amount} шт.
                </div>
              )}
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
}
