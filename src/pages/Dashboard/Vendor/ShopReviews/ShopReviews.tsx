/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import CustomPagination from "@/components/shared/Pagination";
import { useAppSelector } from "@/redux/hook";
import { selectCurrentUser } from "@/redux/features/auth/AuthSlice";
import { useGetAllReviewsQuery } from "@/redux/features/review/reviewApi";
import { IReview } from "@/types/TReview";
import { formatDate } from "@/utils/formatDate";

const ShopReviews = () => {
  const [page, setPage] = useState(1);

  const user = useAppSelector(selectCurrentUser);

  //   get products data
  const { data, isFetching } = useGetAllReviewsQuery({
    page,
    vendorEmail: user?.email,
  });
  const reviews = data?.data?.data;
  const pages = Math.ceil(data?.meta?.total / data?.meta?.limit);

  return (
    <div className="flex flex-1 flex-col gap-4 lg:gap-6">
      <main className="grid flex-1 items-start gap-4 sm:py-0 md:gap-8">
        <Card className="grid flex-1 h-full shadow-none">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Reviews</CardTitle>
            <CardDescription>
              View your product reviews and customer feedback.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="hidden w-[100px] md:table-cell">
                    <span className="sr-only">Image</span>
                  </TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden md:table-cell">Rating</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Customer
                  </TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isFetching
                  ? Array.from({ length: 5 })?.map((_, index) => (
                      <TableRow key={index}>
                        <TableCell className="">
                          <Skeleton className="w-full h-16" />
                        </TableCell>
                        <TableCell className="font-medium hidden md:table-cell">
                          <Skeleton className="w-full h-5" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="w-full h-5" />
                        </TableCell>
                        <TableCell className="">
                          <Skeleton className="w-full h-5" />
                        </TableCell>
                        <TableCell className="">
                          <Skeleton className="w-full h-5" />
                        </TableCell>
                        <TableCell className="">
                          <Skeleton className="w-full h-5" />
                        </TableCell>
                      </TableRow>
                    ))
                  : // display date when fetching completed
                    reviews?.map((item: IReview, index: number) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          <img
                            src={item.product.image}
                            alt="user"
                            className="w-full max-w-16"
                          />
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <p className="font-semibold">{item.product.name}</p>
                        </TableCell>
                        <TableCell className="">{item.rating}</TableCell>
                        <TableCell className="hidden md:table-cell">
                          {item.customer.name}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {formatDate(new Date(item.createdAt))}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                aria-haspopup="true"
                                size="icon"
                                variant="ghost"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                              align="end"
                              className="space-y-1"
                            >
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              {/* view details button */}
                              {/* <OrderDetails order={item} /> */}
                              {/* cancel button */}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
              </TableBody>
              {reviews?.length < 1 && (
                <TableCaption>
                  {/* show no data found message if bookings is empty */}
                  <div className="text-center w-full mt-16">
                    <h3 className="text-2xl font-bold tracking-tight">
                      No review found
                    </h3>
                    {/* <p className="text-sm text-muted-foreground">
                      You can start enjoying as soon as you order a product.
                    </p> */}
                    {/* <Link to={"/products"}>
                      <Button className="mt-4">Buy Now</Button>
                    </Link> */}
                  </div>
                </TableCaption>
              )}
            </Table>
          </CardContent>
          {/* showing range of pagination */}
          {reviews?.length > 0 && (
            <CardFooter className="pb-2">
              <div className="text-xs text-muted-foreground">
                Showing <strong>1-{reviews?.length}</strong> of{" "}
                <strong>{reviews?.length}</strong>
              </div>
            </CardFooter>
          )}
          <CardFooter>
            <CustomPagination pages={pages} page={page} setPage={setPage} />
          </CardFooter>
        </Card>
      </main>
    </div>
  );
};

export default ShopReviews;
