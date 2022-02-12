import Card from "../components/Card";
import Header from "../components/Header";
import Content from "../components/Content";
import Head from "next/head";

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

export default function Home() {
  return products.map(({ title, price, href }, id) => (
    <Card key={id} title={title} price={price} href={href} />
  ));
}

Home.getLayout = (page) => {
  return (
    <>
      <Head>
        <title>Каталог красок</title>
      </Head>
      <Content>
        <Header />
        {page}
      </Content>
    </>
  );
};
