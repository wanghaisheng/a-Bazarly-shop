import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logOut, selectAuth } from "@/redux/features/auth/AuthSlice";
import { selectCartProducts } from "@/redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { History, Repeat, ShoppingCart, User } from "lucide-react";
import { Link } from "react-router-dom";
import user_photo from "../../../assets/icons/user.png";
import { selectComparisonProducts } from "@/redux/features/comparison/comparisonSlice";

const RightSideContent = () => {
  const user = useAppSelector(selectAuth);
  const cart = useAppSelector(selectCartProducts);
  const comparisonItems = useAppSelector(selectComparisonProducts);

  const dispatch = useAppDispatch();

  return (
    <div className="flex items-center gap-5">
      <Link
        to={"/cart"}
        className="flex items-center gap-2 text-white hover:text-zinc-200 font-semibold transition-all relative"
      >
        <ShoppingCart size={28} />
        <Badge
          variant="secondary"
          className="absolute -top-3 -right-2 rounded-full bg-white px-1.5"
        >
          {cart.length}
        </Badge>
      </Link>
      <Link
        to={"/recent-products"}
        className="hidden lg:flex items-center gap-2 text-white hover:text-zinc-200 font-semibold transition-all"
      >
        <History size={28} className="overflow-hidden rounded-full" />
        <div>
          <p className="text-xs">Recent</p>
          <p className="text-sm font-bold">Viewed</p>
        </div>
      </Link>
      <Link
        to={"/compare-products"}
        className="hidden lg:flex items-center gap-2 text-white hover:text-zinc-200 font-semibold transition-all relative"
      >
        <Repeat size={28} />
        {comparisonItems.length > 0 && (
          <Badge
            variant="secondary"
            className="absolute -top-3 -right-2 rounded-full bg-white px-1.5"
          >
            {comparisonItems.length}
          </Badge>
        )}
      </Link>
      {user.accessToken ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            {user?.user && (
              <Button
                variant="outline"
                className="overflow-hidden rounded-full size-10 p-0 hover:border-primary"
              >
                <img
                  src={user_photo}
                  className="overflow-hidden rounded-full"
                />
              </Button>
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>
              <p>{user?.user?.name}</p>
              <p className="font-normal text-xs text-zinc-600">
                {user?.user?.email}
              </p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link to={"/dashboard/index"}>
              <DropdownMenuItem className="cursor-pointer">
                Dashboard
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => dispatch(logOut())}
              className="text-destructive cursor-pointer"
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className="flex items-center gap-1">
          <Link
            to={"/login"}
            className="flex items-center gap-2 text-white hover:text-zinc-200 font-semibold transition-all"
          >
            <User size={28} className="overflow-hidden rounded-full" />
            <div className="hidden md:block">
              <p className="text-xs">Sign In</p>
              <p className="text-sm font-bold">Account</p>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default RightSideContent;
