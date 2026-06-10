import { Button } from "@/components/ui/button";
import { convertedToSubcurrency } from "@/lib/subcurrency";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function StripeForm({
  amount,
  setOpenDialog,
}: {
  amount: number;
  setOpenDialog: any;
}) {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async function () {
      await fetch("/api/payment/create-payment-intend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: convertedToSubcurrency(amount),
        }),
      })
        .then((res) => res.json())
        .then((res) => setClientSecret(res.clientSecret));
    })();
  }, [amount]);

  const handelSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      setLoading(false);
      return;
    }

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `http://www.localhost:3000/payment-success?amount=${amount}`,
      },
      redirect: "if_required",
    });

    if (error) {
      setErrorMessage(error.message);
      toast.error(error.message || "Payment not collected");
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      console.log("Status:", paymentIntent.status);
      console.log("Amount Paid:", paymentIntent.amount / 100);
      setOpenDialog(false);
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={handelSubmit}
      className="flex flex-col gap-10 justify-center items-center w-full"
    >
      {clientSecret ? (
        <PaymentElement className="w-full" />
      ) : (
        <Loader className="animate-spin" />
      )}
      <Button
        disabled={!stripe || loading || !clientSecret}
        className="bg-black text-white w-full py-2 rounded"
      >
        {!loading ? "Pay the amount" : "Processing"}
      </Button>
      {errorMessage}
    </form>
  );
}
