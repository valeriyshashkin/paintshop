import Header from "../components/Header";
import Card from "../components/Card";
import Content from "../components/Content";
import Head from "next/head";

const products = [
  {
    title: "Белая краска тратата тратата тратата",
    price: "1000",
    href: "/product/777/paint",
  },
  {
    title: "Белая краска тратата тратата тратата",
    price: "1000",
    href: "/product/777/paint",
  },
  {
    title: "Белая краска тратата тратата тратата",
    price: "1000",
    href: "/product/777/paint",
  },
  {
    title: "Белая краска тратата тратата тратата",
    price: "1000",
    href: "/product/777/paint",
  },
  {
    title: "Белая краска тратата тратата тратата",
    price: "1000",
    href: "/product/777/paint",
  },
  {
    title: "Белая краска тратата тратата тратата",
    price: "1000",
    href: "/product/777/paint",
  },
  {
    title: "Белая краска тратата тратата тратата",
    price: "1000",
    href: "/product/777/paint",
  },
];

export default function Cart() {
  return (
    <>
      <div>
        <p className="total">
          Итого: <span className="price">1000 ₽</span>
        </p>
        <p className="tip">
          Чтобы заказать товары, напишите нам на почту{" "}
          <a href="mailto:admin@admin.com">admin@admin.com</a>. В тексте письма
          укажите товары, которые вы хотите приобрести.
        </p>
      </div>
      {products.map(({ title, price, href }, id) => (
        <Card cart key={id} title={title} price={price} href={href} />
      ))}
      <style jsx>{`
        div {
          padding-bottom: 10px;
        }

        p {
          margin: 0;
        }

        .price {
          font-weight: bold;
        }

        .tip {
          margin-top: 10px;
        }

        .total {
          font-size: 30px;
        }
      `}</style>
    </>
  );
}

Cart.getLayout = (page) => {
  return (
    <>
      <Head>
        <title>Корзина</title>
      </Head>
      <Content>
        <Header back cart />
        {page}
      </Content>
    </>
  );
};
