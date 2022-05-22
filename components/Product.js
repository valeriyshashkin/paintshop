import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";
import { useSWRConfig } from "swr";
import Image from "next/image";
import isNumber from "is-number";
import classNames from "classnames";

export default function Product({ edit, publicId }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [src, setSrc] = useState();
  const [image, setImage] = useState();
  const [valid, setValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { mutate } = useSWRConfig();

  function changeName(e) {
    setName(e.target.value);
  }

  function changeDescription(e) {
    setDescription(e.target.value);
  }

  function changePrice(e) {
    setPrice(e.target.value);
  }

  function save() {
    setValid(false);
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
            fetch("/api/products/edit", {
              method: "POST",
              body: JSON.stringify({
                name,
                description,
                price,
                publicId,
                src: public_id,
              }),
            }).then(() => {
              mutate(`/api/products/${publicId}`, {
                name,
                description,
                price,
              });
              router.push("/admin/products");
            });
          });
      });
  }

  function create() {
    setValid(false);
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
            fetch("/api/products/create", {
              method: "POST",
              body: JSON.stringify({
                name,
                description,
                price,
                src: public_id,
              }),
            }).then(() => {
              router.push("/admin/products");
            });
          });
      });
  }

  function remove() {
    if (confirm("Вы уверены, что хотите удалить этот товар?")) {
      fetch("/api/products/delete", {
        method: "POST",
        body: JSON.stringify({ publicId }),
      }).then(() => router.push("/admin/products"));
    }
  }

  function changeFile(e) {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }

    setImage(e.target.files[0]);
  }

  useEffect(() => {
    if (!image) {
      return;
    }

    setSrc(URL.createObjectURL(image));

    return () => URL.revokeObjectURL(image);
  }, [image]);

  useEffect(() => {
    if (edit) {
      setName(edit.name);
      setDescription(edit.description);
      setPrice(edit.price);
      setSrc(edit.src);
    }
  }, [edit]);

  useEffect(() => {
    setValid(name && isNumber(price) && src);
  }, [name, price, src]);

  return (
    <div className="grid sm:grid-cols-2 sm:gap-8">
      <div className="w-full pb-full relative block bg-gray-200">
        {src && <Image src={src} layout="fill" objectFit="cover" alt="" />}
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={changeFile}
          className="opacity-0 w-0 absolute"
        />
        <label
          className="absolute bottom-0 left-0 right-0 text-center bg-gray-500 py-5 opacity-90 text-white cursor-pointer"
          htmlFor="file-upload"
        >
          Загрузить фото
        </label>
      </div>
      <div>
        <label className="label">
          <span className="label-text">Название</span>
        </label>
        <input
          className="input bg-gray-200 w-full"
          value={name}
          onChange={changeName}
        />
        <label className="label">
          <span className="label-text">Описание</span>
        </label>
        <textarea
          className="textarea bg-gray-200 w-full"
          value={description}
          onChange={changeDescription}
        />
        <label className="label">
          <span className="label-text">Цена</span>
        </label>
        <input
          className="input bg-gray-200 w-full mb-4"
          value={price}
          onChange={changePrice}
        />
        <button
          className={classNames("btn btn-primary w-full mb-4", { loading })}
          onClick={!valid ? undefined : edit ? save : create}
        >
          {edit ? "Сохранить" : "Добавить"}
        </button>
        {edit && (
          <button className="btn btn-error btn-outline w-full" onClick={remove}>
            Удалить
          </button>
        )}
      </div>
    </div>
  );
}

export function ProductSkeleton() {
  return (
    <div className="page">
      <div className="image half"></div>
      <div className="after-image half">
        <label></label>
        <div className="input"></div>
        <label></label>
        <div className="textarea"></div>
        <label></label>
        <div className="input"></div>
        <div className="button-save">Добавить</div>
      </div>
    </div>
  );
}
