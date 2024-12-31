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
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { useAppDispatch } from "@/redux/hook";
import { saveToAuth } from "@/redux/features/auth/AuthSlice";
import loginImg from "../../assets/images/login.png";

// form validation shema
const formValidationSchema = z.object({
  email: z.string().email().min(1, {
    message: "Email must be a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 character",
  }),
});

const Login = () => {
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // define form
  const form = useForm<z.infer<typeof formValidationSchema>>({
    resolver: zodResolver(formValidationSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // submit login handler
  async function handleLogin(values: z.infer<typeof formValidationSchema>) {
    toast.loading("Loging in...", { id: "login" });

    // user data for sending to server
    const loginData = {
      email: values?.email,
      password: values?.password,
    };

    try {
      const res = await login(loginData).unwrap();
      if (res.success) {
        toast.success("Login successful", { id: "login" });
        dispatch(saveToAuth(res));
        form.reset();
        navigate(location.state || "/");
      }
    } catch (error: any) {
      toast.error(error?.data?.message, { id: "login" });
      console.log(error);
    }
  }

  const fillDemoUserData = () => {
    form.reset({
      email: "customer@gmail.com",
      password: "123456",
    });
  };
  // const fillDemoVendorData = () => {
  //   form.reset({
  //     email: "vendor@gmail.com",
  //     password: "123456",
  //   });
  // };
  const fillDemoAdminData = () => {
    form.reset({
      email: "admin@gmail.com",
      password: "123456",
    });
  };

  return (
    <div className=" py-14">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 w-full justify-between items-center gap-16">
          <div className="hidden lg:block">
            <img src={loginImg} alt="login" />
          </div>
          {/* Login form */}
          <div className="border rounded-2xl bg-white p-4 md:p-8 w-full max-w-[420px] mx-auto">
            <CardTitle className="mb-8 font-bold text-2xl md:text-3xl text-center">
              Login
            </CardTitle>
            <section className="pb-4 space-y-4">
              <p className="text-sm font-semibold text-center">
                Demo Credentials
              </p>
              <div className="flex justify-center gap-2">
                <Button onClick={fillDemoUserData}>Customer</Button>
                {/* <Button onClick={fillDemoVendorData}>Vendor</Button> */}
                <Button onClick={fillDemoAdminData}>Admin</Button>
              </div>
            </section>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleLogin)}
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
                      <Link
                        to={"/forgot-password"}
                        className="hover:underline text-primary"
                      >
                        <small>Forgot password?</small>
                      </Link>
                    </FormItem>
                  )}
                />

                <Button className="w-full md:text-base py-5">Login</Button>

                <p className="text-sm text-center pt-4">
                  New to Bazarly?{" "}
                  <Link
                    to={"/sign-up"}
                    className="font-bold text-primary hover:underline"
                  >
                    Sign up
                  </Link>
                </p>
              </form>
            </Form>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Login;
