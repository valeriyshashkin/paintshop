import Link from "next/link";
import classNames from "classnames";

function NavigationLink({ active, href, children }) {
  return (
    <Link href={href}>
      <a className={classNames("tab", { "tab-active": active })}>{children}</a>
    </Link>
  );
}

export default function Navigation({ active }) {
  return (
    <div className="tabs tabs-boxed w-fit">
      <NavigationLink href="/admin/products" active={active === "products"}>
        Товары
      </NavigationLink>
      <NavigationLink href="/admin/contacts" active={active === "contacts"}>
        Контакты
      </NavigationLink>
    </div>
  );
}
