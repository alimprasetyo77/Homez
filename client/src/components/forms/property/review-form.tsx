import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { FaSpinner } from "react-icons/fa";
import { useParams } from "react-router-dom";

const ReviewForm = () => {
  const { propertyId } = useParams();
  const isEditMode = Boolean(propertyId);
  const {
    getValues,
    formState: { isSubmitting, isDirty },
  } = useFormContext();
  return (
    <div className="max-w-5xl mx-auto ">
      <div className="bg-white rounded-lg p-8 shadow-sm border">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
            <span className="text-red-500 font-bold text-lg">5</span>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Pengaturan Ulasan</h2>
            <p className="text-gray-600">Konfigurasi sistem ulasan dan review untuk listing Anda</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-green-50 p-6 rounded-lg">
            <div className="flex items-start">
              <Check className="h-6 w-6 text-green-600 mt-1 mr-3" />
              <div>
                <h3 className="text-lg font-medium text-green-800 mb-2">Listing Siap Dipublikasi!</h3>
                <p className="text-green-700">
                  Properti Anda telah lengkap dan siap untuk dipublikasikan. Setelah review tim kami (1-2 hari
                  kerja), listing akan tampil di platform.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Ringkasan Listing</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Jenis:</span>
                <span className="ml-2 text-gray-900 capitalize">{getValues("listingType") || "-"}</span>
              </div>
              <div>
                <span className="text-gray-600">Harga:</span>
                <span className="ml-2 text-gray-900">Rp {getValues("price") || "-"}</span>
              </div>
              <div>
                <span className="text-gray-600">Kamar:</span>
                <span className="ml-2 text-gray-900">{getValues("bathrooms") || "-"} KT</span>
              </div>
              <div>
                <span className="text-gray-600">Luas:</span>
                <span className="ml-2 text-gray-900">{getValues("squareFeet") || "-"} m²</span>
              </div>
            </div>
          </div>
          <Button
            type="submit"
            disabled={isSubmitting || !isDirty}
            aria-disabled={isSubmitting || !isDirty}
            className="w-full cursor-pointer  ml-auto bg-red-500 text-white h-10  rounded-lg hover:bg-red-600  flex items-center justify-center"
          >
            {isSubmitting ? (
              <FaSpinner className="animate-spin duration-300" />
            ) : (
              <span>{isEditMode ? "Update Listing" : "Publish Listing"}</span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReviewForm;
