import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useUser } from "@/hooks/use-users";
import { PropsWithChildren } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const ReviewUser = (props: PropsWithChildren<{ userId: string }>) => {
  const { userId, children } = props;
  const { user } = useUser(userId);
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="min-w-7xl max-h-[50rem] overflow-y-auto">
        <DialogHeader className="space-y-3">
          <DialogTitle>Detail User</DialogTitle>
          <DialogDescription className="bg-blue-50 border-l-4 border-blue-400 p-4 text-[13px] text-gray-800 rounded-md ">
            This section displays the detailed profile information of the selected user. Please review the
            user's data for completeness and accuracy before approving any property listings or account
            actions.
          </DialogDescription>

          <div className="max-w-md w-full flex items-center gap-x-10 p-4 text-[13px] rounded-md">
            <Avatar className="size-24">
              <AvatarImage src={user?.photoProfile} alt="@shadcn" />
              <AvatarFallback className="text-lg bg-gray-200">
                {user?.name?.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex items-center gap-x-6 *:border *:p-1.5 *:flex *:items-center *:justify-center *:rounded-full text-gray-900 *:cursor-pointer">
              <a href={user?.socialMedia?.facebook} target="_blank">
                <FaFacebook className="size-5" />
              </a>
              <a href={user?.socialMedia?.linkedIn} target="_blank">
                <FaLinkedin className="size-5" />
              </a>
              <a href={user?.socialMedia?.instagram} target="_blank">
                <FaInstagram className="size-5" />
              </a>
              <a href={user?.socialMedia?.x} target="_blank">
                <FaTwitter className="size-5" />
              </a>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4  mt-4">
          <h3 className="font-medium">Personal Information</h3>
          <div className="grid grid-cols-2 gap-20 text-sm p-2">
            <div className="space-y-6 *:space-x-4">
              <div>
                <span className="min-w-16 font-medium">Name</span>
                <span>:</span>
                <span>{user?.name}</span>
              </div>

              <div>
                <span className="min-w-16 font-medium">Email </span>
                <span>:</span>
                <span>{user?.email}</span>
              </div>
              <div>
                <span className="min-w-16 font-medium">Phone</span>
                <span>:</span>
                <span className="capitalize">{user?.phone ?? "-"}</span>
              </div>
            </div>
            <div className="space-y-6 *:space-x-4">
              <div>
                <span className="min-w-16 font-medium">Role</span>
                <span>:</span>
                <span className="capitalize">{user?.role}</span>
              </div>
              <div>
                <span className="min-w-16 font-medium">Bio</span>
                <span>:</span>
                <span>{user?.bio ?? "-"}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-4  mt-4">
          <h3 className="font-medium">Location</h3>
          <div className="grid grid-cols-2 gap-20 text-sm p-2">
            <div className="space-y-6 *:space-x-4 text-sm p-2">
              <div>
                <span className="min-w-16 font-medium">Address</span>
                <span>:</span>
                <span>{user?.location?.address ?? "-"}</span>
              </div>
              <div>
                <span className="min-w-16 font-medium">City</span>
                <span>:</span>
                <span>{user?.location?.city ?? "-"}</span>
              </div>
            </div>
            <div className="space-y-6 *:space-x-4 text-sm p-2">
              <div>
                <span className="min-w-16 font-medium">State</span>
                <span>:</span>
                <span>{user?.location?.state ?? "-"}</span>
              </div>
              <div>
                <span className="min-w-16 font-medium">Country</span>
                <span>:</span>
                <span>{user?.location?.country ?? "-"}</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewUser;
