import { LinkButton } from "../../ui/LinkButton";
import { Button } from "../../ui/Button";
import CartItem from "./CartItem";
import EmptyCart from "./EmptyCart";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "./cartSlice";
import { clearCart } from "./cartSlice";
function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector(getCart);
  const username = useSelector((state) => state.user.username);
  if (cart.length === 0) return <EmptyCart />;
  return (
    <div>
      <LinkButton linkTo={"/menu"}>&larr; Back to menu</LinkButton>

      <h2 className="mt-7 text-xl font-semibold">Your cart, {username}</h2>
      <ul className="mt-3 divide-y divide-stone-200 border-b">
        {cart.map((item) => (
          <CartItem item={item} key={item.name} />
        ))}
      </ul>
      <div className="mt-6 space-x-4">
        <Button linkTo={"/order/new"} type="primary">
          Order pizzas
        </Button>
        <Button
          type={"secondary"}
          onClick={() => dispatch(clearCart())}
          hidden={cart.length === 0}
        >
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
