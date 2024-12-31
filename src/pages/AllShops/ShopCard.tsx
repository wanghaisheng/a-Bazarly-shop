import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetShopReviewQuery } from "@/redux/features/review/reviewApi";
import { IShop } from "@/types/TShop";
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";
import { Rating } from "primereact/rating";
import { Link } from "react-router-dom";

const ShopCard = ({ shop }: { shop: IShop }) => {
  const { data } = useGetShopReviewQuery(shop.id);
  const rating = data?.data?.rating;

  return (
    <Card key={shop.id} className="border shadow-sm group">
      <Link to={`/shops/${shop.id}`}>
        <CardHeader className="pb-3">
          <img
            src={shop.logoUrl}
            alt="product-image"
            className="w-full max-w-36 mx-auto rounded-lg"
          />
          <CardTitle className="text-lg font-semibold text-zinc-900">
            {shop.name}
          </CardTitle>
        </CardHeader>
      </Link>
      <CardContent className="flex items-center justify-between gap-4 pb-4">
        <p className="flex items-center gap-2 text-zinc-600">
          <span className="size-1.5 bg-green-500 rounded-full"></span>
          <span className="text-sm font-semibold">
            {capitalizeFirstLetter(shop.status)}
          </span>
        </p>
        <Rating
          value={rating}
          cancel={false}
          readOnly
          className="flex items-center gap-1 text-primary"
        />
      </CardContent>
      <CardFooter>
        <Link to={`/shops/${shop.id}`} className="w-full">
          <Button className="w-full">View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ShopCard;
