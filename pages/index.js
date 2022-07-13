import Card from "../components/Card";
import Header from "../components/Header";
import Content from "../components/Content";
import Head from "next/head";
import useSWR from "swr";
import fetcher from "../utils/fetcher";
import slugify from "slugify";
import { promises as fs } from "fs";
import path from "path";

export default function Home({ products }) {
  const { data } = useSWR("/api/cart", fetcher);

  return (
    <Content>
      <Head>
        <title>Каталог красок</title>
      </Head>
      <Header />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map(({ content, id, attachments }) => (
          <Card
            src={attachments[0].url}
            data={data}
            key={id}
            title={content.split("+")[0]}
            price={content.split("+")[1]}
            publicId={id}
            href={`/product/${id}/${slugify(content.split("+")[0])}`}
          />
        ))}
      </div>
    </Content>
  );
}

export async function getStaticProps() {
  const productsResponse = await fetch(
    `https://discord.com/api/channels/${process.env.DISCORD_PRODUCTS_CHANNEL}/messages`,
    { headers: { authorization: `Bot ${process.env.DISCORD_TOKEN}` } }
  );

  const products = await productsResponse.json();

  await fs.writeFile(
    path.join(process.cwd(), "products.json"),
    JSON.stringify(products)
  );

  return {
    props: { products },
    revalidate: 60,
  };
}
