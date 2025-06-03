import UpdateUser from "@/components/modals/update-user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/auth-store";

const Profile = () => {
  const { user } = useAuthStore();
  return (
    <div className="bg-white rounded-xl p-6 border  space-y-10">
      <h1 className="text-xl font-medium">Profile</h1>
      <div className="bg-white rounded-xl p-6 border flex items-center gap-x-6">
        <Avatar className="size-16">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="space-y-2">
          <h2 className="font-semibold capitalize">{user?.name}</h2>
          <span className="flex items-center text-muted-foreground text-xs">
            Property Owner | Arizona, United States
          </span>
        </div>
      </div>
      <div className="bg-white rounded-xl p-6 border space-y-4 ">
        <h1 className="text-lg font-semibold text-gray-800">Personal information</h1>
        <div className="grid grid-cols-12">
          <div className="col-span-5 grid grid-cols-2 gap-6">
            <div className="flex flex-col ">
              <span className="text-muted-foreground text-xs">First Name</span>
              <span className=" font-medium text-sm text-gray-800">{user?.name}</span>
            </div>
            <div className="flex flex-col ">
              <span className="text-muted-foreground text-xs">Last Name</span>
              <span className=" font-medium text-sm text-gray-800">{user?.name}</span>
            </div>
            <div className="flex flex-col ">
              <span className="text-muted-foreground text-xs">Email</span>
              <span className=" font-medium text-sm text-gray-800">{user?.email}</span>
            </div>
            <div className="flex flex-col ">
              <span className="text-muted-foreground text-xs">Phone</span>
              <span className=" font-medium text-sm text-gray-800">{user?.phone ? user.phone : "-"}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl p-6 border space-y-4 ">
        <h1 className="text-lg font-semibold text-gray-800">Address</h1>
        <div className="grid grid-cols-12">
          <div className="col-span-5 grid grid-cols-2 gap-6">
            <div className="flex flex-col ">
              <span className="text-muted-foreground text-xs">Country</span>
              <span className=" font-medium text-sm text-gray-800">{user?.name}</span>
            </div>
            <div className="flex flex-col ">
              <span className="text-muted-foreground text-xs">City/State</span>
              <span className=" font-medium text-sm text-gray-800">{user?.name}</span>
            </div>
            <div className="flex flex-col ">
              <span className="text-muted-foreground text-xs">Postal Code</span>
              <span className=" font-medium text-sm text-gray-800">{user?.email}</span>
            </div>
            <div className="flex flex-col ">
              <span className="text-muted-foreground text-xs">TAX ID</span>
              <span className=" font-medium text-sm text-gray-800">{user?.phone ? user.phone : "-"}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="gap-x-8 flex items-center justify-end">
        <UpdateUser>
          <Button variant={"outline"}>Edit</Button>
        </UpdateUser>

        <Button variant={"outline"}>Change Password</Button>
      </div>
    </div>
  );
};

export default Profile;
