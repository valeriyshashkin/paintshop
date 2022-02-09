export default function Content({ children }) {
  return (
    <div>
      {children}
      <style jsx>{`
        div {
          margin-top: 60px;
          padding: 0 10px;
        }
      `}</style>
    </div>
  );
}
