import Container from "@/components/shared/Container";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { removeFromCart, selectCart } from "@/redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { calculation } from "@/utils/calculation";
import { XIcon } from "lucide-react";
import { Link } from "react-router-dom";

const Cart = () => {
  const cartData = useAppSelector(selectCart);
  const dispatch = useAppDispatch();
  const { subTotal, shipping, total } = calculation(cartData);
  return (
    <Container>
      <div className="flex flex-col md:flex-row gap-8 my-16">
        {/* product table */}
        <div className="flex-1">
          <Table className="text-base">
            {cartData.length < 1 && (
              <TableCaption className="text-lg">No Item Added</TableCaption>
            )}
            <TableHeader>
              <TableRow>
                <TableHead className="font-bold w-[100px]">Image</TableHead>
                <TableHead className="font-bold">Title</TableHead>
                <TableHead className="font-bold">Price</TableHead>
                <TableHead className="font-bold">Quantity</TableHead>
                <TableHead className="font-bold">Subtotal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cartData?.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <img src={item?.product?.image} alt="product" />
                  </TableCell>
                  <TableCell>{item?.product?.name}</TableCell>
                  <TableCell>৳{item?.product?.price}</TableCell>
                  <TableCell>{item?.quantity}</TableCell>
                  <TableCell>
                    ৳{item?.quantity * item?.product?.price}
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => dispatch(removeFromCart(item))}
                      variant={"ghost"}
                      size={"icon"}
                      className="hover:text-red-500"
                    >
                      <XIcon size={16} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="w-full md:w-4/12">
          <Card className="p-4 py-6 rounded-xl">
            <CardHeader>
              <CardTitle className="font-bold text-2xl">Cart Total</CardTitle>
            </CardHeader>
            <CardContent>
              <h3 className="flex justify-between font-bold mb-8">
                Subtotal <span>৳{subTotal}</span>
              </h3>
              <h3 className="flex justify-between font-bold mb-8">
                Shipping <span>৳{shipping}</span>
              </h3>
              <h3 className="flex justify-between font-bold mb-8">
                Total <span>৳{total}</span>
              </h3>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Link to={cartData.length ? "/checkout" : ""} className="w-full">
                <Button
                  disabled={cartData.length < 1}
                  className="w-full text-base py-6 rounded-full"
                >
                  Checkout
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </Container>
  );
};

export default Cart;
