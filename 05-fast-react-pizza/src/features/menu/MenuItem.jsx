import { formatCurrency } from "../../utils/helpers";
import NoImage from "../../assets/no-image.jpg";
function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  return (
    <li data-id={id}>
      <img
        src={imageUrl}
        alt={name}
        onError={(e) => {
          e.target.src = NoImage;
        }}
      />
      <div>
        <p>{name}</p>
        <p>{ingredients.join(", ")}</p>
        <div>
          {!soldOut ? <p>{formatCurrency(unitPrice)}</p> : <p>Sold out</p>}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
