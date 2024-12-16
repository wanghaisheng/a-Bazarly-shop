/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Container from "@/components/shared/Container";
import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { calculation } from "@/utils/calculation";
import { XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { resetCart, selectCart } from "@/redux/features/cart/cartSlice";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCreateOrderMutation } from "@/redux/features/order/orderApi";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "@/redux/features/profile/profileApi";
import { useCreatePaymentMutation } from "@/redux/features/payment/paymentApi";
import { useApplyCouponMutation } from "@/redux/features/coupon/couponApi";
import Loading from "@/components/shared/Loading";

// form validation shema
const formValidationSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
  phoneNumber: z.string().min(11, {
    message: "Phone must be at least 11 digit.",
  }),
  email: z.string().email().min(1, {
    message: "Email must be a valid email address.",
  }),
  address: z.string({ required_error: "Address is required" }),
});

const Checkout = () => {
  const [paymentType, setPaymentType] = useState("ONLINE");
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  // apply coupon code
  const [applyCoupon] = useApplyCouponMutation();
  const applyCouponCode = async () => {
    if (!couponCode) {
      toast.error("Please enter coupon code");
      return;
    }
    try {
      const res = await applyCoupon({ code: couponCode }).unwrap();
      if (res.success) {
        toast.success("Coupon applied successfully");
        setDiscount(res?.data?.discountAmount);
      } else {
        toast.error("Could not apply coupon");
      }
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  };

  const { data } = useGetProfileQuery(undefined);
  const profileData = data?.data;

  const cartData = useAppSelector(selectCart);
  const shopId = cartData[0]?.product?.shopId;

  const dispatch = useAppDispatch();
  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const [createPayment] = useCreatePaymentMutation();
  const [updateProfile] = useUpdateProfileMutation();

  const { subTotal, shipping, total } = calculation(cartData);

  // format cart data for sending the server
  const cartFormatedData = cartData.map((item) => ({
    productId: item?.product?.id,
    quantity: item?.quantity,
    price: item?.product?.price,
    discount: item?.product?.discount,
  }));

  // define form
  const form = useForm<z.infer<typeof formValidationSchema>>({
    resolver: zodResolver(formValidationSchema),
    defaultValues: {
      name: profileData?.name,
      email: profileData?.email,
      phoneNumber: profileData?.phoneNumber,
      address: profileData?.address,
    },
  });

  // Update form values when profileData is fetched
  useEffect(() => {
    if (profileData) {
      form.reset({
        name: profileData.name,
        email: profileData.email,
        phoneNumber: profileData.phoneNumber,
        address: profileData.address,
      });
    }
  }, [profileData, form]);

  // submit order handler
  async function handlePlaceOrder(
    values: z.infer<typeof formValidationSchema>
  ) {
    toast.loading("Order creating...", { id: "order" });
    // check if the cart not empty
    if (!cartFormatedData.length) {
      toast.error("No item added to cart", { id: "order" });
      return;
    }

    // prepare the order data
    const orderData = {
      shopId,
      totalAmount: total - discount,
      paymentType,
      products: cartFormatedData,
    };

    // update profile data
    const profileUpdateData = new FormData();
    profileUpdateData.append("data", JSON.stringify(values));
    await updateProfile(profileUpdateData);

    try {
      const res = await createOrder(orderData).unwrap();
      if (res.success) {
        toast.success("Order placed successfully", { id: "order" });
        dispatch(resetCart());

        // redirect to payment if order was successfully placed
        if (paymentType === "ONLINE") {
          const { data } = await createPayment({ orderId: res?.data?.id });
          if (data?.data?.redirect_url) {
            window.location.href = data?.data?.redirect_url;
          }
        }
      }
    } catch (error) {
      toast.error("Something went wrong", { id: "order" });
      console.log(error);
    }
  }

  return (
    <div>
      {isLoading && <Loading />}
      <Container>
        <div className="flex flex-wrap w-full justify-between gap-10 my-12">
          {/* billing details */}
          <div className="border p-8 flex-1">
            <CardTitle className="mb-8 font-bold">Billing Details</CardTitle>
            <Form {...form}>
              <form className="space-y-8 px-1">
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
                        <Input placeholder="Your phone" {...field} />
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
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Delivery Address</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your address"
                          {...field}
                          type="text"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </div>
          {/* Order Details section */}
          <div className="w-full md:w-1/2 p-8 border">
            <CardTitle className="mb-8 font-bold">Your Order</CardTitle>
            <Table className="text-base">
              <TableHeader>
                <TableRow>
                  <TableHead className="font-bold">Title</TableHead>
                  <TableHead className="font-bold">Subtotal</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cartData.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="flex items-center gap-2">
                      {item?.product?.name}{" "}
                      <span className="font-bold inline-flex items-center gap-1">
                        {" "}
                        <XIcon size={16} /> {item?.quantity}
                      </span>
                    </TableCell>
                    <TableCell>
                      ৳ {item?.quantity * item?.product?.price}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell className="font-bold">Subtotal</TableCell>
                  <TableCell>৳ {subTotal}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-bold">Shipping</TableCell>
                  <TableCell>৳ {shipping}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-bold">Discount</TableCell>
                  <TableCell>৳ {discount}</TableCell>
                </TableRow>
                <TableRow className="font-bold">
                  <TableCell>Total</TableCell>
                  <TableCell>৳ {total - discount}</TableCell>
                </TableRow>
              </TableFooter>
            </Table>

            {/* apply coupon */}
            <div className="flex items-center gap-3 mt-4">
              <Input
                placeholder="Coupon Code"
                onBlur={(e) => setCouponCode(e.target.value)}
              />
              <Button onClick={applyCouponCode} className="h-10">
                Apply Coupon
              </Button>
            </div>

            {/* payment method */}
            <RadioGroup
              onValueChange={(value) => setPaymentType(value)}
              defaultValue="ONLINE"
              className="mt-4"
            >
              <h3 className="text-lg font-semibold">Payment Method</h3>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="COD" id="COD" className="size-5" />
                <Label htmlFor="COD" className="text-base">
                  Cash on Delivery
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="ONLINE" id="Online" className="size-5" />
                <Label htmlFor="Online" className="text-base">
                  Online Payment
                </Label>
              </div>
            </RadioGroup>
            <div className="mt-8">
              <Button
                // disabled={cartData.length < 1}
                className="w-full text-base py-6 rounded-full"
                onClick={form.handleSubmit(handlePlaceOrder)}
              >
                Confirm Order
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Checkout;
