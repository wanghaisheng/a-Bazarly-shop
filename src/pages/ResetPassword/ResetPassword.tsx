/* eslint-disable @typescript-eslint/no-explicit-any */
import Container from "@/components/shared/Container";
import Loading from "@/components/shared/Loading";
import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useResetPasswordMutation } from "@/redux/features/auth/authApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

// form validation shema
const formValidationSchema = z.object({
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

const ResetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordReseted, setPasswordReseted] = useState(false);
  const [resetPassword] = useResetPasswordMutation();

  const [params] = useSearchParams();
  const userId = params.get("id");
  const token = params.get("token");

  // define form
  const form = useForm<z.infer<typeof formValidationSchema>>({
    resolver: zodResolver(formValidationSchema),
    defaultValues: {
      password: "",
    },
  });

  const handleResetPassword = async (
    values: z.infer<typeof formValidationSchema>
  ) => {
    setIsLoading(true);

    try {
      const res = await resetPassword({
        token,
        payload: {
          id: userId,
          password: values.password,
        },
      }).unwrap();

      if (res.success) {
        setIsLoading(false);
        setPasswordReseted(true);
      }
    } catch (error: any) {
      toast(error?.data?.message || "Something went wrong");
      setIsLoading(false);
    }
  };

  return (
    <div className=" py-14">
      {isLoading && <Loading />}
      <Container>
        <div className="flex w-full justify-center items-center gap-10">
          {/* form */}
          {!isPasswordReseted && (
            <div className="border rounded-2xl bg-white p-4 md:p-8 w-full md:w-1/2 lg:w-2/5">
              <CardTitle className="mb-8 font-bold text-2xl text-center">
                Reset Password
              </CardTitle>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleResetPassword)}
                  className="space-y-4 px-1"
                >
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter new password"
                            {...field}
                            type="password"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button className="w-full md:text-base py-5" type="submit">
                    Reset
                  </Button>
                </form>
              </Form>
            </div>
          )}
          {isPasswordReseted && (
            <div className="flex flex-col items-center justify-center gap-4 max-w-lg">
              <h1 className="flex items-center gap-2 text-xl font-semibold">
                <Check className="text-green-600" />
                Password Reseted Successfully
              </h1>
              <Link to={"/login"}>
                <Button>Login Now</Button>
              </Link>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default ResetPassword;
