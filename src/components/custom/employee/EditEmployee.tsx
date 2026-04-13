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
import { RoleList } from "@/data/EmployeeData";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const formSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters.")
    .max(20, "Name must be at most 20 characters."),
  role: z
    .string()
    .min(3, "Select role.")
    .max(20, "Email must be at most 20 characters."),
  email: z
    .email()
    .min(5, "Email must be at least 5 characters.")
    .max(20, "Email must be at most 20 characters."),
  password: z.string().optional(),
  rate_per_hour: z.coerce.number().min(100, "Min rate per hour is 100"),
  contact: z
    .string()
    .min(11, "Number must be 11 charater")
    .max(11, "Number must be 11 charater"),
  address: z
    .string()
    .min(30, "Address must be longer than 30 char")
    .max(500, "Address must be shorter than 500"),
});

export default function EditEmployee({ data, setListOfEmployee }: any) {
  const [isLoading, setIsLoading] = useState(false);
  const [passwordState, setPasswordState] = useState("password");
  const [openDialog, setOpenDialog] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema as any),
    defaultValues: {
      name: data.name,
      role: data.role,
      email: data.email,
      password: "",
      rate_per_hour: data.profile.rate_per_hour,
      contact: data.profile.contact,
      address: data.profile.address,
    },
  });
  async function onSubmit(dataOfForm: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const updatedData = { id: data.id, ...dataOfForm };
    try {
      const res = await axios.post(
        "/api/employee/update-selected-employee",
        updatedData,
      );
      if (res.status === 200) {
        setListOfEmployee((prev: any) =>
          prev.map((e: any) => (e.id === res.data.data.id ? res.data.data : e)),
        );
        toast.success(res.data.message || "Employee created successfully");
      }
    } catch (error: any) {
      toast.error(error?.response?.data.message || "Employee not updated");
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
              <div>
                <Controller
                  name="name"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel
                        className="text-[#3D2514]"
                        htmlFor="form-rhf-demo-name"
                      >
                        Employee Name
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
                name="role"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-[#3D2514]">Role</FieldLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="focus:border-none">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {RoleList.map((e, n) => (
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
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      className="text-[#3D2514]"
                      htmlFor="form-rhf-demo-nump"
                    >
                      Email
                    </FieldLabel>
                    <div className="relative">
                      <Input
                        type="email"
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
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      className="text-[#3D2514]"
                      htmlFor="form-rhf-demo-password"
                    >
                      Password
                    </FieldLabel>
                    <div className="relative">
                      <Input
                        {...field}
                        type={passwordState}
                        id="form-rhf-demo-password"
                        aria-invalid={fieldState.invalid}
                        placeholder="Enter your password"
                        autoComplete="off"
                        className="focus:border-none"
                      />
                      {passwordState === "text" ? (
                        <EyeOff
                          className="absolute top-[7px] right-2"
                          onClick={() => setPasswordState("password")}
                          color="#3D2514"
                        />
                      ) : (
                        <Eye
                          className="absolute top-[7px] right-2"
                          onClick={() => setPasswordState("text")}
                          color="#3D2514"
                        />
                      )}
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="rate_per_hour"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      className="text-[#3D2514]"
                      htmlFor="form-rhf-demo-rate"
                    >
                      Rate per hour
                    </FieldLabel>
                    <div className="relative">
                      <Input
                        {...field}
                        type="number"
                        id="form-rhf-demo-rate"
                        aria-invalid={fieldState.invalid}
                        placeholder="Enter rate per hour"
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
                name="contact"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      className="text-[#3D2514]"
                      htmlFor="form-rhf-demo-contact-number"
                    >
                      Contact number
                    </FieldLabel>
                    <div className="relative">
                      <Input
                        {...field}
                        id="form-rhf-demo-contact-number"
                        aria-invalid={fieldState.invalid}
                        placeholder="Enter number of employee"
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
              <div className="col-span-2">
                <Controller
                  name="address"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel
                        className="text-[#3D2514]"
                        htmlFor="form-rhf-demo-address"
                      >
                        Address
                      </FieldLabel>
                      <div className="relative">
                        <Textarea
                          {...field}
                          id="form-rhf-demo-address"
                          aria-invalid={fieldState.invalid}
                          placeholder="Enter address of employee"
                          autoComplete="off"
                          className="focus:border-none"
                        />
                        {/* <Input
                                    {...field}
                                    id="form-rhf-demo-password"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Enter address of employee"
                                    autoComplete="off"
                                    className="focus:border-none"
                                  /> */}
                      </div>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
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
