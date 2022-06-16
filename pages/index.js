import Card from "../components/Card";
import Header from "../components/Header";
import Content from "../components/Content";
import Head from "next/head";
import useSWR from "swr";
import fetcher from "../utils/fetcher";
import client, { urlFor } from "../client";
import slugify from "slugify";

export default function Home({ products }) {
  const { data } = useSWR("/api/cart", fetcher);

  return (
    <Content>
      <Head>
        <title>Каталог красок</title>
      </Head>
      <Header />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products
          .slice(0)
          .reverse()
          .map(({ name, price, _id, photo }) => (
            <Card
              src={urlFor(photo).width(500).url()}
              data={data}
              key={_id}
              title={name}
              price={price}
              publicId={_id}
              href={`/product/${_id}/${slugify(name)}`}
            />
          ))}
      </div>
    </Content>
  );
}

export async function getStaticProps() {
  const products = await client.fetch(
    `*[_type == "products"] | order(_createdAt desc)`
  );

  return {
    props: { products },
    revalidate: 60,
  };
}
