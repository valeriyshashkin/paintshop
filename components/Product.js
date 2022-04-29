import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";

export default function Product({ edit }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const router = useRouter();

  function changeName(e) {
    setName(e.target.value);
  }

  function changeDescription(e) {
    setDescription(e.target.value);
  }

  function changePrice(e) {
    setPrice(e.target.value);
  }

  function cancel() {
    router.push("/admin/products");
  }

  useEffect(() => {
    if (edit) {
      setName(edit.name);
      setDescription(edit.description);
      setPrice(edit.price);
    }
  }, [edit]);

  return (
    <div className="page">
      <div className="image half"></div>
      <div className="after-image half">
        <label>Название</label>
        <input value={name} onChange={changeName} />
        <label>Описание</label>
        <textarea value={description} onChange={changeDescription} />
        <label>Цена</label>
        <input value={price} onChange={changePrice} />
        <div className="button-save">{edit ? "Сохранить" : "Добавить"}</div>
        {edit && <div className="button-delete">Удалить товар</div>}
      </div>
      <style jsx>{`
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
