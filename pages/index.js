import Card from "../components/Card";
import Header from "../components/Header";

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
  return (
    <>
      <div className="catalog">
        {products.map(({ title, price }, id) => (
          <Card key={id} title={title} price={price} />
        ))}
      </div>
      <style jsx>{`
        .catalog {
          margin-top: 60px;
        }
      `}</style>
    </>
  );
}

Home.getLayout = (page) => {
  return (
    <>
      <Header />
      {page}
    </>
  );
};
