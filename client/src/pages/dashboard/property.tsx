import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { usdCurrencyFormat } from "@/lib/utils";
import { useAuthStore } from "@/stores/auth-store";
import { IProperty } from "@/types/property-type";
import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CircleOff, Edit, ExternalLink, MoreHorizontal, X } from "lucide-react";
const Property = () => {
  const properties = useAuthStore((state) => state.user?.properties);

  const columns: ColumnDef<IProperty>[] = [
    {
      accessorKey: "title",
      header: "Title",
      cell: (info) => (
        <div className="flex items-start gap-x-4 ">
          <div className="space-y-2">
            <h2 className="font-bold ">{info.getValue() as string}</h2>
            <p className="text-gray-600 text-xs">
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
      header: "Status",
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
      header: "Publisehed At",
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
      cell: () => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center justify-center">
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>
                <Edit />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CircleOff />
                Sold
              </DropdownMenuItem>
              <DropdownMenuItem>
                <X />
                Delete
              </DropdownMenuItem>
              <DropdownMenuItem>
                <ExternalLink />
                View property details
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
  if (!properties || properties.length === 0) {
    return (
      <div className="container bg-white rounded-sm p-8 min-h-screen space-y-6">
        <h1 className="text-2xl font-semibold">My Properties</h1>
        <p className="text-gray-500">You have no properties listed.</p>
      </div>
    );
  }
  return (
    <div className="container bg-white rounded-sm p-8 min-h-screen space-y-6">
      <h1 className="text-2xl font-semibold">My Properties</h1>
      <DataTable columns={columns} data={properties as any} />
    </div>
  );
};

export default Property;
