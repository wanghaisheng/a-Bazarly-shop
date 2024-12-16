import Container from "@/components/shared/Container";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetSinglePaymentQuery } from "@/redux/features/payment/paymentApi";
import { formatTime } from "@/utils/formatTime";
import { X } from "lucide-react";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

const PaymentFail = () => {
  const [params] = useSearchParams();
  const paymentId = params.get("payment_id");

  const { data, isFetching } = useGetSinglePaymentQuery(paymentId);
  const payment = data?.data;

  const paymentTime = formatTime(payment?.createdAt);

  return (
    <div className="bg-slate-50 min-h-screen">
      <Container>
        <div className="flex justify-center">
          <div className="flex flex-col items-center justify-center gap-4 p-6 my-10 rounded-lg bg-white min-w-80">
            <div className="flex flex-col items-center gap-4">
              {/* check mark */}
              <div className="p-4 rounded-full bg-red-100 w-min">
                <div className="p-1 bg-red-600 rounded-full">
                  <X className="text-background font-bold" />
                </div>
              </div>
              <h3 className="text-xl font-bold">Payment Failed!</h3>
              {isFetching ? (
                <Skeleton className="h-9 w-full" />
              ) : (
                <h1 className="text-2xl font-extrabold">৳ {payment?.amount}</h1>
              )}
            </div>
            <Separator />
            {isFetching ? (
              <Skeleton className="w-full h-36" />
            ) : (
              <div className="flex flex-col gap-2 w-full">
                <p className="flex justify-between gap-6 font-bold">
                  <span className="text-zinc-500">Date: </span>
                  <span>{payment?.createdAt?.split("T")[0]}</span>
                </p>
                <p className="flex justify-between gap-6 font-bold">
                  <span className="text-zinc-500">Time: </span>
                  <span>{paymentTime}</span>
                </p>
                {/* <p className="flex justify-between gap-6 font-bold">
                  <span className="text-zinc-500">Sender Name: </span>
                  <span>{payment?.order?.customer?.name}</span>
                </p>
                <p className="flex justify-between gap-6 font-bold">
                  <span className="text-zinc-500">Sender Phone: </span>
                  <span>{payment?.order?.customer?.phoneNumber}</span>
                </p> */}
                <p className="flex justify-between gap-6 font-bold">
                  <span className="text-zinc-500">Trx ID: </span>
                  <span>{payment?.transactionId}</span>
                </p>
              </div>
            )}
            <Separator />
            {isFetching ? (
              <Skeleton className="w-full h-8" />
            ) : (
              <div className="w-full">
                <p className="flex justify-between gap-6 font-bold">
                  <span className="text-zinc-500">Amount: </span>
                  <span>৳ {payment?.amount}</span>
                </p>
              </div>
            )}
            <Separator />
            <div className="mt-2">
              <Link to={"/dashboard"}>
                <Button className="md:text-base">Try Again</Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default PaymentFail;
