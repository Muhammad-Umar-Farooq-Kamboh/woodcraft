import { Button } from "@/components/ui/button";
import { convertedToSubcurrency } from "@/lib/subcurrency";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function StripeForm({
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
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);

  async function updatePaymentStatus(id: string) {
    try {
      const res = await axios.patch("/api/payment/update-payment-status", {
        id,
      });
      if (res.status === 200) {
        toast.success(res.data.message || "Payment accepted successfully");
        setListOfOrders((prev: any) =>
          prev.map((o: any) => (o.id === res.data.data.id ? res.data.data : o)),
        );
        return true;
      }
    } catch (error: any) {
      toast.error(error?.response?.data.message || "Error in updating payment");
      return false;
    }
  }
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

    const { error: submitError }: any = await elements.submit();
    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }

    const { error, paymentIntent }: any = await stripe.confirmPayment({
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
      const updated = await updatePaymentStatus(orderId);
      if (updated) {
        setOpenDialog(false);
      }
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
