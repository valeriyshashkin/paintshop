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

export default function Product({ product }) {
  const [cart, setCart] = useAtom(cartAtom);
  const [mount, setMount] = useState(false);
  const router = useRouter();

  function addToCart() {
    setCart([
      ...cart,
      { name: slugify(product.name).toLowerCase(), amount: 1 },
    ]);
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
            <title>{product.name}</title>
            <meta name="description" content={product.description} />
          </Head>
          <div className="w-full pb-full relative block">
            <Image
              priority
              src={product.image}
              layout="fill"
              objectFit="cover"
              alt=""
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold pb-4">{product.name}</h1>
            <span className="text-3xl block mb-6">{product.price} ₽</span>
            {mount &&
              !cart.find(
                (p) => p.name === slugify(product.name).toLowerCase()
              ) ? (
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
            <span>{product.description}</span>
            <div className="mt-6">
              <h2 className="text-xl font-bold pb-2">Характеристики</h2>
              <ul>
                {Object.entries(product.technicalSpecifications).map(([category, specs], index) => (
                  <div key={index}>
                    <h3 className="font-semibold">{category}</h3>
                    <ul>
                      {Object.entries(specs).map(([label, value], idx) => (
                        <li key={idx} className="mb-2">
                          <span className="font-semibold">{label}: </span>
                          <span>{value}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </ul>
            </div>
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
  return { paths: [], fallback: true };
}
