import ChangePassword from "@/components/modals/change-password-modal";
import DeleteUser from "@/components/modals/delete-user-modal";
import UpdateUser from "@/components/modals/update-user-modal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuthStore } from "@/stores/auth-store";
import { Info } from "lucide-react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const Profile = () => {
  const { user } = useAuthStore();
  return (
    <div className="bg-white rounded-xl p-6 border space-y-8">
      {/* <h1 className="text-xl font-medium">Profile</h1> */}
      {user?.role == "AGENT" && (
        <div className="p-4 rounded-xl border flex items-center gap-4">
          <Info className="text-sky-500" />
          <h3 className="text-sm text-sky-500">
            Your current account type is set to agent, if you want to remove your agent account, and return to
            normal account, you must click the button below.
          </h3>
        </div>
      )}
      <div className="flex items-center justify-between bg-white rounded-xl p-6 border ">
        <div className="flex items-center gap-x-5">
          <Avatar className="size-20 relative group  ">
            <AvatarImage src={user?.photoUrl as string} alt="@shadcn" />
            <AvatarFallback>{user?.name?.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="space-y-2">
            <h2 className="font-semibold capitalize">{user?.name}</h2>
            <p className="flex items-center text-muted-foreground text-xs ">
              {user?.position ? (
                <>
                  <span>{user?.position ?? "-"}</span>
                </>
              ) : null}
              {user?.address?.city ? (
                <>
                  <span className="mx-1">|</span>
                  <span className="capitalize">
                    {user.address.city}
                    {" , "}
                  </span>
                </>
              ) : null}
              {user?.address?.state ? <span className="capitalize ml-1">{user.address?.state}</span> : null}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-x-6 *:border *:p-1.5 *:flex *:items-center *:justify-center *:rounded-full ">
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
              <span className=" font-medium text-sm text-gray-800">
                {user?.address?.country !== "" ? user?.address?.country : "-"}
              </span>
            </div>
            <div className="flex flex-col ">
              <span className="text-muted-foreground text-xs">City/State</span>
              <span className=" font-medium text-sm text-gray-800">
                {user?.address?.city} {user?.address?.city && user.address.state ? "/" : "-"}{" "}
                {user?.address?.state}
              </span>
            </div>
            <div className="flex flex-col ">
              <span className="text-muted-foreground text-xs">Postal Code</span>
              <span className=" font-medium text-sm text-gray-800">
                {user?.postalCode !== 0 ? user?.postalCode : "-"}
              </span>
            </div>
            <div className="flex flex-col ">
              <span className="text-muted-foreground text-xs">TAX ID</span>
              <span className=" font-medium text-sm text-gray-800">{user?.taxId ?? "-"}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="gap-x-4 flex items-center justify-end *:text-xs *:cursor-pointer">
        <DeleteUser />
        <ChangePassword />
        <UpdateUser />
      </div>
    </div>
  );
};

export default Profile;
