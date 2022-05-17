import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { setCookies, getCookie } from "cookies-next";
import { useEffect } from "react";
import { useSWRConfig } from "swr";
import Image from "next/image";

function Button({ active, cart, onClick, admin, skeleton }) {
  return cart ? (
    <button className="btn btn-primary">Убрать</button>
  ) : admin ? (
    <a className="btn btn-primary">Редактировать</a>
  ) : (
    <button className="btn btn-primary">В корзину</button>
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
    <div class="bg-white rounded-lg shadow-md">
      <a href={href} className="w-full pb-full relative block">
        <Image
          className="rounded-t-lg"
          src={src}
          layout="fill"
          objectFit="cover"
          alt=""
        />
      </a>
      <div class="px-5 py-5">
        <a href={href}>
          <h5 class="text-xl font-semibold tracking-tight text-gray-900">
            {title}
          </h5>
        </a>
        <div class="flex justify-between items-center">
          <span class="text-3xl font-bold text-gray-900">{price} ₽</span>
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
    </div>
    // <Link href={href}>
    //   <a className="card shadow-xl">
    //     <figure>
    //     </figure>
    //     <div className="card-body">
    //       <h2 className="title">{title}</h2>
    //       <div className="price-and-button">
    //         <p className="price">{price} ₽</p>
    //         {data || cart || admin ? (
    //           <Button
    //             onClick={admin ? toEdit : cart ? handleRemove : toggleActive}
    //             cart={cart}
    //             active={active}
    //             admin={admin}
    //           />
    //         ) : (
    //           <Button skeleton />
    //         )}
    //       </div>
    //     </div>
    //   </a>
    // </Link>
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
