import { Link } from "react-router-dom";

export function Button({ children, isDisabled, linkTo }) {
  const className =
    "inline-block rounded-full bg-yellow-500 px-4 py-3 font-semibold uppercase tracking-wide text-stone-800 duration-300 hover:bg-yellow-300 hover:transition-colors focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-yellow-200 sm:px-6 sm:py-6";
  if (linkTo)
    return (
      <Link to={linkTo} className={className}>
        {children}
      </Link>
    );
  return (
    <button disabled={isDisabled} className={className}>
      {children}
    </button>
  );
}
