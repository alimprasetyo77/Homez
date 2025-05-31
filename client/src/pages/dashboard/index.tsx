import { ClockArrowDown, FileHeart, HouseIcon, MessageSquareQuote } from "lucide-react";

const MainDashboard = () => {
  return (
    <div className="grid">
      <div className="grid grid-cols-4 gap-x-10">
        <div className="py-4 flex items-center justify-start gap-x-4 bg-white rounded-xl px-4">
          <div className="p-3 bg-[#ef4f4f] rounded-full text-white">
            <HouseIcon className="size-8" />
          </div>
          <div className="grid gap-2 font-semibold">
            <span className="font-medium text-sm">Your Listing</span>
            <div className="flex items-center text-sm text-muted-foreground">
              <span className="text-3xl text-black">32 </span>/ 50 remaining
            </div>
          </div>
        </div>
        <div className="py-4 flex items-center justify-start gap-x-4 bg-white rounded-xl px-4">
          <div className="p-3 bg-[#ef4f4f] rounded-full text-white">
            <ClockArrowDown className="size-8" />
          </div>
          <div className="grid gap-2 font-semibold">
            <span className="font-medium text-sm">Pending</span>
            <span className="text-3xl text-black">02 </span>
          </div>
        </div>
        <div className="py-4 flex items-center justify-start gap-x-4 bg-white rounded-xl px-4">
          <div className="p-3 bg-[#ef4f4f] rounded-full text-white">
            <FileHeart className="size-8" />
          </div>
          <div className="grid gap-2 font-semibold">
            <span className="font-medium text-sm">Favorites</span>
            <span className="text-3xl text-black">20 </span>
          </div>
        </div>
        <div className="py-4 flex items-center justify-start gap-x-4 bg-white rounded-xl px-4">
          <div className="p-3 bg-[#ef4f4f] rounded-full text-white">
            <MessageSquareQuote className="size-8" />
          </div>
          <div className="grid gap-2 font-semibold">
            <span className="font-medium text-sm">Reviews</span>
            <span className="text-3xl text-black">1.322 </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;
