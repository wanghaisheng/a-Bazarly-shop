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
  DropdownMenuItem,
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
import {
  useDeleteCustomerMutation,
  useGetAllCustomersQuery,
} from "@/redux/features/customer/customerApi";
import { ICustomer } from "@/types/TCustomer";
import { useState } from "react";
import CustomPagination from "@/components/shared/Pagination";
import { useChangeUserStatusMutation } from "@/redux/features/user/userApi";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";

const Customers = () => {
  const [page, setPage] = useState(1);

  // get customers data
  const { data, isFetching } = useGetAllCustomersQuery({ page });
  const customers = data?.data;
  const pages = Math.ceil(data?.meta?.total / data?.meta?.limit);

  // suspend user
  const [suspendCustomer] = useChangeUserStatusMutation();
  const handleSuspendCustomer = async (customer: ICustomer) => {
    toast.loading("Pending...", { id: "Block_Customer" });
    try {
      const res = await suspendCustomer({
        id: customer.user.id,
        payload: {
          status: customer.user.status === "ACTIVE" ? "BLOCKED" : "ACTIVE",
        },
      }).unwrap();
      if (res.success) {
        toast.success("Successfully changed", { id: "Block_Customer" });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.data?.message, { id: "Block_Customer" });
      console.log(error);
    }
  };

  // suspend user
  const [deleteCustomer] = useDeleteCustomerMutation();
  const handleDeleteCustomer = async (customer: ICustomer) => {
    toast.loading("Pending...", { id: "Delete_Customer" });
    try {
      const res = await deleteCustomer(customer.id).unwrap();
      if (res.success) {
        toast.success("Successfully deleted", { id: "Delete_Customer" });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.data?.message, { id: "Delete_Customer" });
      console.log(error);
    }
  };

  return (
    <div className="flex flex-1 flex-col gap-4 lg:gap-6">
      <main className="grid flex-1 items-start gap-4 sm:py-0 md:gap-8">
        <Card className="grid flex-1 h-full shadow-none">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Customers</CardTitle>
            <CardDescription>
              Manage customers and view their details.
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
                  <TableHead className="hidden md:table-cell">Email</TableHead>
                  <TableHead className="hidden md:table-cell">Phone</TableHead>
                  <TableHead>Status</TableHead>
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
                    customers?.map((item: ICustomer, index: number) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          <img
                            src={item.profilePhoto}
                            alt="user"
                            className="w-full max-w-16"
                          />
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <p className="font-semibold">{item.name}</p>
                        </TableCell>
                        <TableCell className="">{item?.email}</TableCell>
                        <TableCell className="hidden md:table-cell">
                          {item?.phoneNumber}
                        </TableCell>
                        <TableCell className="">
                          <Badge
                            variant={"outline"}
                            className={`rounded-full ${
                              item.user.status === "BLOCKED" && "text-red-500"
                            }`}
                          >
                            {capitalizeFirstLetter(item.user.status)}
                          </Badge>
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
                              <DropdownMenuItem
                                onClick={() => handleSuspendCustomer(item)}
                                className="gap-1"
                              >
                                {item.user.status === "ACTIVE"
                                  ? "Block"
                                  : "Unblock"}
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleDeleteCustomer(item)}
                                className="gap-1 text-red-500"
                              >
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
              </TableBody>
              {customers?.length < 1 && (
                <TableCaption>
                  {/* show no data found message if bookings is empty */}
                  <div className="text-center w-full mt-14">
                    <h3 className="text-2xl font-bold tracking-tight">
                      No customers found
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
          {customers?.length > 0 && (
            <CardFooter className="pb-2">
              <div className="text-xs text-muted-foreground">
                Showing <strong>1-{customers?.length}</strong> of{" "}
                <strong>{customers?.length}</strong>
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

export default Customers;
