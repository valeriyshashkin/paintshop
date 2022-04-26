import { useRouter } from "next/router";

export default function Product({ edit }) {
  const router = useRouter();

  function cancel() {
    router.push("/admin/products");
  }

  return (
    <div className="page">
      <div className="image half"></div>
      <div className="after-image half">
        <label>Название</label>
        <input />
        <label>Цена</label>
        <input />
        <div className="button-save">{edit ? "Сохранить" : "Добавить"}</div>
        <div className="button-cancel" onClick={cancel}>
          Отмена
        </div>
        <br />
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
        .button-cancel {
          display: inline-block;
          background: gray;
          padding: 10px;
          border-radius: var(--radius);
          color: white;
          cursor: pointer;
          margin-bottom: 20px;
        }

        .button-cancel {
          margin-left: 8px;
        }

        .button-save {
          background: var(--blue);
        }

        .button-delete {
          color: var(--red);
          margin: 30px 0;
          cursor: pointer;
          display: inline-block;
        }
      `}</style>
    </div>
  );
}