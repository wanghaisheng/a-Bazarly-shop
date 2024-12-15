import { TCartItem } from "@/types/TCartItem";

export const calculation = (cartData: TCartItem[]) => {
  const subTotal = cartData?.reduce((prev, current) => {
    return prev + current?.product?.price * current?.quantity;
  }, 0);
  const shipping = subTotal > 1 ? 60 : 0;
  const total = subTotal + shipping;
  return { subTotal, shipping, total };
};
