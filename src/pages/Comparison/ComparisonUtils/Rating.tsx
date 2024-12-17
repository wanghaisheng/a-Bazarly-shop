import { useGetProductReviewQuery } from "@/redux/features/review/reviewApi";
import { IProduct } from "@/types/TProduct";
import { Rating } from "primereact/rating";

const RatingDisplay = ({ product }: { product: IProduct }) => {
  const { data: reviewData } = useGetProductReviewQuery({
    productId: product.id,
  });

  return (
    <Rating
      value={reviewData?.data?.rating}
      cancel={false}
      readOnly
      className="flex gap-1 text-primary mb-4"
    />
  );
};

export default RatingDisplay;
