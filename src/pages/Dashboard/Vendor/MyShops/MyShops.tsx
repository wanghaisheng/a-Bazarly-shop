import { useGetProfileQuery } from "@/redux/features/profile/profileApi";
import { useGetVendorShopsQuery } from "@/redux/features/shop/shopApi";
import { IShop } from "@/types/TShop";
import { UpdateShopDialogue } from "./EditShop";
import { Loader2 } from "lucide-react";
import { AddShopDialogue } from "./AddShop";

const MyShops = () => {
  const { data } = useGetProfileQuery(undefined);
  const vendor = data?.data;

  const { data: shopData, isFetching } = useGetVendorShopsQuery(vendor?.id);
  const shop = shopData?.data[0] as IShop;

  // display loading
  if (isFetching) {
    return (
      <section className="flex justify-center items-center gap-8 py-16">
        <Loader2 className="animate-spin" />
      </section>
    );
  }

  return (
    <div>
      {shop && (
        <section className="flex flex-col md:flex-row gap-8 p-6 border rounded-lg">
          <div className="border p-4 rounded-lg">
            <img src={shop?.logoUrl} alt="shop" className="max-w-48" />
          </div>
          <div className="p-4 rounded-lg w-full space-y-3">
            <h1 className="font-bold text-zinc-700 text-2xl md:text-3xl">
              Name: <span className="text-zinc-900">{shop?.name}</span>
            </h1>
            <p className="font-medium text-zinc-700">
              Phone: <span className="text-zinc-900">{shop?.phoneNumber}</span>
            </p>
            <p className="font-medium text-zinc-700">
              Email: <span className="text-zinc-900">{vendor?.email}</span>
            </p>
            <p className="font-medium text-zinc-700">
              Address:{" "}
              <span className="text-zinc-900">{shop?.shopAddress}</span>
            </p>
            <p className="font-medium text-zinc-700">
              Description:{" "}
              <span className="text-zinc-900">{shop?.description}</span>
            </p>
          </div>
          <div>
            <UpdateShopDialogue shop={shop} />
          </div>
        </section>
      )}
      {!shop && (
        <section className="flex flex-col items-center gap-8 p-6 border rounded-lg">
          <div className="text-center space-y-4">
            <h1 className="text-xl font-medium text-zinc-700">
              You haven't created any shop yet!
            </h1>
            <AddShopDialogue />
          </div>
        </section>
      )}
    </div>
  );
};

export default MyShops;
