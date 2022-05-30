import Header from "../../../components/Header";
import Content from "../../../components/Content";
import Head from "next/head";
import { useState } from "react";
import prisma from "../../../utils/prisma";
import slugify from "slugify";
import useSWR from "swr";
import fetcher from "../../../utils/fetcher";
import { useEffect, useRef } from "react";
import { getCookie, setCookies } from "cookies-next";
import { useSWRConfig } from "swr";
import Image from "next/image";
import { useRouter } from "next/router";
import classNames from "classnames";

function Button({ active, onClick, skeleton, disabled }) {
  if (skeleton) {
    return <button className="btn btn-loading w-full">Загрузка</button>;
  }

  return (
    <button
      onClick={onClick}
      className={classNames("btn btn-primary w-full", {
        "btn-outline": active,
      })}
      disabled={disabled}
    >
      {active ? "Добавлено" : "В корзину"}
    </button>
  );
}

function ProductSkeleton() {
  return (
    <div className="grid sm:grid-cols-2 gap-8">
      <div className="w-full pb-full block bg-gray-100"></div>
      <div>
        <h1 className="bg-gray-100 rounded-lg my-2 h-[28px]"></h1>
        <p className="bg-gray-100 rounded-lg mb-4 h-[36px]"></p>
        <div className="h-[48px] w-full bg-gray-100 rounded-lg"></div>
        <p className="text-xl mt-4 bg-gray-100 rounded-lg h-[28px]"></p>
        <p className="bg-gray-100 mt-2 rounded-lg h-[24px]"></p>
      </div>
    </div>
  );
}

export default function Product({
  product: { name, description, price, publicId, src },
  preview,
}) {
  const [active, setActive] = useState(false);
  const { data } = useSWR("/api/cart", fetcher);
  const { mutate } = useSWRConfig();
  const router = useRouter();
  const nameRef = useRef();
  const priceRef = useRef();
  const descriptionRef = useRef();

  function toggleActive() {
    if (!active) {
      const cart = JSON.parse(getCookie("cart") || "[]");
      cart.push(publicId);
      setCookies("cart", JSON.stringify(cart));
    } else {
      const cart = JSON.parse(getCookie("cart") || "[]");
      setCookies("cart", JSON.stringify(cart.filter((id) => id !== publicId)));
    }

    setActive(!active);
    mutate("/api/cart");
  }

  function deleteProduct() {
    alert("Deleting product");
  }

  function saveChanges() {
    console.log(nameRef.current.innerHTML);
    console.log(priceRef.current.innerHTML);
    console.log(descriptionRef.current.innerHTML);
  }

  useEffect(() => {
    if (data) {
      setActive(data.some((product) => product.publicId === publicId));
    }
  }, [data, publicId]);

  if (router.isFallback) {
    return <ProductSkeleton />;
  }

  return (
    <Content preview={preview}>
      <Header preview={preview} />
      <div className="grid sm:grid-cols-2 gap-8">
        <Head>
          <title>{name}</title>
        </Head>
        <div className="w-full pb-full relative block">
          <Image src={src} layout="fill" objectFit="cover" alt="" />
        </div>
        <div>
          <h1
            contentEditable={preview}
            className={classNames("outline-none text-xl font-semibold py-2", {
              "input bg-gray-200": preview,
            })}
            ref={nameRef}
          >
            {name}
          </h1>
          <span className="text-3xl font-bold block my-4">
            <span
              contentEditable={preview}
              className={classNames("outline-none", {
                "input bg-gray-200 text-3xl mt-4 mr-4": preview,
              })}
              ref={priceRef}
            >
              {price}
            </span>
            <span> ₽</span>
          </span>
          {preview ? (
            <>
              <button
                className="w-full btn btn-primary mb-4"
                onClick={saveChanges}
              >
                Сохранить
              </button>
              <button
                className="w-full btn btn-outline btn-error"
                onClick={deleteProduct}
              >
                Удалить
              </button>
            </>
          ) : data ? (
            <Button onClick={toggleActive} active={active} />
          ) : (
            <Button skeleton />
          )}
          <p className="text-xl pt-4">Описание</p>
          <p
            className={classNames("outline-none", {
              "textarea bg-gray-200 mt-4 min-h-[140px]": preview,
            })}
            contentEditable={preview}
            ref={descriptionRef}
          >
            {description}
          </p>
        </div>
      </div>
    </Content>
  );
}

export async function getStaticProps({ params, preview }) {
  if (params.id === "create" && params.slug === "new") {
    return {
      props: {
        product: {
          name: "",
          description: "",
          price: "",
          publicId: "",
          src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8+vz1fwAJKAO48yd7dQAAAABJRU5ErkJggg==",
        },
        preview: true,
      },
    };
  }

  const product = await prisma.product.findUnique({
    where: {
      publicId: params.id,
    },
    select: {
      name: true,
      description: true,
      price: true,
      publicId: true,
      src: true,
    },
  });

  if (!product) {
    return { notFound: true };
  }

  if (preview) {
    return {
      props: {
        product,
        preview: true,
      },
    };
  }

  return {
    props: {
      product,
      preview: false,
    },
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  const products = await prisma.product.findMany({
    select: {
      publicId: true,
      name: true,
    },
  });

  const paths = products.map(({ publicId, name }) => ({
    params: {
      id: publicId,
      slug: slugify(name),
    },
  }));

  return {
    paths,
    fallback: true,
  };
}
