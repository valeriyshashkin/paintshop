function MyApp({ Component, pageProps }) {
  return (
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
