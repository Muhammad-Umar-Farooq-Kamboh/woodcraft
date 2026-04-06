import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CategoryList } from "@/data/InventoryData";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const formSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters.")
    .max(20, "Name must be at most 20 characters."),
  categorie: z
    .string()
    .min(3, "Category must be at least 2 characters.")
    .max(15, "Category must be at most 15 characters."),
  unit_price: z.coerce
    .number()
    .min(1, "Min 1.")
    .max(100000, "Price is too high"),
  numberOfProduct: z.coerce
    .number()
    .min(1, "Min 1")
    .max(10000, "Too many products"),
  low_stock_threshold: z.coerce
    .number()
    .min(1, "Min 1")
    .max(100, "Please enter less than 100"),
});

export default function EditInventory({ data, setdata }: any) {
  const [isLoading, setIsLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema as any),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: {
      name: data.name,
      categorie: data.categorie,
      unit_price: 0,
      numberOfProduct: 0,
      low_stock_threshold: data.low_stock_threshold,
    },
  });
  async function onSubmit(dataOfForm: z.infer<typeof formSchema>) {
    setIsLoading(true);
    console.log(dataOfForm);
    const updatedData = { id: data.id, ...dataOfForm };
    try {
      const res = await axios.post(
        "/api/inventory/update-selected-material",
        updatedData,
      );
      if (res.status === 200) {
        setdata((prev: any) =>
          prev.map((e: any) => (e.id === res.data.data.id ? res.data.data : e)),
        );
        toast.success(res.data.message || "Materail added successfully");
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data.message || "Issue in updating material",
      );
    } finally {
      setIsLoading(false);
      setOpenDialog(false);
      form.reset();
    }
  }
  return (
    <div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger className="bg-white border-1 cursor-pointer flex items-center gap-2 px-3 py-2 rounded-sm">
          Edit
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm md:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl text-[#745247]">
              Add Product
            </DialogTitle>
            <DialogDescription>
              Add new items and than click on add button.
            </DialogDescription>
          </DialogHeader>
          <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup className="grid grid-cols-2">
              <div className="col-span-2">
                <Controller
                  name="name"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel
                        className="text-[#3D2514]"
                        htmlFor="form-rhf-demo-name"
                      >
                        Product Name
                      </FieldLabel>
                      <div className="relative">
                        <Input
                          {...field}
                          id="form-rhf-demo-name"
                          aria-invalid={fieldState.invalid}
                          placeholder="Enter product name"
                          autoComplete="off"
                          className="focus:border-none"
                        />
                      </div>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>

              <Controller
                name="categorie"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-[#3D2514]">Category</FieldLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="focus:border-none">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {CategoryList.map((e, n) => (
                          <SelectItem value={e} key={n}>
                            {e}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="numberOfProduct"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      className="text-[#3D2514]"
                      htmlFor="form-rhf-demo-nump"
                    >
                      Qunatity
                    </FieldLabel>
                    <div className="relative">
                      <Input
                        type="number"
                        {...field}
                        id="form-rhf-demo-nump"
                        aria-invalid={fieldState.invalid}
                        placeholder="Enter number of product"
                        autoComplete="off"
                        className="focus:border-none"
                      />
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="unit_price"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      className="text-[#3D2514]"
                      htmlFor="form-rhf-demo-unit-price"
                    >
                      Unit Price
                    </FieldLabel>
                    <div className="relative">
                      <Input
                        type="number"
                        {...field}
                        id="form-rhf-demo-unit-price"
                        aria-invalid={fieldState.invalid}
                        placeholder="Enter unit price"
                        autoComplete="off"
                        className="focus:border-none"
                      />
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="low_stock_threshold"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      className="text-[#3D2514]"
                      htmlFor="form-rhf-demo-low-stock-threshold"
                    >
                      Low Stock Threshold
                    </FieldLabel>
                    <div className="relative">
                      <Input
                        type="number"
                        {...field}
                        id="form-rhf-demo-low-stock-threshold"
                        aria-invalid={fieldState.invalid}
                        placeholder="Enter unit price"
                        autoComplete="off"
                        className="focus:border-none"
                      />
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                variant="outline"
                className="text-[#784922] hover:text-[#784922e8]"
                disabled={isLoading}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              form="form-rhf-demo"
              className="bg-[#784922] hover:bg-[#784922e8]"
              disabled={isLoading}
            >
              Update
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
