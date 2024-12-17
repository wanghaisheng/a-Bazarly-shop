import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  addToComparison,
  selectComparisonProducts,
} from "@/redux/features/comparison/comparisonSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { IProduct } from "@/types/TProduct";
import { CopyPlus, XIcon } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const AddToComparison = ({ product }: { product: IProduct }) => {
  const [open, setOpen] = useState(false);

  const dispatch = useAppDispatch();
  const products = useAppSelector(selectComparisonProducts);
  const isSameCategory = products.find(
    (item) => item.categoryId === product.categoryId
  );

  const handleAddToComparison = () => {
    // only products from the same category can be compared
    if (products.length && !isSameCategory) {
      setOpen(true);
      return;
    }
    dispatch(addToComparison(product));
  };

  return (
    <div>
      {/* Trigger the dialog programmatically */}
      <Button
        onClick={handleAddToComparison}
        variant={"ghost"}
        className="w-full gap-2"
      >
        <CopyPlus size={20} /> Add to Compare
      </Button>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex gap-2 items-center">
              <XIcon className="text-red-500" /> Failed Adding to Comparison
            </AlertDialogTitle>
            <AlertDialogDescription>
              Only products from the same category can be compared.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpen(false)}>
              Close
            </AlertDialogCancel>
            <Link to={"/comparison"}>
              <AlertDialogAction>Compare Now</AlertDialogAction>
            </Link>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AddToComparison;
