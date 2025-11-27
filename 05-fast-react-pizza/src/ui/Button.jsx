import { Link } from "react-router-dom";

export function Button({ children, isDisabled, linkTo, type }) {
  const base =
    "inline-block rounded-full bg-yellow-500  font-semibold uppercase tracking-wide text-stone-800 duration-300 hover:bg-yellow-300 hover:transition-colors focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-yellow-200 ";
  const styles = {
    primary: base + " px-4 py-2 md:px-6 md:py-3",
    small: base + " px-4 py-2 md:px-5 md:py-2.5 text-xs",
  };
  if (linkTo)
    return (
      <Link to={linkTo} className={styles[type]}>
        {children}
      </Link>
    );
  return (
    <button disabled={isDisabled} className={styles[type]}>
      {children}
    </button>
  );
}
