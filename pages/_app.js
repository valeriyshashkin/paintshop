function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);

  return getLayout(
    <>
      <Component {...pageProps} />
      <style jsx global>{`
        :root {
          --blue: #3737ff;
          --radius: 8px;
          --red: #ff5555;
        }

        body {
          margin: 0;
        }

        * {
          font-family: Inter;
        }
      `}</style>
    </>
  );
}

export default MyApp;
