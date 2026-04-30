import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import axios from "axios";
import { toast } from "sonner";

const formSchema = z.object({
  assignEmployee: z.string().min(2, "Please Select One of them"),
});

export default function OrderAssignToEmployee({
  employee,
  oderId,
  setListOfOrders,
}: any) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      assignEmployee: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const isConfermed = window.confirm(
      "Are you sure? You cannot change it after assigning once.",
    );
    if (!isConfermed) return;
    try {
      const dataWithId = { ...data, oderId };
      const res = await axios.post(
        "/api/employee/assign-order-to-employee",
        dataWithId,
      );
      if (res.status === 200) {
        setListOfOrders((prev: any) =>
          prev.map((e: any) => (e.id === res.data.data.id ? res.data.data : e)),
        );
        toast.success(res.data.message || "Order assign successfully");
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data.message || "Order not assigned to employee",
      );
    }
  }

  const handleValueChange = (value: string) => {
    form.setValue("assignEmployee", value);
    form.handleSubmit(onSubmit)();
  };
  return (
    <form
      id="form-rhf-demo"
      onSubmit={form.handleSubmit(onSubmit)}
      className="w-50"
    >
      <FieldGroup>
        <Controller
          name="assignEmployee"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <Select value={field.value} onValueChange={handleValueChange}>
                <SelectTrigger className="focus:border-none">
                  <SelectValue placeholder="Assign order to employee" />
                </SelectTrigger>
                <SelectContent>
                  {employee.map((e: any, n: number) => (
                    <SelectItem value={e.id} key={n}>
                      {e.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
    </form>
  );
}
