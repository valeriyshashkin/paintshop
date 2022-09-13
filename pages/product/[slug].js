import Header from "../../components/Header";
import Content from "../../components/Content";
import Head from "next/head";
import slugify from "slugify";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

const productsInCartAtom = atomWithStorage("productsInCart", []);

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

export default function Product({ product }) {
  const [active, setActive] = useState(false);
  const [productsInCart] = useAtom(productsInCartAtom);
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
    if (productsInCart) {
      setActive(
        productsInCart.some((p) => p["название"] === product["название"])
      );
    }
  }, [productsInCart, product]);

  if (router.isFallback) {
    return null;
  }

  return (
    <Content>
      <Header />
      <div className="grid sm:grid-cols-2 gap-8">
        <Head>
          <title>{p["название"]}</title>
          <meta name="description" content={p["описание"]} />
        </Head>
        <div>
          <div className="w-full pb-full relative block">
            <Image
              src={`/images/${p["фото"]}`}
              layout="fill"
              objectFit="cover"
              alt=""
            />
          </div>
        </div>
        <div>
          <h1 className="text-xl font-semibold py-2">{p["название"]}</h1>
          <span className="text-3xl font-bold block my-4">{p["цена"]} ₽</span>
          {productsInCart ? (
            <Button onClick={activate} active={active} />
          ) : (
            <Button skeleton />
          )}
          <p className="text-xl pt-4">Описание</p>
          <span>{p["описание"]}</span>
        </div>
      </div>
    </Content>
  );
}

export async function getStaticProps({ params }) {
  const products = fs
    .readdirSync(path.join(process.cwd(), "товары"))
    .map((filename) =>
      parse(
        fs.readFileSync(path.join(process.cwd(), "товары", filename), "utf8")
      )
    );

  const product = products.find((p) => slugify(p["название"]) === params.slug);

  if (!product) {
    return { notFound: true };
  }

  return { props: { product } };
}

export async function getStaticPaths() {
  const products = fs
    .readdirSync(path.join(process.cwd(), "товары"))
    .map((filename) =>
      parse(
        fs.readFileSync(path.join(process.cwd(), "товары", filename), "utf8")
      )
    );

  const paths = products.map((p) => ({
    params: { slug: slugify(p["название"]) },
  }));

  return {
    paths,
    fallback: true,
  };
}
