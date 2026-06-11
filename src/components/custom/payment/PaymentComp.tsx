import { convertedToSubcurrency } from "@/lib/subcurrency";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import StripeForm from "./StripeForm";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined");
}
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
);

export default function PaymentComp({
  amount,
  setOpenDialog,
  orderId,
  setListOfOrders,
}: {
  amount: number;
  setOpenDialog: any;
  orderId: string;
  setListOfOrders: any;
}) {
  return (
    <div>
      <Elements
        stripe={stripePromise}
        options={{
          mode: "payment",
          amount: convertedToSubcurrency(amount),
          currency: "pkr",
        }}
      >
        <StripeForm
          amount={amount}
          setOpenDialog={setOpenDialog}
          orderId={orderId}
          setListOfOrders={setListOfOrders}
        />
      </Elements>
    </div>
  );
}
