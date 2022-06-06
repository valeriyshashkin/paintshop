import Header from "../../../components/Header";
import Content from "../../../components/Content";
import Head from "next/head";
import { useState } from "react";
import prisma from "../../../utils/prisma";
import slugify from "slugify";
import useSWR from "swr";
import fetcher from "../../../utils/fetcher";
import { useEffect } from "react";
import { getCookie, setCookies } from "cookies-next";
import { useSWRConfig } from "swr";
import Image from "next/image";
import { useRouter } from "next/router";
import classNames from "classnames";
import { CameraIcon } from "@heroicons/react/outline";

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

export default function Product({
  product = { name: "" },
  preview,
  createNew,
}) {
  const [active, setActive] = useState(false);
  const [image, setImage] = useState();
  const [urlToImage, setUrlToImage] = useState(product.src);
  const { data } = useSWR("/api/cart", fetcher);
  const { mutate } = useSWRConfig();
  const router = useRouter();
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [description, setDescription] = useState(product.description);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

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
    setLoading(true);
    fetch("/api/products/delete", {
      method: "POST",
      body: JSON.stringify({ publicId: product.publicId }),
    }).then(() => router.push("/"));
  }

  function saveChanges() {
    setLoading(true);
    fetch("/api/images/sign")
      .then((res) => res.json())
      .then(({ timestamp, signature }) => {
        const fd = new FormData();
        fd.append("file", image);
        fd.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY);
        fd.append("timestamp", timestamp);
        fd.append("signature", signature);

        fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          { method: "POST", body: fd }
        )
          .then((res) => res.json())
          .then(({ public_id }) => {
            if (createNew) {
              fetch("/api/products/create", {
                method: "POST",
                body: JSON.stringify({
                  name,
                  description,
                  price,
                  src: public_id,
                }),
              }).then(() => {
                router.push("/");
              });
            } else {
              fetch("/api/products/edit", {
                method: "POST",
                body: JSON.stringify({
                  name,
                  description,
                  price,
                  publicId: product.publicId,
                  src: public_id,
                }),
              }).then(() => {
                mutate(`/api/products/${product.publicId}`, {
                  name,
                  description,
                  price,
                });
                router.push("/");
              });
            }
          });
      });
  }

  function changeImage(e) {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }

    setImage(e.target.files[0]);
    setUrlToImage(URL.createObjectURL(e.target.files[0]));
  }

  function handleName(e) {
    setName(e.target.value);
  }

  function handlePrice(e) {
    setPrice(e.target.value);
  }

  function handleDescription(e) {
    setDescription(e.target.value);
  }

  useEffect(() => {
    if (data) {
      setActive(data.some((p) => p.publicId === product.publicId));
    }
  }, [data, product.publicId]);

  useEffect(() => {
    setDisabled(!name || !price || !description);
  }, [name, price, description]);

  if (router.isFallback) {
    return null;
  }

  return (
    <Content preview={preview}>
      <Header preview={preview} />
      <div className="grid sm:grid-cols-2 gap-8 mb-32">
        <Head>
          <title>{product.name}</title>
        </Head>
        <div>
          <div className="w-full pb-full relative block">
            <Image src={urlToImage} layout="fill" objectFit="cover" alt="" />
            {preview && (
              <>
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={changeImage}
                  hidden
                />
                <label
                  htmlFor="image"
                  className={classNames(
                    "m-4 left-0 right-0 btn btn-primary absolute bottom-0",
                    { loading }
                  )}
                >
                  <CameraIcon className="w-6 h-6 mr-2" />
                  <span>Загрузить</span>
                </label>
              </>
            )}
          </div>
        </div>
        <div>
          {preview ? (
            <input
              className="outline-none w-full border-dashed border-2 border-gray-500 p-2"
              value={name}
              onChange={handleName}
            />
          ) : (
            <h1 className="text-xl font-semibold py-2">{product.name}</h1>
          )}
          <span className="text-3xl font-bold block my-4">
            {preview ? (
              <input
                className="outline-none w-28 border-dashed border-2 border-gray-500 p-2"
                value={price}
                onChange={handlePrice}
              />
            ) : (
              <span>{product.price}</span>
            )}
            <span> ₽</span>
          </span>
          {preview ? (
            <>
              <button
                className={classNames("w-full btn btn-primary mb-4", {
                  loading,
                })}
                onClick={saveChanges}
                disabled={disabled}
              >
                Сохранить
              </button>
              {!createNew && (
                <label
                  htmlFor="delete"
                  className={classNames(
                    "w-full btn btn-outline btn-error modal-button",
                    { loading }
                  )}
                >
                  Удалить
                </label>
              )}

              <input type="checkbox" id="delete" className="modal-toggle" />
              <label htmlFor="delete" className="modal cursor-pointer">
                <label className="modal-box relative space-y-4" htmlFor="">
                  <h3 className="text-lg font-bold text-center">
                    Вы уверены, что хотите удалить этот товар?
                  </h3>
                  <button
                    onClick={deleteProduct}
                    className={classNames("btn btn-error w-full btn-outline", {
                      loading,
                    })}
                  >
                    Удалить
                  </button>
                  <label
                    htmlFor="delete"
                    className={classNames("btn btn-primary w-full", {
                      loading,
                    })}
                  >
                    Отмена
                  </label>
                </label>
              </label>
            </>
          ) : data ? (
            <Button onClick={toggleActive} active={active} />
          ) : (
            <Button skeleton />
          )}
          <p className="text-xl pt-4">Описание</p>
          {preview ? (
            <textarea
              className="outline-none w-full h-48 border-dashed border-2 border-gray-500 p-2 mt-4"
              value={description}
              onChange={handleDescription}
            />
          ) : (
            <div
              dangerouslySetInnerHTML={{
                __html: product.description.replace(/\r?\n/g, "<br />"),
              }}
            ></div>
          )}
        </div>
      </div>
    </Content>
  );
}

export async function getStaticProps({ params, preview }) {
  if (params.id === "create" && params.slug === "new" && preview) {
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
        createNew: true,
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
