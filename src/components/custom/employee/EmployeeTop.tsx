import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
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
import { Eye, EyeOff, Plus } from "lucide-react";
import { useState } from "react";
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
  password: z
    .string()
    .min(6, "Password must be at least 6 characters.")
    .max(20, "Password must be at most 20 characters."),
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

export default function EmployeeTop({
  listOfEmployee,
  setListOfEmployee,
}: any) {
  const [isLoading, setIsLoading] = useState(false);
  const [passwordState, setPasswordState] = useState("password");
  const [openDialog, setOpenDialog] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema as any),
    defaultValues: {
      name: "",
      role: "",
      email: "",
      password: "",
      rate_per_hour: 0,
      contact: "",
      address: "",
    },
  });

  const totalHoursOfWorking = listOfEmployee.reduce((sum: number, ass: any) => {
    let hoursOfEveryEmp = 0;
    if (ass.assigment) {
      hoursOfEveryEmp = ass?.assigment.reduce((sum: number, ass: any) => {
        return sum + ass.hours;
      }, 0);
    }
    return sum + hoursOfEveryEmp;
  }, 0);

  const totalEarning = listOfEmployee.reduce((sum: number, emp: any) => {
    let totalEarningOfEmp = 0;
    if (emp.assigment) {
      totalEarningOfEmp =
        emp.profile.rate_per_hour *
        emp?.assigment.reduce((sum: number, ass: any) => {
          return sum + ass.hours;
        }, 0);
    }
    return sum + totalEarningOfEmp;
  }, 0);

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const res = await axios.post("/api/employee/create-new-employee", data);
      if (res.status === 200) {
        // console.log(res.data.data);

        setListOfEmployee((prev: any) => [...prev, res.data.data]);
        toast.success(res.data.message || "Employee created successfully");
      }
    } catch (error: any) {
      toast.error(error?.response?.data.message || "Issue in adding material");
    } finally {
      form.reset();
      setIsLoading(false);
      setOpenDialog(false);
    }
  }
  return (
    <div className="w-full flex flex-col gap-8">
      <div className="flex justify-between items-center w-full">
        <div>
          <h3 className="text-2xl font-bold text-[#291D14]">Employees</h3>
          <p className="text-[#745247] text-[14px]">
            {listOfEmployee.length} team members
          </p>
        </div>
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger className="bg-[#784922] hover:bg-[#784922e8] cursor-pointer text-white flex items-center gap-2 px-3 py-2 rounded-sm">
            <Plus /> Add Employee
          </DialogTrigger>
          <DialogContent className="sm:max-w-sm md:max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl text-[#745247]">
                Add Employee
              </DialogTitle>
              <DialogDescription>
                Create Employee and than click on create button.
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
                            placeholder="Enter employee name"
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
                          placeholder="Enter employee password"
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
                          placeholder="Enter contact number of employee"
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
                Create
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="mx-auto w-full max-w-sm h-fit py-3">
          <CardContent>
            <CardTitle className="text-[#745247] text-[14px] font-normal uppercase">
              Total Staff
            </CardTitle>
            <p className="font-bold text-[#291D14] text-2xl">
              {listOfEmployee.length || 0}
            </p>
            <CardDescription className="text-[#745247] text-[14px] font-normal">
              team members
            </CardDescription>
          </CardContent>
        </Card>
        <Card className="mx-auto w-full max-w-sm h-fit py-3">
          <CardContent>
            <CardTitle className="text-[#745247] text-[14px] font-normal uppercase">
              Active
            </CardTitle>
            <p className="font-bold text-[#291D14] text-2xl">
              {listOfEmployee.length || 0}
            </p>
            <CardDescription className="text-[#745247] text-[14px] font-normal">
              currently working
            </CardDescription>
          </CardContent>
        </Card>
        <Card className="mx-auto w-full max-w-sm h-fit py-3">
          <CardContent>
            <CardTitle className="text-[#745247] text-[14px] font-normal uppercase">
              Total Hours
            </CardTitle>
            <p className="font-bold text-[#291D14] text-2xl">
              {totalHoursOfWorking}
            </p>
            <CardDescription className="text-[#745247] text-[14px] font-normal">
              worked
            </CardDescription>
          </CardContent>
        </Card>
        <Card className="mx-auto w-full max-w-sm h-fit py-3">
          <CardContent>
            <CardTitle className="text-[#745247] text-[14px] font-normal uppercase">
              Est. Payroll
            </CardTitle>
            <p className="font-bold text-[#291D14] text-2xl">
              {totalEarning + " PKR"}
            </p>
            <CardDescription className="text-[#745247] text-[14px] font-normal">
              this year
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
