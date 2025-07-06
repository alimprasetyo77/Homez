import Alert from "@/components/alert";
import ChangePassword from "@/components/modals/change-password-modal";
import UpdateUser from "@/components/modals/update-user-modal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useDeleteUserLogin } from "@/hooks/use-users";
import { isAllFieldsFilled } from "@/lib/utils";
import { useAuthStore } from "@/stores/auth-store";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { PiWarningCircle } from "react-icons/pi";

const Profile = () => {
  const { user } = useAuthStore();
  const { deleteUserByLogin, pendingDeleteUser } = useDeleteUserLogin();
  const isCompleteProfile = isAllFieldsFilled(user!);

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 space-y-6">
      <h1 className="text-xl font-medium">Profile</h1>
      {!isCompleteProfile && (
        <div className="p-4 rounded-sm border-l-4 border-yellow-400 flex items-center gap-4 bg-yellow-50">
          <PiWarningCircle className="size-5 text-yellow-800" />
          <h3 className="text-sm text-yellow-800">
            Your profile is not yet complete. Please update your personal information to unlock all features,
            including the ability to add new properties.
          </h3>
        </div>
      )}

      <div className="flex items-center justify-between bg-white rounded-xl p-6 border ">
        <div className="flex items-center gap-x-5">
          <Avatar className="size-20 relative group  ">
            <AvatarImage src={user?.photoProfile as string} alt="@shadcn" />
            <AvatarFallback>{user?.name?.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="space-y-2">
            <h2 className="font-semibold capitalize">{user?.name}</h2>
            <p className="flex items-center text-muted-foreground text-xs ">
              {user?.location?.country ? <span className="capitalize">{user?.location?.country}</span> : null}
              {user?.location.country && user.location.state ? <span className="mx-2">|</span> : null}
              {user?.location?.state ? <span className="capitalize">{user.location?.state}</span> : null}
            </p>
          </div>
        </div>
        {Object.values(user?.socialMedia!).some(Boolean) ? (
          <div className="flex items-center gap-x-6 *:border *:p-1.5 *:flex *:items-center *:justify-center *:rounded-full ">
            <a href={user?.socialMedia.facebook} target="_blank">
              <FaFacebook className="size-5" />
            </a>
            <a href={user?.socialMedia.linkedIn} target="_blank">
              <FaLinkedin className="size-5" />
            </a>
            <a href={user?.socialMedia.instagram} target="_blank">
              <FaInstagram className="size-5" />
            </a>
            <a href={user?.socialMedia.x} target="_blank">
              <FaTwitter className="size-5" />
            </a>
          </div>
        ) : null}
      </div>
      <div className="bg-white rounded-xl p-6 border space-y-4 ">
        <h1 className="text-lg font-semibold text-gray-800">Personal information</h1>
        <div className="grid grid-cols-12">
          <div className="col-span-5 grid grid-cols-2 gap-y-6 gap-x-16">
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
        <h1 className="text-lg font-semibold text-gray-800">Location</h1>
        <div className="grid grid-cols-12 ">
          <div className="col-span-5 grid grid-cols-2 gap-y-6 gap-x-16">
            <div className="flex flex-col">
              <span className="text-muted-foreground text-xs">Address</span>
              <span className=" font-medium text-sm text-gray-800">{user?.location?.address || "-"}</span>
            </div>
            <div className="flex flex-col ">
              <span className="text-muted-foreground text-xs">Country</span>
              <span className=" font-medium text-sm text-gray-800">{user?.location?.country || "-"}</span>
            </div>
            <div className="flex flex-col ">
              <span className="text-muted-foreground text-xs">City/State</span>
              <span className=" font-medium text-sm text-gray-800">
                {user?.location?.city || "-"} / {user?.location?.state || "-"}
              </span>
            </div>
            <div className="flex flex-col ">
              <span className="text-muted-foreground text-xs">Postal Code</span>
              <span className=" font-medium text-sm text-gray-800">{user?.location?.postalCode || "-"}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="gap-x-4 flex items-center justify-end *:text-xs *:cursor-pointer">
        <Alert
          title="Delete this account"
          description="Once you delete a account, there is no going back. Please be certain."
          onAction={deleteUserByLogin}
        >
          <Button
            className="h-auto text-xs cursor-pointer"
            variant={"destructive"}
            disabled={pendingDeleteUser}
          >
            Delete Account
          </Button>
        </Alert>
        <ChangePassword />
        <UpdateUser />
      </div>
    </div>
  );
};

export default Profile;
