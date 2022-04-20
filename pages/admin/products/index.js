import Head from "next/head";
import Content from "../../../components/Content";
import Header from "../../../components/Header";
import Navigation from "../../../components/Navigation";
import Card from "../../../components/Card";

const products = [
  {
    title: "Белая краска тратата тратата тратата",
    price: "1000",
    href: "/product/777/paint",
  },
  {
    title: "Белая краска тратата тратата тратата",
    price: "1000",
    href: "/product/777/paint",
  },
  {
    title: "Белая краска тратата тратата тратата",
    price: "1000",
    href: "/product/777/paint",
  },
  {
    title: "Белая краска тратата тратата тратата",
    price: "1000",
    href: "/product/777/paint",
  },
  {
    title: "Белая краска тратата тратата тратата",
    price: "1000",
    href: "/product/777/paint",
  },
  {
    title: "Белая краска тратата тратата тратата",
    price: "1000",
    href: "/product/777/paint",
  },
  {
    title: "Белая краска тратата тратата тратата",
    price: "1000",
    href: "/product/777/paint",
  },
];

export default function Products() {
  return (
    <>
      <div>
        {products.map(({ title, price, href }, id) => (
          <Card key={id} title={title} price={price} href={href} admin />
        ))}
      </div>
      <style jsx>{`
        div {
          margin-top: 10px;
        }
      `}</style>
    </>
  );
}

Products.getLayout = (page) => {
  return (
    <>
      <Head>
        <title>Товары</title>
      </Head>
      <Header admin />
      <Content>
        <Navigation active="products" />
        {page}
      </Content>
    </>
  );
};
