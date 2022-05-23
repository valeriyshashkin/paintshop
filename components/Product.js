import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";
import { useSWRConfig } from "swr";
import Image from "next/image";
import classNames from "classnames";

export default function Product({ edit, publicId }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [src, setSrc] = useState();
  const [image, setImage] = useState();
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
    setLoading(true);
    fetch("/api/products/delete", {
      method: "POST",
      body: JSON.stringify({ publicId }),
    }).then(() => router.push("/admin/products"));
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
          className="absolute bottom-0 left-0 right-0 btn btn-primary m-2"
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
          onClick={edit ? save : create}
        >
          {edit ? "Сохранить" : "Добавить"}
        </button>
        {edit && (
          <label
            htmlFor="delete-modal"
            className="btn btn-error btn-outline w-full"
          >
            Удалить
          </label>
        )}
      </div>
      <input type="checkbox" id="delete-modal" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Вы уверены, что хотите удалить этот товар?
          </h3>
          <p className="pt-4">Вы не сможете восстановить этот товар позже</p>
          <div className="modal-action">
            <button
              onClick={remove}
              className={classNames("btn btn-error btn-outline", { loading })}
            >
              Удалить
            </button>
            <label htmlFor="delete-modal" className="btn btn-primary">
              Отмена
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProductSkeleton() {
  return (
    <div className="grid sm:grid-cols-2 sm:gap-8">
      <div className="w-full pb-full relative block bg-gray-100"></div>
      <div>
        <div className="h-[20px] rounded-lg my-2 w-full bg-gray-100"></div>
        <div className="bg-gray-100 w-full h-[48px] rounded-lg" />
        <div className="h-[20px] rounded-lg my-2 w-full bg-gray-100"></div>
        <div className="bg-gray-100 w-full h-[74px] rounded-lg" />
        <div className="h-[20px] rounded-lg mb-2 mt-4 w-full bg-gray-100"></div>
        <div className="bg-gray-100 w-full mb-4 h-[48px] rounded-lg" />
        <div className="h-[48px] w-full my-4 bg-gray-100 rounded-lg"></div>
        <div className="h-[48px] w-full my-4 bg-gray-100 rounded-lg"></div>
      </div>
    </div>
  );
}
