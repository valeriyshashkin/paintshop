import Header from "../components/Header";

export default function Cart() {
  return "Корзина";
}

Cart.getLayout = (page) => {
  return (
    <>
      <Header back cart />
      {page}
    </>
  );
};
