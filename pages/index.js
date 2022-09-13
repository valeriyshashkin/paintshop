import Card from "../components/Card";
import Header from "../components/Header";
import Content from "../components/Content";
import Head from "next/head";
import slugify from "slugify";
import data from "../data";

export default function Home() {
  return (
    <>
      <Head>
        <title>Каталог красок</title>
      </Head>
      <Header />
      <Content>
        <div className="divide-y divide-gray-500">
          {data.products.map(({ image, name, price }, i) => (
            <Card
              image={image}
              name={name}
              price={price}
              key={i}
              href={`/product/${slugify(name).toLowerCase()}`}
            />
          ))}
        </div>
      </Content>
    </>
  );
}
