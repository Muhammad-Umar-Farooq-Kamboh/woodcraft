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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { CategoryList } from "@/data/InventoryData";
import axios from "axios";
import { toast } from "sonner";
import { useState } from "react";

const formSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters.")
    .max(20, "Name must be at most 20 characters."),
  categorie: z
    .string()
    .min(3, "Category must be at least 2 characters.")
    .max(15, "Category must be at most 15 characters."),
  unit_price: z.string().min(1, "Min 1.").max(5, "Max 5."),
  numberOfProduct: z.string().min(1, "Min 1").max(3, "Max 3"),
  low_stock_threshold: z.string().min(1, "Min 1").max(2, "Max 2"),
});

export default function Inventorytop({
  listOfMaterials,
  setListOfMaterials,
}: any) {
  const [isLoading, setIsLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const data = listOfMaterials.reduce((acc: any, item: any) => {
    const key = item.categorie;

    if (!acc[key]) {
      acc[key] = [];
    }

    acc[key].push(item);

    return acc;
  }, {});

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: {
      name: "",
      categorie: "",
      unit_price: "",
      numberOfProduct: "",
      low_stock_threshold: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const res = await axios.post("/api/inventory/add-material", data);
      if (res.status === 200) {
        setListOfMaterials((prev: any) => [...prev, res.data.data]);
        toast.success(res.data.message || "Materail added successfully");
      }
    } catch (error: any) {
      toast.error(error?.response?.data.message || "Issue in adding material");
    } finally {
      form.reset();
      setIsLoading(false);
      setOpenDialog(false);
    }
  }

  const lowStockMaterial = listOfMaterials.filter(
    (m: any) => m.unit < m.low_stock_threshold,
  );
  return (
    <div className="w-full flex flex-col gap-8">
      <div className="flex justify-between items-center w-full">
        <div>
          <h3 className="text-2xl font-bold text-[#291D14]">Inventory</h3>
          <p className="text-[#745247] text-[14px]">
            {listOfMaterials.length} materials tracked ·{" "}
            {lowStockMaterial.length} low stock alerts
          </p>
        </div>
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger className="bg-[#784922] hover:bg-[#784922e8] cursor-pointer text-white flex items-center gap-2 px-3 py-2 rounded-sm">
            <Plus /> Add Material
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
                      <FieldLabel className="text-[#3D2514]">
                        Category
                      </FieldLabel>
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
                Add
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="mx-auto w-full max-w-sm h-fit py-3">
          <CardContent>
            <CardTitle className="text-[#745247] text-[14px] font-normal uppercase">
              Wood
            </CardTitle>
            <p className="font-bold text-[#291D14] text-2xl">
              {data?.Wood?.length || 0}
            </p>
            <CardDescription className="text-[#745247] text-[14px] font-normal">
              items
            </CardDescription>
          </CardContent>
        </Card>
        <Card className="mx-auto w-full max-w-sm h-fit py-3">
          <CardContent>
            <CardTitle className="text-[#745247] text-[14px] font-normal uppercase">
              Hardware
            </CardTitle>
            <p className="font-bold text-[#291D14] text-2xl">
              {data?.Hardware?.length || 0}
            </p>
            <CardDescription className="text-[#745247] text-[14px] font-normal">
              items
            </CardDescription>
          </CardContent>
        </Card>
        <Card className="mx-auto w-full max-w-sm h-fit py-3">
          <CardContent>
            <CardTitle className="text-[#745247] text-[14px] font-normal uppercase">
              Accessories
            </CardTitle>
            <p className="font-bold text-[#291D14] text-2xl">
              {data?.Accessories?.length || 0}
            </p>
            <CardDescription className="text-[#745247] text-[14px] font-normal">
              items
            </CardDescription>
          </CardContent>
        </Card>
        <Card className="mx-auto w-full max-w-sm h-fit py-3">
          <CardContent>
            <CardTitle className="text-[#745247] text-[14px] font-normal uppercase">
              Finishing
            </CardTitle>
            <p className="font-bold text-[#291D14] text-2xl">
              {data?.Finishing?.length || 0}
            </p>
            <CardDescription className="text-[#745247] text-[14px] font-normal">
              items
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
