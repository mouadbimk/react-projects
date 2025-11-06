import Button from "./Button";

export default function Sort({ setSortBy, onReset }) {
  return (
    <div className="container-sort">
      <select
        onChange={(e) => setSortBy(e.target.value)}
        className="sort-select"
      >
        <option value="default">Default</option>
        <option value="title">Title</option>
        <option value="complete">Complete</option>
      </select>
      <Button
        style={{
          border: "1px solid #1864ab",
          borderRadius: "10px",
          height: "auto",
        }}
        onClick={onReset}
      >
        Reset
      </Button>
    </div>
  );
}
