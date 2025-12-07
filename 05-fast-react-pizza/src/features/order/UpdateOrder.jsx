import { useFetcher } from "react-router-dom";
import { Button } from "../../ui/Button";
import { updateOrder } from "../../services/apiRestaurant";
function UpdateOrder({ order }) {
  const fetcher = useFetcher();
  return (
    <fetcher.Form method="PATCH" className="text-right">
      <Button type="primary">Make priority</Button>
    </fetcher.Form>
  );
}
export async function action({ params }) {
  const data = { priority: true };
  console.log(params);
  await updateOrder(params.orderId, data);
  return null;
}
export default UpdateOrder;
