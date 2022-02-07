function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);

  return getLayout(
    <>
      <Component {...pageProps} />
      <style jsx global>{`
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
