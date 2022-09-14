import Header from "../../components/Header";
import Content from "../../components/Content";
import Head from "next/head";
import slugify from "slugify";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import { useAtom } from "jotai";
import data from "../../data";
import { useEffect, useState } from "react";
import cartAtom from "../../utils/cart";

export default function Product({
  product: { name, price, description, image },
}) {
  const [cart, setCart] = useAtom(cartAtom);
  const [mount, setMount] = useState(false);
  const router = useRouter();

  function addToCart() {
    setCart([...cart, { name: slugify(name).toLowerCase(), amount: 1 }]);
  }

  useEffect(() => {
    setMount(true);
  }, []);

  if (router.isFallback) {
    return null;
  }

  return (
    <>
      <Header />
      <Content>
        <div className="grid sm:grid-cols-2 gap-8">
          <Head>
            <title>{name}</title>
            <meta name="description" content={description} />
          </Head>
          <div className="w-full pb-full relative block">
            <Image
              priority
              src={image}
              layout="fill"
              objectFit="cover"
              alt=""
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold pb-4">{name}</h1>
            <span className="text-3xl block mb-6">{price} ₽</span>
            {mount &&
            !cart.find((p) => p.name === slugify(name).toLowerCase()) ? (
              <button
                onClick={addToCart}
                className="text-lg py-2 px-4 bg-blue-500 rounded-xl w-full border border-blue-500"
              >
                Добавить в корзину
              </button>
            ) : (
              <Link href="/cart">
                <a>
                  <button className="text-lg py-2 px-4 border-blue-500 border text-blue-500 rounded-xl w-full">
                    Перейти в корзину
                  </button>
                </a>
              </Link>
            )}
            <p className="text-xl pt-6 pb-4 font-bold">Описание</p>
            <span>{description}</span>
          </div>
        </div>
      </Content>
    </>
  );
}

export async function getStaticProps({ params }) {
  const product = data.products.find(
    ({ name }) => slugify(name).toLowerCase() === params.slug
  );

  if (!product) {
    return { notFound: true };
  }

  return { props: { product } };
}

export async function getStaticPaths() {
  const paths = data.products.map(({ name }) => ({
    params: { slug: slugify(name).toLowerCase() },
  }));

  return { paths, fallback: true };
}
