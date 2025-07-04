import { DataTable } from "@/components/data-table";
import { IProperty } from "@/types/property-type";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Check, Edit, ExternalLink, FileSearch, MoreHorizontal, Trash2, X } from "lucide-react";
import Alert from "@/components/alert";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useDeleteProperty, useProperties } from "@/hooks/use-properties";
import ReviewProperty from "@/components/modals/review-property-modal";
import { useApproveProperty, useRejectProperty } from "@/hooks/use-admin";

const PropertyAdmin = () => {
  const navigate = useNavigate();
  const { rejectProperty } = useRejectProperty();
  const { approveProperty } = useApproveProperty();
  const { properties, isLoading } = useProperties();
  const { deleteProperty, pendingDeleteProperty } = useDeleteProperty();

  const columns: ColumnDef<IProperty>[] = [
    {
      accessorKey: "title",
      header: () => <h3 className="pl-2">Property</h3>,
      size: 500,
      cell: (info) => <h2 className="font-medium">{info.getValue() as string}</h2>,
      meta: {
        filterable: true,
        placeholder: "Search properties...",
      },
    },

    {
      accessorKey: "status",
      header: ({ column }) => (
        <Button variant={"ghost"} onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Status
          <ArrowUpDown />
        </Button>
      ),
      size: 100,
      cell: (info) => {
        const status = info.getValue() as string;
        const statusClasses: Record<string, string> = {
          pending: "bg-yellow-100 text-yellow-800",
          approved: "bg-green-100 text-green-800",
          rejected: "bg-red-100 text-red-800",
        };
        return (
          <div className="text-xs font-medium">
            <span className={`inline-flex items-center px-2 py-1 rounded-full ${statusClasses[status]}`}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <div className="flex items-center justify-center">
          <Button variant={"ghost"} onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Publisehed At
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
      cell: (info) => {
        const isPending = info.row.original.status === "pending";
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
                {!isPending && (
                  <div
                    onClick={() => {
                      navigate(`/property/form/${info.row.original.id}`);
                    }}
                  >
                    <Edit className="size-4" />
                    <span>Edit</span>
                  </div>
                )}

                <ReviewProperty propertyId={info.row.original.id}>
                  <div>
                    <FileSearch className="size-4" />

                    <span>{isPending ? "Review" : "View Details"}</span>
                  </div>
                </ReviewProperty>

                {!isPending && (
                  <div onClick={() => navigate(`/property/${info.row.original.id}`)}>
                    <ExternalLink className="size-4" />
                    <span>View on page</span>
                  </div>
                )}

                {isPending && (
                  <>
                    <Alert
                      title="Are you sure you want to approve this property?"
                      description={`Once approved, the listing will be published and visible to users.`}
                      onAction={async () => await approveProperty(info.row.original.id)}
                    >
                      <div>
                        <Check className="size-4" />
                        <span>Approve</span>
                      </div>
                    </Alert>
                    <Alert
                      title="Reject this property?"
                      description={`Rejected listings will be hidden from the public.`}
                      onAction={async () => await rejectProperty(info.row.original.id)}
                    >
                      <div>
                        <X className="size-4" />
                        <span>Reject</span>
                      </div>
                    </Alert>
                  </>
                )}
              </PopoverContent>
            </Popover>
          </div>
        );
      },
      size: 100,
    },
  ];

  return (
    <div className="container bg-white rounded-sm p-8 min-h-screen space-y-6">
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">List Properties</h1>
        </div>

        <DataTable
          columns={columns}
          data={properties ?? []}
          isLoading={isLoading ?? pendingDeleteProperty}
          initialStateSorting={[
            {
              id: "status",
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

export default PropertyAdmin;
