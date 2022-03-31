import Link from "next/link";

export default function Card({ title, price, cart, href }) {
  return (
    <div className="card">
      <Link href={href}>
        <a className="image-link">
          <div className="image"></div>
        </a>
      </Link>
      <div className="description">
        <Link href={href}>
          <a className="title-link">
            <p className="title">{title}</p>
          </a>
        </Link>
        <div className="price-and-button">
          <p className="price">{price} ₽</p>
          <div className="button">
            {cart ? (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 0 24 24"
                  width="24px"
                  fill="white"
                >
                  <path d="M0 0h24v24H0V0z" fill="none" />
                  <path d="M1.41 1.13L0 2.54l4.39 4.39 2.21 4.66-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h7.46l1.38 1.38c-.5.36-.83.95-.83 1.62 0 1.1.89 2 1.99 2 .67 0 1.26-.33 1.62-.84L21.46 24l1.41-1.41L1.41 1.13zM7 15l1.1-2h2.36l2 2H7zM20 4H7.12l2 2h9.19l-2.76 5h-1.44l1.94 1.94c.54-.14.99-.49 1.25-.97l3.58-6.49C21.25 4.82 20.76 4 20 4zM7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2z" />
                </svg>
                <div className="buy-text">Убрать</div>
              </>
            ) : (
              <>
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
              <div className="buy-text">В корзину</div>
              </>
            )}
          </div>
        </div>
      </div>
      <style jsx>{`
        .card {
          width: 100%;
          display: flex;
          padding: 10px 0;
          padding-top: 0;
        }

        .image-link {
          min-width: 30%;
          padding-bottom: 30%;
          position: relative;
        }

        @media (min-width: 768px) {
          .image-link {
            min-width: 20%;
            padding-bottom: 20%;
          }
        }

        .image {
          background: gray;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: -1;
        }

        p {
          margin: 0;
        }

        .title-link {
          text-decoration: none;
          color: inherit;
        }

        @media (min-width: 425px) {
          .title-link {
            font-size: 24px;
          }
        }

        .price {
          font-size: 20px;
          font-weight: bold;
        }

        @media (min-width: 425px) {
          .price {
            font-size: 26px;
          }
        }

        .buy-text {
          display: none;
          padding-left: 8px;
          color: white;
        }

        @media (min-width: 540px) {
          .buy-text {
            display: block;
          }
        }

        .description {
          padding-left: 10px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          width: 100%;
        }

        .price-and-button {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .button {
          background: var(--blue);
          display: inline-flex;
          padding: 8px;
          border-radius: var(--radius);
          align-items: center;
        }

        @media (min-width: 540px) {
          .price-and-button {
            flex-direction: column;
            align-items: flex-start;
          }

          .button {
            margin-top: 16px;
          }
        }
      `}</style>
    </div>
  );
}
