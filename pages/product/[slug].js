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
import React from "react";
import { promises as fs } from 'fs'
import path from 'path'

export default function Product({ product, productInfo }) {
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
          <div className="sm:sticky top-[64px] self-start">
            <div className="w-full pb-full relative block">
              <Image
                priority
                src={product.image}
                layout="fill"
                objectFit="cover"
                alt=""
                className="rounded-xl"
              />
            </div>
          </div>
          <div className="min-w-0">
            <h1 className="text-3xl font-bold pb-4">{product.name}</h1>
            {mount &&
              !cart.find(
                (p) => p.name === slugify(product.name).toLowerCase()
              ) ? (
              <button
                onClick={addToCart}
                className="sm:hover:bg-transparent sm:hover:text-blue-500 border border-blue-500 transition text-lg py-2 px-4 bg-blue-500 rounded-xl w-full border border-blue-500"
              >
                Добавить в корзину
              </button>
            ) : (
              <Link href="/cart">
                <a>
                  <button className="text-lg py-2 px-4 border-blue-500 border text-blue-500 rounded-xl w-full sm:hover:bg-blue-500 sm:hover:text-white transition">
                    Перейти в корзину
                  </button>
                </a>
              </Link>
            )}
            <div className="mt-6">
              <p className="text-3xl pt-4 font-bold">Полное название</p>
              <div className="prose prose-invert prose-xl" style={{ all: "unset" }} dangerouslySetInnerHTML={{ __html: productInfo }}></div>
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

  const productInfo = await fs.readFile(path.join(path.join(process.cwd(), 'productInfo'), product.info), 'utf8');

  let cleanedHtml = productInfo.replace(/<style.*?>.*?<\/style>/gs, '');

  return { props: { product, productInfo: cleanedHtml } };
}

export async function getStaticPaths() {
  return { paths: [], fallback: true };
}
