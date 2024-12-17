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
import { useForgotPasswordMutation } from "@/redux/features/auth/authApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// form validation shema
const formValidationSchema = z.object({
  email: z.string().email().min(1, {
    message: "Email must be a valid email address.",
  }),
});

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [forgotPassword] = useForgotPasswordMutation();

  // define form
  const form = useForm<z.infer<typeof formValidationSchema>>({
    resolver: zodResolver(formValidationSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleForgotPassword = async (
    values: z.infer<typeof formValidationSchema>
  ) => {
    setIsLoading(true);
    const res = await forgotPassword(values).unwrap();
    if (res.success) {
      setIsLoading(false);
      setIsEmailSent(true);
    } else {
      console.log("Something went wrong");
    }
  };

  return (
    <div className=" py-14">
      {isLoading && <Loading />}
      <Container>
        <div className="flex w-full justify-center items-center gap-10">
          {/* form */}
          {!isEmailSent && (
            <div className="border rounded-2xl bg-white p-4 md:p-8 w-full md:w-1/2 lg:w-2/5">
              <CardTitle className="mb-8 font-bold text-2xl text-center">
                Forgot Password?
              </CardTitle>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleForgotPassword)}
                  className="space-y-4 px-1"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter email address"
                            {...field}
                            type="email"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button className="w-full md:text-base py-5">Send</Button>
                </form>
              </Form>
            </div>
          )}
          {isEmailSent && (
            <div className="flex flex-col items-center justify-center gap-4 max-w-lg">
              <h1 className="flex items-center gap-2 text-xl font-semibold">
                <Check className="text-green-600" />
                Email Sent Successfully!
              </h1>
              <p className="text-center">
                We have sent you an email with reset password link. Please check
                it.
              </p>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default ForgotPassword;
