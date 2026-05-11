import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const formSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters.")
    .max(20, "Name must be at most 20 characters."),
  email: z
    .email()
    .min(5, "Email must be at least 5 characters.")
    .max(20, "Email must be at most 20 characters."),
  address: z
    .string()
    .min(6, "Address must be at least 6 characters.")
    .max(100, "Address contain max 100 characters"),
  contact: z
    .string()
    .min(11, "Number must be 11 words long")
    .max(11, "Number must be 11 words long"),
});

export default function ProfileLeft({ user, setUser }: any) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema as any),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      address: user?.profile?.address || "",
      contact: user?.profile?.contact || "",
    },
  });

  useEffect(() => {
    form.reset({
      name: user?.name || "",
      email: user?.email || "",
      address: user?.profile?.address || "",
      contact: user?.profile?.contact || "",
    });
  }, [user, form]);

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const res = await axios.post("/api/employee/update-user-profile", data);
      if (res.status === 200) {
        setUser(res.data.data);
        toast.success(res.data.message || "Updated user successfully");
      }
    } catch (error: any) {
      toast.error(error?.response?.data.message || "Issue in updating user");
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div className="w-full flex flex-col gap-5">
      <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup className="grid md:grid-cols-2">
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  className="text-[#3D2514]"
                  htmlFor="form-rhf-demo-name"
                >
                  Name
                </FieldLabel>
                <Input
                  {...field}
                  id="form-rhf-demo-name"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your name"
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
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  className="text-[#3D2514]"
                  htmlFor="form-rhf-demo-email"
                >
                  Email
                </FieldLabel>
                <Input
                  type="email"
                  {...field}
                  id="form-rhf-demo-email"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your email"
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
            name="contact"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  className="text-[#3D2514]"
                  htmlFor="form-rhf-demo-contact"
                >
                  Contact Number
                </FieldLabel>
                <Input
                  {...field}
                  id="form-rhf-demo-contact"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your contact information"
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
                <Textarea
                  {...field}
                  id="form-rhf-demo-address"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your home address"
                  autoComplete="off"
                  className="focus:border-none"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
      </form>
      <Button
        className="w-fit bg-[#3D2514] hover:bg-[#4d2d16]"
        type="submit"
        form="form-rhf-demo"
        disabled={isLoading}
      >
        Update profile
        {isLoading && <LoaderCircle className="animate-spin" />}
      </Button>
    </div>
  );
}
