import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { setCookies, getCookie } from "cookies-next";
import { useEffect } from "react";
import { useSWRConfig } from "swr";
import Image from "next/image";

function Button({ active, cart, onClick, admin, skeleton }) {
  return (
    <>
      <div className="button" onClick={onClick}>
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
        ) : admin ? (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill="white"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M14.06 9.02l.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z" />
            </svg>
            <div className="buy-text">Редактировать</div>
          </>
        ) : (
          <>
            {active ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 0 24 24"
                width="24px"
                fill="black"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
              </svg>
            ) : skeleton ? (
              <div className="button-placeholder"></div>
            ) : (
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
            )}
            <div className="buy-text">{active ? "Добавлено" : "В корзину"}</div>
          </>
        )}
      </div>
      <style jsx>{`
        .button {
          background: ${active
            ? "white"
            : skeleton
            ? "lightgray"
            : "var(--blue)"};
          display: inline-flex;
          padding: 8px;
          border-radius: var(--radius);
          align-items: center;
          cursor: ${skeleton ? "auto" : "pointer"};
          border: 1px solid
            ${active ? "black" : skeleton ? "lightgray" : "var(--blue)"};
          user-select: none;
        }

        .button-placeholder {
          width: 24px;
          height: 24px;
        }

        .buy-text {
          display: none;
          padding-left: 8px;
          color: ${active ? "black" : skeleton ? "lightgray" : "white"};
        }

        @media (min-width: 540px) {
          .buy-text {
            display: block;
          }
        }

        @media (min-width: 540px) {
          .button {
            margin-top: 16px;
          }
        }
      `}</style>
    </>
  );
}

export default function Card({
  data,
  title,
  price,
  cart,
  href,
  publicId,
  admin,
  onRemoveFromCart,
  src,
}) {
  const [active, setActive] = useState(false);
  const router = useRouter();
  const { mutate } = useSWRConfig();

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

  function toEdit() {
    router.push(`/admin/products/${publicId}`);
  }

  function handleRemove() {
    onRemoveFromCart(publicId);
  }

  useEffect(() => {
    if (data) {
      setActive(data.some((product) => product.publicId === publicId));
    }
  }, [data, publicId]);

  return (
    <div className="card">
      <Link href={href}>
        <a className="image-link">
          <Image src={src} layout="fill" objectFit="cover" alt="" />
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
          {data || cart || admin ? (
            <Button
              onClick={admin ? toEdit : cart ? handleRemove : toggleActive}
              cart={cart}
              active={active}
              admin={admin}
            />
          ) : (
            <Button skeleton />
          )}
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

        p {
          margin: 0;
        }

        .title-link {
          text-decoration: none;
          color: inherit;
          margin-right: auto;
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

        @media (min-width: 540px) {
          .price-and-button {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="card">
      <a className="image-link">
        <div className="image"></div>
      </a>
      <div className="description">
        <a className="title-link">
          <p className="title"></p>
        </a>
        <div className="price-and-button">
          <p className="price"></p>
          <Button skeleton />
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
          background: lightgray;
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
          margin-right: auto;
          background: lightgray;
          height: 20px;
          width: 100%;
          max-width: 400px;
          border-radius: var(--radius);
        }

        @media (min-width: 425px) {
          .title-link {
            font-size: 24px;
            height: 30px;
          }
        }

        .price {
          font-size: 20px;
          font-weight: bold;
          height: 40px;
          width: calc(100% - 42px - 10px);
          max-width: 200px;
          background: lightgray;
          border-radius: var(--radius);
        }

        @media (min-width: 425px) {
          .price {
            font-size: 26px;
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

        @media (min-width: 540px) {
          .price-and-button {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </div>
  );
}
