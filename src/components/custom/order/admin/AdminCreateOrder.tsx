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
import { Textarea } from "@/components/ui/textarea";
import {
  finishingPrefrences,
  labourCostPerHour,
  projectTypes,
} from "@/data/InventoryData";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { LoaderCircle, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const formSchema = z.object({
  customerId: z.string().min(1, "Select one of the given customers"),
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
  contact: z
    .string()
    .min(11, "Number must be 11 words long")
    .max(11, "Number must be 11 words long"),
  product_quantity: z.coerce
    .number()
    .min(1, "Min product is 1")
    .max(100, "You can't order more than 100"),
  finishing_touch: z.string().min(3, "Finishing must be selected"),
});

export default function AdminCreateOrder({
  listOfWoodCategorie,
  listOfCustomers,
  setListOfOrders,
}: any) {
  const router = useRouter();
  const [openDialog, setOpenDialog] = useState(false);
  const [woodcost, setWoodCost] = useState(0);
  const [labourHours, setLabourHours] = useState(0);
  const [noOfProducts, setNoOfProducts] = useState(1);
  const [amountOfGlue, setAmountOfGlue] = useState(0);
  const [amountOfSkrews, setAmountOfSkrews] = useState(0);
  const [amountOfSandPapers, setAmountOfSandPapers] = useState(0);
  const [amountOfPaint, setAmountOfPaint] = useState(0);
  const [finishingPrefrencesCost, setFinishingPrefrencesCost] = useState(0);
  const [quantityOfWood, setQuantityOfWood] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  // Total no pproduct a customer inputs ( (price of single wood + percentage of profit) * how much wood consume on making single product + (labour const per hour) + finishinf cost )
  const price_without_tax =
    noOfProducts *
    ((woodcost + woodcost * 0.05) * quantityOfWood +
      labourHours * labourCostPerHour +
      finishingPrefrencesCost);

  // Total labour cost = Total number of product * (Labour const per hour * Total labour cost)
  const labour_cost = noOfProducts * (labourCostPerHour * labourHours);

  const material_cost = woodcost * quantityOfWood * noOfProducts;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema as any),
    defaultValues: {
      customerId: "",
      product_type: "",
      product_wood_type: "",
      product_discription: "",
      aditional_info: "",
      address: "",
      contact: "",
      product_quantity: 1,
      finishing_touch: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    // console.log(data);
    // alert("Your information cannot be change after order is conferm");
    const isConfermed = window.confirm(
      "Your information cannot be change after order is conferm",
    );
    if (!isConfermed) return;
    try {
      setIsLoading(true);
      const requestdata = {
        ...data,
        price_without_tax,
        labour_cost,
        material_cost,
        amountOfGlue: amountOfGlue * data.product_quantity,
        amountOfSkrews: amountOfSkrews * data.product_quantity,
        amountOfSandPapers: amountOfSandPapers * data.product_quantity,
        quantityOfWood: quantityOfWood * data.product_quantity,
        amountOfPaint: amountOfPaint * data.product_quantity,
        hours_of_construction: labourHours * data.product_quantity,
      };

      const res = await axios.post(
        "/api/order/admin-create-order",
        requestdata,
      );
      if (res.status === 200) {
        setListOfOrders((prev) => [...prev, res.data.data]);
        toast.success(res.data.message || "Order created Successfully");
      }
    } catch (error: any) {
      toast.error(error?.response?.data.message || "Order not created");
    } finally {
      setOpenDialog(false);
      setIsLoading(false);
      form.reset();
      setWoodCost(0);
      setFinishingPrefrencesCost(0);
      setNoOfProducts(1);
      setLabourHours(0);
      setQuantityOfWood(0);
      setAmountOfGlue(0);
      setAmountOfSkrews(0);
      setAmountOfSandPapers(0);
      setAmountOfPaint(0);
    }
  }
  return (
    <div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger className="bg-[#784922] hover:bg-[#784922e8] cursor-pointer text-white flex items-center gap-2 px-3 py-2 rounded-sm">
          <Plus /> Create Order
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm md:max-w-5xl h-[500px] overflow-y-scroll">
          <DialogHeader>
            <DialogTitle className="text-2xl text-[#745247]">
              Project Details
            </DialogTitle>
            <DialogDescription>
              Tell us about your woodwork project
            </DialogDescription>
          </DialogHeader>
          <form id="form-rhf-Customer" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup className="grid md:grid-cols-2">
              <div className="col-span-2">
                <Controller
                  name="customerId"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel className="text-[#3D2514]">
                        Customer
                      </FieldLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="focus:border-none">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {listOfCustomers.map((e: any, n: number) => (
                            <SelectItem value={e.id} key={n}>
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
              </div>

              <Controller
                name="product_type"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-[#3D2514]">
                      Project Type
                    </FieldLabel>
                    <Select
                      value={field.value}
                      onValueChange={(value) => {
                        field.onChange(value);
                        const selectedItem = projectTypes.find(
                          (item: any) => item.name === value,
                        );
                        if (selectedItem) {
                          setQuantityOfWood(selectedItem.quantityOfMaterial);
                          setLabourHours(selectedItem.timeItTakes);
                          setAmountOfGlue(selectedItem.glue);
                          setAmountOfSkrews(selectedItem.skrew);
                          setAmountOfSandPapers(selectedItem.others);
                          setAmountOfPaint(selectedItem.polish);
                        } else {
                          router.refresh();
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
                      placeholder="Enter number of products you want to buy"
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
                          <SelectItem value={e.name} key={n}>
                            {e.type}
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
                name="contact"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      className="text-[#3D2514]"
                      htmlFor="form-rhf-demo-constact"
                    >
                      Contact Number
                    </FieldLabel>
                    <Input
                      type="number"
                      {...field}
                      id="form-rhf-demo-constact"
                      aria-invalid={fieldState.invalid}
                      placeholder="03X-XXXXXXXX"
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
                        placeholder="Enter information about product, its design its dimentions"
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
                      placeholder="Enter your dilivery address"
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
                      placeholder="Enter additional information if you want to add"
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
              variant="outline"
              type="button"
              onClick={() => {
                form.reset();
                setWoodCost(0);
                setFinishingPrefrencesCost(0);
                setNoOfProducts(1);
                setLabourHours(0);
                setQuantityOfWood(0);
                setAmountOfGlue(0);
                setAmountOfSkrews(0);
                setAmountOfSandPapers(0);
                setAmountOfPaint(0);
              }}
              disabled={isLoading}
            >
              Reset form
            </Button>
            <Button
              className="w-fit bg-[#3D2514] hover:bg-[#4d2d16]"
              type="submit"
              form="form-rhf-Customer"
              disabled={isLoading}
            >
              Confirm Order
              {isLoading && <LoaderCircle className="animate-spin" />}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
