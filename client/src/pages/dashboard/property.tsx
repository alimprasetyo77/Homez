import { DataTable } from "@/components/data-table";
import { isAllFieldsFilled, usdCurrencyFormat } from "@/lib/utils";
import { IProperty } from "@/types/property-type";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, ExternalLink, MoreHorizontal, Trash2 } from "lucide-react";
import Alert from "@/components/alert";
import { toast } from "sonner";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useDeleteProperty, useMyProperties } from "@/hooks/use-properties";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/stores/auth-store";

const Property = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { deleteProperty, pendingDeleteProperty } = useDeleteProperty();
  const [havePendingProperty, sethavePendingProperty] = useState(false);
  const { properties } = useMyProperties();
  const isCompleteProfile = isAllFieldsFilled(user!);

  useEffect(() => {
    if (!properties) return;
    const result = properties?.some((property) => property.status === "pending");
    sethavePendingProperty(result!);
  }, [properties]);

  const columns: ColumnDef<IProperty>[] = [
    {
      accessorKey: "title",
      header: () => <h3 className="pl-2">Property</h3>,
      size: 800,
      cell: (info) => (
        <div className="flex items-start gap-x-4 ">
          <div className="space-y-2">
            <h2 className="font-bold ">{info.getValue() as string}</h2>
            <p className="text-gray-600 text-xs text-wrap">
              {info.row.original.location.address}, {info.row.original.location.city},{" "}
              {info.row.original.location.state}, {info.row.original.location.country}
            </p>
            <span className="font-semibold text-gray-800 text-sm">
              {usdCurrencyFormat(info.row.original.price)}
            </span>
          </div>
        </div>
      ),
    },

    {
      accessorKey: "status",
      header: () => <h3 className="text-center">Status</h3>,
      size: 50,
      cell: (info) => {
        const status = info.getValue() as string;
        const statusClasses: Record<string, string> = {
          pending: "bg-yellow-100 text-yellow-800",
          approved: "bg-green-100 text-green-800",
          rejected: "bg-red-100 text-red-800",
        };
        return (
          <div className="text-center text-xs font-medium">
            <span className={`inline-flex items-center px-2 py-1 rounded-full ${statusClasses[status]}`}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: () => <h3 className="text-center">Publisehed At</h3>,
      size: 50,
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
                <Alert
                  title="Are you sure?"
                  description={`This action cannot be undone. This will permanently delete the property data.`}
                  onAction={async () => await deleteProperty(info.row.original.id)}
                >
                  <div>
                    <Trash2 className="size-4" />
                    <span>Delete</span>
                  </div>
                </Alert>
                <div
                  onClick={() => {
                    navigate(`/property/form/${info.row.original.id}`);
                  }}
                >
                  <Edit className="size-4" />
                  <span>Edit</span>
                </div>
                <div onClick={() => navigate(`/properties/${info.row.original.id}`)}>
                  <ExternalLink className="size-4" />
                  <span>view</span>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        );
      },
      size: 50,
    },
  ];

  if (!properties) {
    return (
      <div className="bg-white rounded-2xl p-6 border border-gray-200 min-h-screen space-y-6">
        <h1 className="text-2xl font-semibold">My Properties</h1>
        <p className="text-gray-500">You have no properties listed.</p>
      </div>
    );
  }
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200  min-h-screen space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-medium">My Properties</h1>
        <Button
          variant={"outline"}
          onClick={() => {
            if (!isCompleteProfile) {
              toast.warning("Please complete your profile before proceeding.", {
                action: (
                  <Button onClick={() => navigate("/dashboard/profile")} variant={"outline"}>
                    Go to Profile
                  </Button>
                ),
              });
              return;
            }
            if (havePendingProperty) {
              toast("You have pending property");
              return;
            }
            navigate("/property/form");
          }}
        >
          Add Property
        </Button>
      </div>
      <DataTable columns={columns} data={properties} isLoading={pendingDeleteProperty} />
    </div>
  );
};

export default Property;
