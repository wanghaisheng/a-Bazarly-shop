import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { IOrder } from "@/types/TOrder";
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";
import { formatDate } from "@/utils/formatDate";

const OrderDetails = ({ order }: { order: IOrder }) => {
  return (
    <Dialog>
      <DialogTrigger className="text-sm p-2 hover:bg-muted rounded w-full text-left">
        View details
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center mb-4">Order Details</DialogTitle>
          <ScrollArea className="h-[300px] w-full rounded-md">
            <Table>
              {order?.id ? (
                <TableBody>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>
                      {formatDate(new Date(order?.createdAt))}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Status</TableCell>
                    <TableCell>
                      {capitalizeFirstLetter(order?.status)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Product Quantity</TableCell>
                    <TableCell>{order?.orderItem?.length}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Total Amount</TableCell>
                    <TableCell>৳ {order?.totalAmount}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Shipping</TableCell>
                    <TableCell>৳ {60}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Payment Type</TableCell>
                    <TableCell>{order?.paymentType}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Payment Status</TableCell>
                    <TableCell>
                      {capitalizeFirstLetter(order?.paymentStatus)}
                    </TableCell>
                  </TableRow>
                  {order?.orderItem?.map((item) => (
                    <TableRow>
                      <TableCell>
                        <img
                          src={item?.product?.image}
                          alt="product"
                          className="max-w-16"
                        />
                      </TableCell>
                      <TableCell>
                        <p>{item?.product?.name}</p>
                        <p className="font-semibold">
                          ৳ {item?.product?.price}{" "}
                          <span className="line-through font-normal text-xs">
                            ৳ {item?.product?.price + item?.product?.discount}
                          </span>
                        </p>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              ) : (
                // display No data found if there is no data
                <TableCaption>No Data Found</TableCaption>
              )}
            </Table>
          </ScrollArea>
          <div className="flex justify-center pt-3">
            <DialogClose className="text-sm bg-muted p-2 px-4 rounded-lg hover:bg-primary-foreground">
              Close
            </DialogClose>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetails;
