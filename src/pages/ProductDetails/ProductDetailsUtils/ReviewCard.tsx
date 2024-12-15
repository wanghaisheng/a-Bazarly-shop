import { IReview } from "@/types/TReview";
import { UserCircle } from "lucide-react";
import { Rating } from "primereact/rating";

const ReviewCard = ({ review }: { review: IReview }) => {
  return (
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
          <h3 className="text-sm">{review?.customer?.name}</h3>
          <p className="text-xs">On {review?.createdAt?.split("T")[0]}</p>
        </div>
      </div>
      <div className="pt-4">
        <p className="text-zinc-800">{review?.comment}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
