"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

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
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";

const formSchema = z.object({
  email: z
    .email()
    .min(5, "Email must be at least 5 characters.")
    .max(20, "Email must be at most 20 characters."),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters.")
    .max(20, "Password must be at most 20 characters."),
});

export default function Page() {
  const router = useRouter();
  const { data: session } = useSession();
  const [passwordState, setPasswordState] = useState("password");
  const [isloading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });
    // console.log(result);

    if (result?.error) {
      toast.error(result.error);
      setIsLoading(false);
    } else {
      toast.success("User logged in");

      // Get the updated session with user role
      const newSession = await fetch("/api/auth/session").then((res) =>
        res.json(),
      );

      if (newSession?.user?.role) {
        const userRole = newSession.user.role.toLowerCase();

        if (userRole === "admin") {
          router.replace("/admin");
        } else if (userRole === "supplier") {
          router.replace("/supplier");
        } else if (userRole === "employee") {
          router.replace("/employee");
        } else {
          router.replace("/customer");
        }
      } else {
        // Fallback if role is not available
        router.replace("/");
      }
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
            Sign In
          </CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
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
                <Spinner /> Signing in
              </div>
            ) : (
              " Sign in"
            )}
          </Button>
          <CardAction className="flex justify-center items-center w-full">
            Don't have an account?
            <Link href={"/signup"}>
              <Button variant="link" disabled={isloading}>
                Sign Up{" "}
              </Button>
            </Link>
          </CardAction>
        </CardFooter>
      </Card>
    </div>
  );
}
