import { Link, useNavigate } from "react-router-dom";

export function LinkButton({ children, linkTo }) {
  const navigate = useNavigate();
  const className = "text-sm text-blue-500 hover:text-blue-700";
  if (linkTo === "-1")
    return (
      <button onClick={() => navigate(-1)} className={className}>
        {children}
      </button>
    );

  return (
    <Link to={linkTo} className={className}>
      {children}
    </Link>
  );
}
