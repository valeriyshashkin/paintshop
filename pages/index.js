import Card from "../components/Card";

const products = [
  {
    title: "Белая краска тратата тратата тратата",
    price: "1000",
  },
  {
    title: "Белая краска тратата тратата тратата",
    price: "1000",
  },
  {
    title: "Белая краска тратата тратата тратата",
    price: "1000",
  },
  {
    title: "Белая краска тратата тратата тратата",
    price: "1000",
  },
  {
    title: "Белая краска тратата тратата тратата",
    price: "1000",
  },
  {
    title: "Белая краска тратата тратата тратата",
    price: "1000",
  },
  {
    title: "Белая краска тратата тратата тратата",
    price: "1000",
  },
];

export default function Home() {
  return (
    <>
      <header>
        <h1>Краски</h1>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          enableBackground="new 0 0 24 24"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
          fill="#000000"
        >
          <g>
            <rect fill="none" height="24" width="24" />
            <path d="M18,6h-2c0-2.21-1.79-4-4-4S8,3.79,8,6H6C4.9,6,4,6.9,4,8v12c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2V8C20,6.9,19.1,6,18,6z M12,4c1.1,0,2,0.9,2,2h-4C10,4.9,10.9,4,12,4z M18,20H6V8h2v2c0,0.55,0.45,1,1,1s1-0.45,1-1V8h4v2c0,0.55,0.45,1,1,1s1-0.45,1-1V8 h2V20z" />
          </g>
        </svg>
      </header>
      <div className="catalog">
        {products.map(({ title, price }, id) => (
          <Card key={id} title={title} price={price} />
        ))}
      </div>
      <style jsx>{`
        header {
          background: white;
          padding: 15px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: fixed;
          top: 0;
          width: 100%;
          box-sizing: border-box;
        }

        h1 {
          margin: 0;
          font-size: 26px;
        }

        .catalog {
          margin-top: 60px;
        }
      `}</style>
    </>
  );
}
