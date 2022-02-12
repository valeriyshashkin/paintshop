export default function Content({ children }) {
  return (
    <div>
      {children}
      <style jsx>{`
        div {
          margin: 0 auto;
          margin-top: 60px;
          padding: 0 10px;
          max-width: 1024px;
        }
      `}</style>
    </div>
  );
}
