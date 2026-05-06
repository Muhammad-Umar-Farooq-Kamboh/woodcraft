import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

export default function ChangeStatusOfOrder({
  assigmentId,
  orderStatus,
  setListOfOrders,
}: any) {
  const [changeStatus, setChangeStatus] = useState(orderStatus || "");

  const handleStatusChange = async (value: string) => {
    setChangeStatus(value);
    const isProcessFurther = window.confirm("Would you like to change status");
    if (!isProcessFurther) return;
    try {
      const res = await axios.post("/api/order/change-order-status-assigment", {
        orderStatus: value,
        assigmentId,
      });
      if (res.status === 200) {
        toast.success(res.data.message || "Order status updated successfully");
        setListOfOrders((prev: any) =>
          prev.map((e: any) => (e.id === res.data.data.id ? res.data.data : e)),
        );
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "An error occurred while updating the order status",
      );
    }
  };

  return (
    <div>
      {" "}
      {orderStatus === "Delivered" ? (
        <div>Delivered</div>
      ) : (
        <Select onValueChange={handleStatusChange} value={changeStatus}>
          <SelectTrigger className="focus:border-none">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {["Pending", "In_Progress", "Completed"].map(
              (e: any, n: number) => (
                <SelectItem value={e} key={n}>
                  {e}
                </SelectItem>
              ),
            )}
          </SelectContent>
        </Select>
      )}
    </div>
  );
}
