/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Container from "@/components/shared/Container";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useCustomerSignUpMutation,
  useVendorSignUpMutation,
} from "@/redux/features/auth/authApi";

// form validation shema
const formValidationSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
  email: z.string().email().min(1, {
    message: "Email must be a valid email address.",
  }),
  phoneNumber: z.string().length(11, {
    message: "Phone number must be at least 11 digit.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 character",
  }),
});

const SignUp = () => {
  const [customerSignUp] = useCustomerSignUpMutation();
  const [vendorSignUp] = useVendorSignUpMutation();
  const navigate = useNavigate();

  // define form
  const form = useForm<z.infer<typeof formValidationSchema>>({
    resolver: zodResolver(formValidationSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      password: "",
    },
  });

  // submit customer sign up handler
  async function handleCustomerSignUp(
    values: z.infer<typeof formValidationSchema>
  ) {
    toast.loading("Account creating...", { id: "sign-up" });

    // user data for sending to server
    const userData = {
      data: {
        name: values?.name,
        email: values?.email,
        phoneNumber: values?.phoneNumber,
      },
      password: values?.password,
    };

    try {
      const res = await customerSignUp(userData).unwrap();
      if (res.success) {
        toast.success("Sign up successful", { id: "sign-up" });
        form.reset();
        navigate("/login");
      }
    } catch (error: any) {
      toast.error(error?.data?.message, { id: "sign-up" });
      console.log(error);
    }
  }

  // submit sign up handler
  async function handleVendorSignUp(
    values: z.infer<typeof formValidationSchema>
  ) {
    toast.loading("Account creating...", { id: "sign-up" });

    // user data for sending to server
    const userData = {
      data: {
        name: values?.name,
        email: values?.email,
        phoneNumber: values?.phoneNumber,
      },
      password: values?.password,
    };

    try {
      const res = await vendorSignUp(userData).unwrap();
      if (res.success) {
        toast.success("Sign up successful", { id: "sign-up" });
        form.reset();
        navigate("/login");
      }
    } catch (error: any) {
      toast.error(error?.data?.message, { id: "sign-up" });
      console.log(error);
    }
  }

  return (
    <div className="py-12">
      <Container>
        <div className="flex w-full justify-center items-center gap-10">
          <Tabs defaultValue="customer" className="w-[400px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="customer">Customer</TabsTrigger>
              <TabsTrigger value="seller">Seller</TabsTrigger>
            </TabsList>
            <TabsContent value="customer">
              {/* Sign Up as a customer */}
              <div className="border rounded-2xl bg-white p-4 md:p-8 w-full">
                <CardTitle className="mb-8 font-bold text-xl md:text-2xl text-center">
                  Join as a customer
                </CardTitle>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(handleCustomerSignUp)}
                    className="space-y-4 px-1"
                  >
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Your phone"
                              {...field}
                              type="number"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Email address"
                              {...field}
                              type="email"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter password"
                              {...field}
                              type="password"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button className="w-full md:text-base py-5">
                      Sign Up
                    </Button>

                    <p className="text-sm text-center pt-4">
                      Already have an account?{" "}
                      <Link
                        to={"/login"}
                        className="font-bold text-primary hover:underline"
                      >
                        Login
                      </Link>
                    </p>
                  </form>
                </Form>
              </div>
            </TabsContent>
            <TabsContent value="seller">
              {/* Seller signup */}
              <div className="border rounded-2xl bg-white p-4 md:p-8 w-full">
                <CardTitle className="mb-8 font-bold text-xl md:text-2xl text-center">
                  Join as a seller
                </CardTitle>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(handleVendorSignUp)}
                    className="space-y-4 px-1"
                  >
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Your phone"
                              {...field}
                              type="number"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Email address"
                              {...field}
                              type="email"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter password"
                              {...field}
                              type="password"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button className="w-full md:text-base py-5">
                      Sign Up
                    </Button>

                    <p className="text-sm text-center pt-4">
                      Already have an account?{" "}
                      <Link
                        to={"/login"}
                        className="font-bold text-primary hover:underline"
                      >
                        Login
                      </Link>
                    </p>
                  </form>
                </Form>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </Container>
    </div>
  );
};

export default SignUp;
