import Head from "next/head";
import Content from "../../../components/Content";
import Header from "../../../components/Header";
import Navigation from "../../../components/Navigation";
import Card from "../../../components/Card";
import { useRouter } from "next/router";
import getProducts from "../../../utils/getProducts";

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

export default function Products({ products }) {
  const router = useRouter();

  function toCreate() {
    router.push("/admin/products/create");
  }

  return (
    <>
      <div>
        {products.map(({ name, price, href }, id) => (
          <Card key={id} title={name} price={price} href={href} admin />
        ))}
      </div>
      <div className="button-create" onClick={toCreate}>
        <svg
          fill="black"
          xmlns="http://www.w3.org/2000/svg"
          height="48"
          width="48"
        >
          <path d="M22.5 38V25.5H10V22.5H22.5V10H25.5V22.5H38V25.5H25.5V38Z" />
        </svg>
      </div>
      <style jsx>{`
        div {
          margin-top: 10px;
          margin-bottom: 70px;
        }

        .button-create {
          position: fixed;
          bottom: 0;
          right: 0;
          border-radius: 100px;
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 10px;
          margin-right: 10px;
          cursor: pointer;
          background: white;
          box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
            rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
        }

        @media (min-width: 1024px) {
          .button-create {
            right: 50%;
            transform: translateX(512px);
          }
        }
      `}</style>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: { products: await getProducts() },
    revalidate: 60,
  };
}

Products.getLayout = (page) => {
  return (
    <>
      <Head>
        <title>Товары</title>
      </Head>
      <Header admin />
      <Content>
        <Navigation active="products" />
        {page}
      </Content>
    </>
  );
};
