import { Button } from "@/components/ui/button";
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
import { Textarea } from "@/components/ui/textarea";
import { finishingPrefrences, projectTypes } from "@/data/InventoryData";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

const formSchema = z.object({
  product_type: z.string().min(3, "Product must be selected"),
  product_wood_type: z.string().min(3, "Product wood type must be selected"),
  product_discription: z
    .string()
    .min(6, "Discription must contain 6 characters")
    .max(300, "Discription contain max 300 characters"),
  aditional_info: z.string().optional(),
  address: z
    .string()
    .min(6, "Address must be at least 6 characters.")
    .max(100, "Address contain max 100 characters"),
  product_quantity: z.coerce
    .number()
    .min(1, "Min product is 1")
    .max(100, "You can't order more than 100"),
  finishing_touch: z.string().min(3, "Finishing must be selected"),
});

export default function CreateOrderComp({ listOfWoodCategorie }: any) {
  const [woodcost, setWoodCost] = useState(0);
  const [labourCost, setLabourCost] = useState(0);
  const [noOfProducts, setNoOfProducts] = useState(1);
  const [finishingPrefrencesCost, setFinishingPrefrencesCost] = useState(0);
  const price_without_tax =
    noOfProducts *
    (woodcost + (woodcost * 5) / 100 + labourCost + finishingPrefrencesCost);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema as any),
    defaultValues: {
      product_type: "",
      product_wood_type: "",
      product_discription: "",
      aditional_info: "",
      address: "",
      product_quantity: 1,
      finishing_touch: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
  }
  return (
    <div className="bg-[#FDFDFC] p-4 border-1 rounded-2xl flex flex-col gap-4">
      <div>
        <h3 className="text-2xl text-[#3D2514] font-semibold">
          Project Details
        </h3>
        <p>Tell us about your woodwork project</p>
      </div>
      <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup className="grid md:grid-cols-2">
          <Controller
            name="product_type"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel className="text-[#3D2514]">Project Type</FieldLabel>
                <Select
                  value={field.value}
                  onValueChange={(value) => {
                    field.onChange(value);
                    const selectedItem = projectTypes.find(
                      (item: any) => item.name === value,
                    );
                    if (selectedItem) {
                      setLabourCost(selectedItem.labour);
                    }
                  }}
                >
                  <SelectTrigger className="focus:border-none">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {projectTypes.map((e: any, n: number) => (
                      <SelectItem value={e.name} key={n}>
                        {e.name}
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
            name="product_wood_type"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel className="text-[#3D2514]">
                  Prefered Wood Type
                </FieldLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    const selectedItem = listOfWoodCategorie.find(
                      (item: any) => item.name === value,
                    );
                    if (selectedItem) {
                      setWoodCost(selectedItem.unit_price);
                    }
                  }}
                  value={field.value}
                >
                  <SelectTrigger className="focus:border-none">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {listOfWoodCategorie.map((e: any, n: number) => (
                      <SelectItem value={e.name} key={n}>
                        {e.name}
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
            name="product_quantity"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  className="text-[#3D2514]"
                  htmlFor="form-rhf-demo-quantity"
                >
                  Number of product
                </FieldLabel>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    setNoOfProducts(Number(e.target.value));
                  }}
                  id="form-rhf-demo-quantity"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter address of employee"
                  autoComplete="off"
                  className="focus:border-none"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="finishing_touch"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel className="text-[#3D2514]">
                  Finishing Prefrence
                </FieldLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    setFinishingPrefrencesCost(400);
                  }}
                  value={field.value}
                >
                  <SelectTrigger className="focus:border-none">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {finishingPrefrences.map((e, n) => (
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
            name="product_discription"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  className="text-[#3D2514]"
                  htmlFor="form-rhf-demo-disc"
                >
                  Project Description
                </FieldLabel>
                <div className="relative">
                  <Textarea
                    {...field}
                    id="form-rhf-demo-disc"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter email of employee"
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
            name="address"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  className="text-[#3D2514]"
                  htmlFor="form-rhf-demo-address"
                >
                  Delivery Address
                </FieldLabel>
                <Textarea
                  {...field}
                  id="form-rhf-demo-address"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter address of employee"
                  autoComplete="off"
                  className="focus:border-none"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="aditional_info"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  className="text-[#3D2514]"
                  htmlFor="form-rhf-demo-info"
                >
                  Additional Notes
                </FieldLabel>
                <Textarea
                  {...field}
                  id="form-rhf-demo-info"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter address of employee"
                  autoComplete="off"
                  className="focus:border-none"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <div className="flex flex-col justify-end h-full">
            <div className="bg-[#3D2514]/5 border border-[#3D2514]/10 rounded-lg p-6 space-y-3">
              <div className="flex justify-between items-center text-sm text-gray-600">
                <span>Subtotal</span>
                <span className="font-medium">
                  {price_without_tax.toFixed(2)}/-
                </span>
              </div>

              <div className="flex justify-between items-center text-sm text-gray-600">
                <span>Estimated Tax (10%)</span>
                <span className="font-medium">
                  {(price_without_tax * 0.1).toFixed(2)}/-
                </span>
              </div>

              <div className="h-px w-full bg-[#3D2514]/20 my-2" />

              <div className="flex justify-between items-end">
                <span className="text-[#3D2514] font-bold">Total</span>
                <span className="text-[#3D2514] text-2xl font-extrabold leading-none">
                  {(price_without_tax * 1.1).toFixed(2)}/-
                </span>
              </div>
            </div>
          </div>
        </FieldGroup>
      </form>

      <div className="flex gap-4">
        <Button
          variant="outline"
          type="button"
          onClick={() => {
            form.reset();
            setWoodCost(0);
          }}
        >
          Reset form
        </Button>
        <Button
          className="w-fit bg-[#3D2514] hover:bg-[#4d2d16]"
          type="submit"
          form="form-rhf-demo"
        >
          Confirm Order
        </Button>
      </div>
    </div>
  );
}
