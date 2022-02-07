import Card from "../components/Card";
import Header from "../components/Header";
import Content from "../components/Content";

const products = [
  {
    title: "Белая краска тратата тратата тратата",
    price: "1000",
  },
  {
    title: "Белая краска тратата тратата тратата",
    price: "1000",
  },
  {
    title: "Белая краска тратата тратата тратата",
    price: "1000",
  },
  {
    title: "Белая краска тратата тратата тратата",
    price: "1000",
  },
  {
    title: "Белая краска тратата тратата тратата",
    price: "1000",
  },
  {
    title: "Белая краска тратата тратата тратата",
    price: "1000",
  },
  {
    title: "Белая краска тратата тратата тратата",
    price: "1000",
  },
];

export default function Home() {
  return products.map(({ title, price }, id) => (
    <Card key={id} title={title} price={price} />
  ));
}

Home.getLayout = (page) => {
  return (
    <>
      <Header />
      <Content>{page}</Content>
    </>
  );
};
