import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { addToCart } from "@/redux/features/cart/cartSlice";
import { useAppDispatch } from "@/redux/hook";
import { IProduct } from "@/types/TProduct";
import { CopyPlus, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }: { product: IProduct }) => {
  const { id, name, image, price, discount } = product;

  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        product,
        quantity: 1,
        price: product?.price,
      })
    );
  };

  return (
    <Card className="border-none shadow-sm group">
      <Link to={`/products/${id}`}>
        <CardHeader className="pb-3">
          <img
            src={image}
            alt="product-image"
            className="pb-2 object-cover w-full h-72 rounded-lg"
          />
          <CardTitle className="text-lg font-semibold text-zinc-900">
            {name}
          </CardTitle>
        </CardHeader>
      </Link>
      <CardContent>
        <p className="flex items-center gap-2 font-medium text-slate-950">
          <span className="text-primary text-lg font-semibold">{price}৳</span>
          <span className="text-zinc-500 line-through">
            {price + discount}৳
          </span>
        </p>
      </CardContent>
      <CardFooter className="grid gap-2">
        <Button
          onClick={handleAddToCart}
          variant={"secondary"}
          className="w-full gap-2 text-primary group-hover:bg-primary group-hover:text-white"
        >
          <ShoppingCart size={20} /> Buy Now
        </Button>
        <Button variant={"ghost"} className="w-full gap-2">
          <CopyPlus size={20} /> Add to Compare
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
