export default function Card({ title, price }) {
  return (
    <div className="card">
      <div className="image"></div>
      <div className="description">
        <p className="title">{title}</p>
        <div className="price-and-button">
          <p className="price">{price} ₽</p>
          <div className="button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 0 24 24"
                width="24px"
                fill="white"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M15.55 13c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.37-.66-.11-1.48-.87-1.48H5.21l-.94-2H1v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7l1.1-2h7.45zM6.16 6h12.15l-2.76 5H8.53L6.16 6zM7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
              </svg>
          </div>
        </div>
      </div>
      <style jsx>{`
        .card {
          width: 100%;
          display: flex;
          padding: 10px;
          padding-bottom: 0;
        }

        .image {
          background: gray;
          padding-bottom: 30%;
          min-width: 30%;
        }

        p {
          margin: 0;
        }

        .price {
          font-size: 20px;
          font-weight: bold;
        }

        .description {
          padding-left: 10px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .price-and-button {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .button {
          background: gray;
          display: inline-flex;
          padding: 8px;
          border-radius: 8px;
        }
      `}</style>
    </div>
  );
}
