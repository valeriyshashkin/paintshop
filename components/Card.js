import Link from "next/link";
import Image from "next/image";
import slugify from "slugify";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { useEffect, useState } from "react";

const cartAtom = atomWithStorage("cart", []);

export default function Card({ name, price, image, forCart }) {
  const [mount, setMount] = useState(false);
  const [cart, setCart] = useAtom(cartAtom);

  useEffect(() => {
    setMount(true);
  }, []);

  function minus(e) {
    e.stopPropagation();
  }

  function plus(e) {
    e.stopPropagation();
    console.log("ffsfsd");
  }

  return (
    <Link href={`/product/${slugify(name).toLowerCase()}`}>
      <a className="block">
        <div className="py-2 flex items-center">
          <div className="max-w-[100px] md:max-w-[200px] w-full">
            <div className="w-full pb-full relative block">
              <Image src={image} layout="fill" objectFit="cover" alt="" />
            </div>
          </div>
          <div className="px-5">
            <h5 className="text-2xl pb-2 font-semibold tracking-tight">
              {name}
            </h5>
            <div className="flex justify-between items-center">
              <span className="text-xl md:text-3xl font-bold">{price} ₽</span>
            </div>
          </div>
          {forCart && mount && (
            <div className="flex items-center ml-auto">
              <button
                onClick={minus}
                className="border-blue-500 border text-blue-500 w-10 h-10 text-lg rounded-xl"
              >
                -
              </button>
              <div className="px-4 font-bold text-lg">
                {
                  cart.find((c) => c.name === slugify(name).toLowerCase())
                    .amount
                }
              </div>
              <button
                onClick={plus}
                className="border-blue-500 border text-blue-500 w-10 h-10 text-lg rounded-xl"
              >
                +
              </button>
            </div>
          )}
        </div>
      </a>
    </Link>
  );
}
