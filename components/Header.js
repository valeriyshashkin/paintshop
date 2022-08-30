import Link from "next/link";
import { ShoppingBagIcon } from "@heroicons/react/outline";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { useEffect, useState } from "react";

const productsInCartAtom = atomWithStorage("productsInCart", []);

export default function Header() {
  const [productsInCart] = useAtom(productsInCartAtom);
  const [mount, setMount] = useState(false);

  useEffect(() => {
    setMount(true);
  }, []);

  return (
    <header className="flex justify-between items-center pb-4">
      <Link href="/">
        <a>
          <h1 className="text-2xl font-bold">Краски</h1>
        </a>
      </Link>
      {mount && productsInCart.length > 0 ? (
        <div className="indicator">
          <span className="indicator-item badge badge-sm badge-primary">
            {productsInCart.length}
          </span>

          <Link href="/cart">
            <a>
              <ShoppingBagIcon className="w-6 h-6" />
            </a>
          </Link>
        </div>
      ) : (
        <Link href="/cart">
          <a>
            <ShoppingBagIcon className="w-6 h-6" />
          </a>
        </Link>
      )}
    </header>
  );
}
