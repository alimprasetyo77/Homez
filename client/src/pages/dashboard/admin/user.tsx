import { DataTable } from "@/components/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, FileSearch, MoreHorizontal, Trash2 } from "lucide-react";
import Alert from "@/components/alert";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useDeleteUserById, useUsers } from "@/hooks/use-users";
import { IUser } from "@/types/user-type";
import { FaSpinner } from "react-icons/fa";
import ReviewUser from "@/components/modals/review-user-modal";
import { Button } from "@/components/ui/button";

const User = () => {
  const { deleteUserByID, pendingDeleteUser } = useDeleteUserById();
  const { users, isLoading } = useUsers();

  const columns: ColumnDef<IUser>[] = [
    {
      accessorKey: "name",
      header: () => <h3 className="pl-2 ">Name</h3>,
      size: 500,
      cell: (info) => <div className="font-medium">{info.row.original.name}</div>,
      meta: {
        filterable: true,
        placeholder: "Search users",
      },
    },

    {
      accessorKey: "role",
      header: ({ column }) => (
        <Button variant={"ghost"} onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Role
          <ArrowUpDown />
        </Button>
      ),
      size: 100,
      cell: (info) => <div className="text-xs font-medium">{info.row.original.role}</div>,
    },

    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <div className="flex items-center justify-center">
          <Button variant={"ghost"} onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Registered At
            <ArrowUpDown />
          </Button>
        </div>
      ),
      size: 100,
      cell: (info) => (
        <div className="text-center text-xs font-medium">
          {new Date(info.getValue() as string).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      ),
    },
    {
      id: "actions",
      header: () => <h3 className="text-center">Actions</h3>,
      size: 100,
      cell: (info) => {
        return (
          <div className="flex items-center justify-center gap-x-2">
            <Popover>
              <PopoverTrigger className="cursor-pointer">
                <span className="sr-only">Open menu</span>
                <div className="size-6 p-1 rounded-full hover:bg-gray-200">
                  <MoreHorizontal className="h-4 w-4" />
                </div>
              </PopoverTrigger>
              <PopoverContent
                align="end"
                className="max-w-[150px] *:hover:bg-gray-200 p-0 *:px-4 *:py-2 *:flex *:items-center *:gap-x-2 *:text-xs py-2 *:cursor-pointer"
              >
                <ReviewUser userId={info.row.original.id}>
                  <div>
                    <FileSearch className="size-4" />
                    <span>View Details</span>
                  </div>
                </ReviewUser>
                <Alert
                  title="Are you sure?"
                  description={`This action cannot be undone. This will permanently delete the property data.`}
                  onAction={async () => await deleteUserByID(info.row.original.id)}
                >
                  <div>
                    <Trash2 className="size-4" />
                    <span>Delete</span>
                  </div>
                </Alert>
              </PopoverContent>
            </Popover>
          </div>
        );
      },
    },
  ];

  if (isLoading)
    return (
      <div className="min-h-screen py-16 bg-accent flex items-center justify-center">
        <FaSpinner className="animate-spin size-8 " />
      </div>
    );
  return (
    <div className="container bg-white rounded-sm p-8 min-h-screen space-y-6">
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">List Users</h1>
        </div>
        <DataTable
          columns={columns}
          data={users ?? []}
          isLoading={isLoading ?? pendingDeleteUser}
          initialStateSorting={[
            {
              id: "role",
              desc: true,
            },
            {
              id: "createdAt",
              desc: true,
            },
          ]}
        />
      </div>
    </div>
  );
};

export default User;
