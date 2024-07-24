import Card from "../components/Card";
import Header from "../components/Header";
import Content from "../components/Content";
import Head from "next/head";
import data from "../data";

export default function Home() {
  return (
    <>
      <Head>
        <title>ПромТехКраски</title>
        <meta name="description" content="ПромТехКраски" />
      </Head>
      <Header />
      <Content>
        <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-0">
          {data.products.map(({ image, name, description }, i) => (
            <Card
              image={image}
              name={name}
              description={description}
              key={i}
            />
          ))}
        </div>
      </Content>
    </>
  );
}
