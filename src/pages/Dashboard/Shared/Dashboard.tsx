import { useAppSelector } from "@/redux/hook";
import { selectCurrentUser } from "@/redux/features/auth/AuthSlice";
import WelcomeBanner from "./WelcomeBanner";

const Dashboard = () => {
  const user = useAppSelector(selectCurrentUser);

  return (
    <div className="flex flex-1 flex-col gap-4 lg:gap-6">
      <WelcomeBanner />
    </div>
  );
};

export default Dashboard;
