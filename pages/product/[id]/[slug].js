import Header from "../../../components/Header";
import Content from "../../../components/Content";
import Head from "next/head";
import slugify from "slugify";
import useSWR from "swr";
import fetcher from "../../../utils/fetcher";
import { useEffect, useState } from "react";
import { getCookie, setCookies } from "cookies-next";
import Image from "next/image";
import { useRouter } from "next/router";
import client, { urlFor } from "../../../client";
import { PortableText } from "@portabletext/react";
import blocksToText from "../../../utils/portabletextToText";
import Link from "next/link";

function Button({ active, onClick, skeleton }) {
  if (skeleton) {
    return <button className="btn btn-loading w-full">Загрузка</button>;
  }

  return active ? (
    <Link href="/cart">
      <a className="btn btn-primary btn-outline w-full">В корзине</a>
    </Link>
  ) : (
    <button onClick={onClick} className="btn btn-primary w-full">
      Купить
    </button>
  );
}

export default function Product({
  product: { name, description, price, photo, _id } = {},
}) {
  const [active, setActive] = useState(false);
  const { data, mutate } = useSWR("/api/cart", fetcher);
  const router = useRouter();

  function activate() {
    const cart = JSON.parse(getCookie("cart") || "[]");
    cart.push(_id);
    setCookies("cart", JSON.stringify(cart));

    const counts = JSON.parse(localStorage.getItem("counts") || "[]");
    counts.push({
      publicId: _id,
      count: 1,
    });
    localStorage.setItem("counts", JSON.stringify(counts));

    setActive(true);
    mutate();
  }

  useEffect(() => {
    if (data) {
      setActive(data.some((p) => p._id === _id));
    }
  }, [data, _id]);

  if (router.isFallback) {
    return null;
  }

  return (
    <Content>
      <Header />
      <div className="grid sm:grid-cols-2 gap-8">
        <Head>
          <title>{name}</title>
          <meta name="description" content={blocksToText(description)} />
        </Head>
        <div>
          <div className="w-full pb-full relative block">
            <Image
              src={urlFor(photo).width(500).url()}
              layout="fill"
              objectFit="cover"
              alt=""
            />
          </div>
        </div>
        <div>
          <h1 className="text-xl font-semibold py-2">{name}</h1>
          <span className="text-3xl font-bold block my-4">{price} ₽</span>
          {data ? (
            <Button onClick={activate} active={active} />
          ) : (
            <Button skeleton />
          )}
          <p className="text-xl pt-4">Описание</p>
          <PortableText value={description} />
        </div>
      </div>
    </Content>
  );
}

export async function getStaticProps({ params }) {
  const product = await client.fetch(
    `*[_type == "products" && _id == $id][0]`,
    {
      id: params.id,
    }
  );

  if (!product) {
    return { notFound: true };
  }

  return {
    props: {
      product,
    },
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  const products = await client.fetch(`*[_type == "products"]`);

  const paths = products.map(({ _id, name }) => ({
    params: {
      id: _id,
      slug: slugify(name),
    },
  }));

  return {
    paths,
    fallback: true,
  };
}
