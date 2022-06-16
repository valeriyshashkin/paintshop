import Link from "next/link";
import { ShoppingBagIcon } from "@heroicons/react/outline";
import fetcher from "../utils/fetcher";
import { getCookie } from "cookies-next";
import useSWR from "swr";

export default function Header() {
  const { data } = useSWR(getCookie("cart") ? "/api/cart" : null, fetcher);

  return (
    <header className="flex justify-between items-center pb-4">
      <Link href="/">
        <a>
          <h1 className="text-2xl font-bold">Краски</h1>
        </a>
      </Link>
      {data && data.length ? (
        <div className="indicator">
          <span className="indicator-item badge badge-sm badge-primary">
            {data.length}
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
