import Link from "next/link";
import { useRouter } from "next/router";
import { ShoppingBagIcon } from "@heroicons/react/outline";
import { LogoutIcon } from "@heroicons/react/outline";

export default function Header({ admin }) {
  const router = useRouter();

  function logout() {
    fetch("/api/logout").then(() => router.push("/admin"));
  }

  return (
    <header className="flex justify-between items-center pb-4">
      <Link href="/">
        <a>
          <h1 className="text-2xl font-bold">Краски</h1>
        </a>
      </Link>
      {admin ? (
        <LogoutIcon className="w-6 h-6" onClick={logout} />
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
