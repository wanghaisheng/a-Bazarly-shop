import { LoaderCircle } from "lucide-react";

const Loading = () => {
  return (
    <div className="h-screen fixed inset-0 z-50 backdrop-blur-md bg-black/10 flex justify-center items-center">
      <LoaderCircle size={28} className="animate-spin" />
    </div>
  );
};

export default Loading;
