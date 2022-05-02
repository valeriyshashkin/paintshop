import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";
import { useSWRConfig } from "swr";

export default function Product({ edit, publicId }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
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
    fetch("/api/products/edit", {
      method: "POST",
      body: JSON.stringify({ name, description, price, publicId }),
    }).then(() => {
      mutate(`/api/products/${publicId}`, { name, description, price });
      router.push("/admin/products");
    });
  }

  function create() {
    fetch("/api/products/create", {
      method: "POST",
      body: JSON.stringify({ name, description, price }),
    }).then(() => router.push("/admin/products"));
  }

  function remove() {
    if (confirm("Вы уверены, что хотите удалить этот товар?")) {
      fetch("/api/products/delete", {
        method: "POST",
        body: JSON.stringify({ publicId }),
      }).then(() => router.push("/admin/products"));
    }
  }

  function upload() {}

  useEffect(() => {
    if (edit) {
      setName(edit.name);
      setDescription(edit.description);
      setPrice(edit.price);
    }
  }, [edit]);

  return (
    <div className="page">
      <div className="image half">
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={upload}
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
        <div className="button-save" onClick={edit ? save : create}>
          {edit ? "Сохранить" : "Добавить"}
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
          background: lightgray;
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          text-align: center;
          padding: 20px 0;
          color: black;
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
          background: gray;
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
          cursor: pointer;
          margin-bottom: 20px;
        }

        .button-save {
          background: var(--blue);
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
