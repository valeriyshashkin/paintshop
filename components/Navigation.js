import Link from "next/link";

function NavigationLink({ active, href, children }) {
  return (
    <>
      <Link href={href}>
        <a>{children}</a>
      </Link>
      <style jsx>{`
        a {
          padding: 15px;
          display: block;
          border-bottom: ${active ? "2px solid var(--blue)" : "none"};
          text-decoration: none;
          color: ${active ? "var(--blue)" : "gray"};
        }
      `}</style>
    </>
  );
}

export default function Navigation({ active }) {
  return (
    <div>
      <NavigationLink href="/admin/products" active={active === "products"}>
        Товары
      </NavigationLink>
      <NavigationLink href="/admin/contacts" active={active === "contacts"}>
        Контакты
      </NavigationLink>
      <style jsx>{`
        div {
          display: flex;
        }
      `}</style>
    </div>
  );
}
