/* eslint-disable @typescript-eslint/no-explicit-any */
import Container from "@/components/shared/Container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  useGetAllProductsQuery,
  useGetSingleProductQuery,
} from "@/redux/features/product/productApi";
import { IProduct } from "@/types/TProduct";
import {
  HandCoins,
  Loader2,
  MinusIcon,
  PlusIcon,
  ShieldOff,
  ShoppingCart,
  Store,
  Truck,
  Undo2,
  UserCircle,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import RelatedProductCard from "./ProductDetailsUtils/RelatedProductCard";
import { Rating } from "primereact/rating";

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);

  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const { data, isFetching } = useGetSingleProductQuery({ id });
  const product = data?.data;
  const { data: relatedProductsData } = useGetAllProductsQuery({
    category: product?.category?.name,
    limit: 6,
  });

  const relatedProducts = relatedProductsData?.data as IProduct[];

  const price = product?.price;
  const totalPrice = price + product?.discount;
  const discountParcent = (product?.discount / totalPrice) * 100;

  return (
    <div>
      {isFetching ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="animate-spin" />
        </div>
      ) : (
        <div>
          {/* product and delivery section */}
          <Container>
            <section className="flex flex-col md:flex-row justify-between gap-10 my-12">
              <div className="flex flex-col md:flex-row gap-10">
                {/* image */}
                <div className="md:max-w-xs lg:max-w-sm xl:max-w-md">
                  <img
                    src={product?.image}
                    alt="product-image"
                    className="rounded w-full"
                  />
                </div>
                {/* product info */}
                <div className="flex-1">
                  <h1 className="text-xl md:text-2xl font-bold mb-2">
                    {product?.name}
                  </h1>
                  <h3 className="md:text-lg font-semibold mb-4">
                    <span className="font-bold">Category:</span>{" "}
                    {product?.category?.name}
                  </h3>
                  {/* stock status */}
                  <div
                    className={`w-fit p-2 px-4 ${
                      product?.stock > 0 ? "bg-green-500" : "bg-red-500"
                    } bg-opacity-10 rounded-full`}
                  >
                    <h1>
                      Status:{" "}
                      <span
                        className={`font-bold ${
                          product?.stock < 1 && "text-red-500"
                        }`}
                      >
                        {product?.stock > 0 ? "In Stock" : "Out of Stock"}
                      </span>
                    </h1>
                  </div>
                  {/* Price */}
                  <h2 className="py-6 text-base">
                    <span className="text-2xl md:text-3xl font-bold text-primary">
                      ৳{price}
                    </span>
                    <p className="space-x-2">
                      <span className="line-through text-zinc-700">
                        ৳{totalPrice}
                      </span>
                      <span>{`-${discountParcent}%`}</span>
                    </p>
                  </h2>

                  <div className="flex flex-wrap md:flex-row items-center gap-2 md:gap-6">
                    {/* item counter */}
                    <div className="inline-flex items-center gap-2 p-2 py-1 md:p-3 md:py-2 my-2 bg-gray-200 rounded-full">
                      <Button
                        onClick={() =>
                          quantity > 1 && setQuantity(quantity - 1)
                        }
                        className="rounded-full p-1.5 h-8"
                      >
                        <MinusIcon size={20} />
                      </Button>
                      <Input
                        value={quantity}
                        readOnly
                        className="px-1 w-10 text-center bg-transparent border-none focus-visible:ring-0 focus-visible:ring-white text-xl"
                      />
                      <Button
                        onClick={() =>
                          quantity < product?.stock && setQuantity(quantity + 1)
                        }
                        className="rounded-full p-1.5 h-8"
                      >
                        <PlusIcon size={20} />
                      </Button>
                    </div>
                    {/* Add To cart button */}
                    <Button
                      disabled={product?.quantity < 1}
                      // onClick={handleAddToCart}
                      className="text-base flex items-center gap-2 py-6 md:p-7 rounded-full"
                    >
                      <ShoppingCart className="size-6" /> Add To Cart
                    </Button>
                  </div>
                </div>
              </div>
              {/* delivery information */}
              <div className="border p-4 w-full lg:w-fit rounded-lg">
                <div>
                  <h3 className="text-sm font-bold">Delivery Options</h3>
                  <div className="flex justify-between items-center gap-12 py-3">
                    <div className="flex gap-3 items-center">
                      <Truck className="text-zinc-500" />
                      <div>
                        <p>Standard Delivery</p>
                        <p className="text-sm text-zinc-500">
                          Guaranteed within 3-5 days
                        </p>
                      </div>
                    </div>
                    <p className="font-medium">৳ 60</p>
                  </div>
                  <div className="flex justify-between items-center gap-12 py-3">
                    <div className="flex gap-3 items-center">
                      <HandCoins className="text-zinc-500" />
                      <div>
                        <p>Cash on Delivery Available</p>
                      </div>
                    </div>
                  </div>
                </div>
                <Separator className="mb-4" />
                <div>
                  <h3 className="text-sm font-bold">Return & Warranty </h3>
                  <div className="flex justify-between items-center gap-12 py-3">
                    <div className="flex gap-3 items-center">
                      <Undo2 className="text-zinc-500" />
                      <div>
                        <p>7 Days Returns</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center gap-12 py-3">
                    <div className="flex gap-3 items-center">
                      <ShieldOff className="text-zinc-500" />
                      <div>
                        <p>Warranty Not Available</p>
                      </div>
                    </div>
                  </div>
                </div>
                <Separator className="mb-4" />
                <div>
                  <h3 className="text-sm font-bold">Sold By</h3>
                  <div className="flex justify-between items-center gap-12 py-4">
                    <div className="flex gap-3 items-center">
                      <Store className="text-zinc-500" />
                      <div>
                        <Link to={""} className="font-bold hover:text-primary">
                          {product?.shop?.name}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </Container>
          {/* description and reviews section */}
          <section className="bg-[#F2F4F8]">
            <Container>
              <div className="flex py-8 gap-6 flex-col lg:flex-row">
                <div className="flex-1 space-y-6">
                  {/* description */}
                  <div className="bg-white p-6 rounded-lg">
                    <div className="mb-4">
                      <h1 className="text-xl font-bold">Description</h1>
                    </div>
                    <article className="prose ">{product?.description}</article>
                  </div>
                  {/* reviews */}
                  <div className="bg-white p-6 rounded-lg">
                    <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
                      <div>
                        <h1 className="text-xl font-bold">
                          Reviews ({product?._count?.review})
                        </h1>
                        <p className="text-zinc-700">
                          Get specific details about this product from customers
                          who own it.
                        </p>
                      </div>
                      <Button
                        variant={"outline"}
                        className="border-primary border-2 font-bold text-primary hover:bg-primary hover:text-white"
                      >
                        Write a Review
                      </Button>
                    </div>
                    <div>
                      {product?.review?.length > 0 ? (
                        product?.review?.map((review: any) => (
                          <div className="py-4 border-t">
                            <Rating
                              value={review?.rating}
                              cancel={false}
                              readOnly
                              className="flex gap-1 text-amber-500"
                            />
                            <div className="flex gap-2 mt-2">
                              <UserCircle size={20} className="text-zinc-700" />
                              <div>
                                <h3 className="text-sm">
                                  {review?.customer?.name}
                                </h3>
                                <p className="text-xs">
                                  On {review?.createdAt?.split("T")[0]}
                                </p>
                              </div>
                            </div>
                            <div className="pt-4">
                              <p className="text-zinc-800">{review?.comment}</p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p>No Review Found</p>
                      )}
                    </div>
                  </div>
                </div>
                {/* related products */}
                {relatedProducts?.length > 0 && (
                  <div className="bg-white p-6 rounded-lg w-full lg:max-w-fit">
                    <h1 className="text-xl font-semibold text-center text-primary pb-4">
                      Related Products
                    </h1>
                    <div>
                      {relatedProducts.map((item: IProduct) => (
                        <RelatedProductCard key={item.id} product={item} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Container>
          </section>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
