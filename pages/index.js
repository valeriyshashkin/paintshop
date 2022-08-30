import Card from "../components/Card";
import Header from "../components/Header";
import Content from "../components/Content";
import Head from "next/head";
import slugify from "slugify";
import path from "path";
import fs from "fs";
import { parse } from "yaml";

export default function Home({ products }) {
  return (
    <Content>
      <Head>
        <title>Каталог красок</title>
      </Head>
      <Header />
      <div className="space-y-1">
        {products.map((p, i) => (
          <div key={i}>
            <Card
              src={`/images/${p["фото"]}`}
              title={p["название"]}
              price={p["цена"]}
              href={`/product/${slugify(p["название"]).toLowerCase()}`}
            />
            {i + 1 !== products.length && <div className="divider"></div>}
          </div>
        ))}
      </div>
    </Content>
  );
}

export async function getStaticProps() {
  const products = fs
    .readdirSync(path.join(process.cwd(), "товары"))
    .map((filename) =>
      parse(
        fs.readFileSync(path.join(process.cwd(), "товары", filename), "utf8")
      )
    );

  return {
    props: { products },
  };
}
