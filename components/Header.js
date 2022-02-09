import Link from "next/link";

export default function Header({ back, cart }) {
  return (
    <header>
      {back ? (
        <>
          <Link href="/">
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 0 24 24"
                width="24px"
                fill="#000000"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
              </svg>
            </a>
          </Link>
          {cart && <h1 className="cart">Корзина</h1>}
        </>
      ) : (
        <>
          <Link href="/">
            <a>
              <h1>Краски</h1>
            </a>
          </Link>
          <Link href="/cart">
            <a>
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
            </a>
          </Link>
        </>
      )}
      <style jsx>{`
        header {
          background: white;
          padding: 15px 10px;
          display: flex;
          align-items: center;
          justify-content: ${back ? "flex-start" : "space-between"};
          position: fixed;
          top: 0;
          width: 100%;
          box-sizing: border-box;
        }

        h1 {
          margin: 0;
          font-size: 26px;
          margin-left: ${back ? "15px" : "0"};
        }

        .cart {
          justify-content: flex-start;
        }

        a {
          text-decoration: none;
          color: inherit;
        }
      `}</style>
    </header>
  );
}
