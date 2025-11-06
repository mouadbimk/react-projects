export default function Button({ children, type, style, onClick }) {
  return (
    <button
      type={type || "button"}
      style={style}
      className="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
