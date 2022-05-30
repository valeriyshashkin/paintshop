import classNames from "classnames";

export default function Content({ children, preview }) {
  return (
    <div className={classNames("p-4 w-full max-w-screen-lg mx-auto", {"mb-10": preview})}>
      {children}
    </div>
  );
}
