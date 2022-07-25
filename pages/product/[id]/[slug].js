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
  product: { content, attachments, id } = {},
}) {
  const [active, setActive] = useState(false);
  const { data, mutate } = useSWR("/api/cart", fetcher);
  const router = useRouter();

  function activate() {
    const cart = JSON.parse(getCookie("cart") || "[]");
    cart.push(id);
    setCookies("cart", JSON.stringify(cart));

    const counts = JSON.parse(localStorage.getItem("counts") || "[]");
    counts.push({
      publicId: id,
      count: 1,
    });
    localStorage.setItem("counts", JSON.stringify(counts));

    setActive(true);
    mutate();
  }

  useEffect(() => {
    if (data) {
      setActive(data.some((p) => p.id === id));
    }
  }, [data, id]);

  if (router.isFallback) {
    return null;
  }

  return (
    <Content>
      <Header />
      <div className="grid sm:grid-cols-2 gap-8">
        <Head>
          <title>{content.split("+")[0]}</title>
          <meta name="description" content={content.split("+")[2]} />
        </Head>
        <div>
          <div className="w-full pb-full relative block">
            <Image
              src={attachments[0].url}
              layout="fill"
              objectFit="cover"
              alt=""
            />
          </div>
        </div>
        <div>
          <h1 className="text-xl font-semibold py-2">
            {content.split("+")[0]}
          </h1>
          <span className="text-3xl font-bold block my-4">
            {content.split("+")[1]} ₽
          </span>
          {data ? (
            <Button onClick={activate} active={active} />
          ) : (
            <Button skeleton />
          )}
          <p className="text-xl pt-4">Описание</p>
          <span>{content.split("+")[2]}</span>
        </div>
      </div>
    </Content>
  );
}

export async function getStaticProps({ params }) {
  const { products } = await (await fetch("http://localhost:3001")).json();

  const product = products.find((p) => p.id === params.id);

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
  const { products } = await (await fetch("http://localhost:3001")).json();

  const paths = products.map(({ id, content }) => ({
    params: {
      id,
      slug: slugify(content.split("+")[0]),
    },
  }));

  return {
    paths,
    fallback: true,
  };
}
