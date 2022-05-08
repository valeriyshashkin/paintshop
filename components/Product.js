import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";
import { useSWRConfig } from "swr";
import Image from "next/image";
import isNumber from "is-number";

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
    <div className="page">
      <div className="image half">
        {src && <Image src={src} layout="fill" objectFit="cover" alt="" />}
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={changeFile}
        />
        <label className="upload" htmlFor="file-upload">
          Загрузить фото
        </label>
      </div>
      <div className="after-image half">
        <label>Название</label>
        <input value={name} onChange={changeName} />
        <label>Описание</label>
        <textarea value={description} onChange={changeDescription} />
        <label>Цена</label>
        <input value={price} onChange={changePrice} />
        <div className="button-save" onClick={!valid ? undefined : edit ? save : create}>
          {loading ? "Загрузка..." : edit ? "Сохранить" : "Добавить"}
        </div>
        {edit && (
          <div className="button-delete" onClick={remove}>
            Удалить товар
          </div>
        )}
      </div>
      <style jsx>{`
        #file-upload {
          opacity: 0;
          width: 0;
          position: absolute;
        }

        .upload {
          background: rgb(128 128 128 / 70%);
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          text-align: center;
          padding: 20px 0;
          color: white;
          cursor: pointer;
          user-select: none;
        }

        input {
          display: block;
          padding: 15px;
          border-radius: var(--radius);
          border: none;
          background: lightgray;
          margin: 20px 0;
          width: 100%;
          box-sizing: border-box;
          outline-color: var(--blue);
        }

        textarea {
          display: block;
          margin: 20px 0;
          background: lightgray;
          border: none;
          border-radius: var(--radius);
          width: 100%;
          outline-color: var(--blue);
          padding: 15px;
          box-sizing: border-box;
          resize: none;
          height: 100px;
        }

        .image {
          width: 100%;
          padding-bottom: 100%;
          background: lightgray;
          margin-bottom: 20px;
          position: relative;
        }

        @media (min-width: 700px) {
          .image {
            padding-bottom: 50%;
          }

          .after-image {
            margin-left: 10px;
          }

          .half {
            width: 50%;
          }

          .page {
            display: flex;
            align-items: flex-start;
          }
        }

        .button-save,
        .button-delete {
          display: inline-block;
          background: gray;
          padding: 10px;
          border-radius: var(--radius);
          color: white;
          cursor: ${valid ? "pointer" : "not-allowed"};
          margin-bottom: 20px;
          user-select: none;
        }

        .button-save {
          background: ${valid ? "var(--blue)" : "gray"};
        }

        .button-delete {
          background: none;
          color: var(--red);
        }
      `}</style>
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
      <style jsx>{`
        label {
          background: lightgray;
          border-radius: var(--radius);
          width: 100px;
          display: block;
          height: 19px;
        }

        .input {
          display: block;
          padding: 15px;
          border-radius: var(--radius);
          border: none;
          background: lightgray;
          margin: 20px 0;
          width: 100%;
          box-sizing: border-box;
          outline-color: var(--blue);
          height: 46px;
        }

        .textarea {
          display: block;
          margin: 20px 0;
          background: lightgray;
          border: none;
          border-radius: var(--radius);
          width: 100%;
          outline-color: var(--blue);
          padding: 15px;
          box-sizing: border-box;
          resize: none;
          height: 100px;
        }

        .image {
          width: 100%;
          padding-bottom: 100%;
          background: lightgray;
          margin-bottom: 20px;
        }

        @media (min-width: 700px) {
          .image {
            padding-bottom: 50%;
          }

          .after-image {
            margin-left: 10px;
          }

          .half {
            width: 50%;
          }

          .page {
            display: flex;
            align-items: flex-start;
          }
        }

        .button-save {
          display: inline-block;
          background: lightgray;
          padding: 10px;
          border-radius: var(--radius);
          color: lightgray;
          margin-bottom: 20px;
          user-select: none;
        }
      `}</style>
    </div>
  );
}
