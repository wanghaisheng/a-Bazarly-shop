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
import { ShoppingCart, User } from "lucide-react";
import { Link } from "react-router-dom";
import user_photo from "../../../assets/icons/user.png";

const RightSideContent = () => {
  const user = useAppSelector(selectAuth);
  const cart = useAppSelector(selectCartProducts);

  const dispatch = useAppDispatch();

  return (
    <div className="flex items-center gap-4">
      <Link to={"/cart"} className="">
        <Button
          variant={"outline"}
          className="text-base border-2 border-primary text-primary relative"
        >
          <ShoppingCart />
          {cart.length > 0 && (
            <Badge
              variant="secondary"
              className="absolute -top-3 -left-2 rounded-full bg-primary px-2"
            >
              {cart.length}
            </Badge>
          )}
        </Button>
      </Link>
      {user.accessToken ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            {user?.user ? (
              <Button
                variant="outline"
                className="overflow-hidden rounded-full size-10 p-0 hover:border-primary"
              >
                <img
                  src={user_photo}
                  className="overflow-hidden rounded-full"
                />
              </Button>
            ) : (
              <Button
                variant="outline"
                className="overflow-hidden rounded-full size-10 p-2"
              >
                <User size={24} className="overflow-hidden rounded-full" />
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
          {/* <Link to={"/sign-up"} className="hidden lg:block">
              <Button
                variant={"ghost"}
                className="text-base relative flex items-center gap-2"
              >
                Sign up
              </Button>
            </Link> */}
          <Link to={"/login"}>
            <Button className="text-base relative flex items-center gap-2">
              Login
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default RightSideContent;
