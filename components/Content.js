export default function Content({ children }) {
  return (
    <div>
      {children}
      <style jsx>{`
        div {
          margin-top: 60px;
        }
      `}</style>
    </div>
  );
}
