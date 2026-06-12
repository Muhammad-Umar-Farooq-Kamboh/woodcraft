"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

import axios from "axios";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import Logo from "@/components/custom/logo/Logo";
import Link from "next/link";

import { Spinner } from "@/components/ui/spinner";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters.")
    .max(20, "Name must be at most 20 characters."),
  email: z
    .email()
    .min(5, "Email must be at least 5 characters.")
    .max(30, "Email must be at most 20 characters."),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters.")
    .max(20, "Password must be at most 20 characters."),
  confermpassword: z
    .string()
    .min(6, "Password must be at least 6 characters.")
    .max(20, "Password must be at most 20 characters."),
});

export default function Page() {
  const [passwordState, setPasswordState] = useState("password");
  const [confirmPasswordState, setConfirmPasswordState] = useState("password");

  const [isloading, setIsLoading] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confermpassword: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true);
    // Do something with the form values.
    if (data.confermpassword === data.password) {
      try {
        const res = await axios.post("/api/create-user", data);
        if (res.status === 200) {
          toast.success("Account created successfully");
        }
        setIsLoading(false);
        router.replace("/signin");
      } catch (error: any) {
        toast.error(error?.response?.data.message || "Account cannot created");
        setIsLoading(false);
      } finally {
        form.reset();
      }
    } else {
      toast.error("Please enter same password");
      setIsLoading(false);
    }
  }
  return (
    <div className="min-w-full flex flex-col justify-center items-center min-h-screen bg-white">
      <div className="flex gap-4 items-center my-10 lg:hidden">
        <Logo size={25} className="p-2" />
        <div className="flex flex-col items-center">
          <h2 className="text-[#3D2514] text-4xl font-bold">
            Wood <span className="text-[#F0A535]">craft</span>{" "}
          </h2>
        </div>
      </div>
      <Card className="w-full max-w-sm border-none shadow-none">
        <CardHeader>
          <CardTitle className="text-center text-[#3D2514] text-2xl font-bold">
            Create Account
          </CardTitle>
          <CardDescription className="text-center">
            Get started with your Woodcraft workspace
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      className="text-[#3D2514]"
                      htmlFor="form-rhf-demo-name"
                    >
                      Full Name
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-demo-name"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter your full name"
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
                    <div className="relative">
                      <Input
                        {...field}
                        id="form-rhf-demo-email"
                        aria-invalid={fieldState.invalid}
                        placeholder="Enter your email address"
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
                name="confermpassword"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      className="text-[#3D2514]"
                      htmlFor="form-rhf-demo-confermpassword"
                    >
                      Confirm Password
                    </FieldLabel>
                    <div className="relative">
                      <Input
                        {...field}
                        type={confirmPasswordState}
                        id="form-rhf-demo-confermpassword"
                        aria-invalid={fieldState.invalid}
                        placeholder="Enter your password"
                        autoComplete="off"
                        className="focus:border-none"
                      />
                      {confirmPasswordState === "text" ? (
                        <EyeOff
                          className="absolute top-[7px] right-2"
                          onClick={() => setConfirmPasswordState("password")}
                          color="#3D2514"
                        />
                      ) : (
                        <Eye
                          className="absolute top-[7px] right-2"
                          onClick={() => setConfirmPasswordState("text")}
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
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button
            type="submit"
            className="w-full bg-[#3D2514] hover:bg-[#523018]"
            onClick={form.handleSubmit(onSubmit)}
            disabled={isloading}
          >
            {isloading ? (
              <div className="flex gap-1 items-center">
                {" "}
                <Spinner /> Creating Account
              </div>
            ) : (
              " Create Account"
            )}
          </Button>
          <CardAction className="flex justify-center items-center w-full">
            Already have an account?
            <Link href={"/signin"}>
              <Button variant="link" disabled={isloading}>
                Sign In
              </Button>
            </Link>
          </CardAction>
        </CardFooter>
      </Card>
    </div>
  );
}
