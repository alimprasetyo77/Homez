import { AlertCircle } from "lucide-react";

interface IPricingForm {
  formData: any;
  handleInputChange: (fieldType: string, value: any) => void;
}
const PricingForm = ({ formData, handleInputChange }: IPricingForm) => {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white rounded-lg p-8 shadow-sm border">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
            <span className="text-red-500 font-bold text-lg">3</span>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Penetapan Harga</h2>
            <p className="text-gray-600">Tentukan harga yang kompetitif untuk properti Anda</p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tipe Listing</label>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "sale", label: "Dijual" },
                { value: "rent", label: "Disewakan" },
              ].map((type) => (
                <button
                  key={type.value}
                  className={`p-4 border-2 rounded-lg text-center transition-all ${
                    formData.listingType === type.value
                      ? "border-red-500 bg-red-50 text-red-700"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                  onClick={() => handleInputChange("listingType", type.value)}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Harga {formData.listingType === "rent" ? "Sewa (per bulan)" : "Jual"}
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-500">Rp</span>
              <input
                type="text"
                className="w-full pl-8 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                placeholder="0"
                value={formData.price}
                onChange={(e) => handleInputChange("price", e.target.value)}
              />
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5 mr-2" />
              <div>
                <h4 className="text-sm font-medium text-blue-800">Tips Penetapan Harga</h4>
                <p className="text-sm text-blue-700 mt-1">
                  Riset harga pasar di area sekitar untuk mendapatkan harga yang kompetitif. Harga yang
                  realistis akan mempercepat proses transaksi.
                </p>
              </div>
            </div>
          </div>

          {formData.area && formData.price && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">
                Harga per m²:{" "}
                <span className="font-medium text-gray-900">
                  Rp{" "}
                  {Math.round(
                    parseInt(formData.price.replace(/\D/g, "")) / parseInt(formData.area)
                  ).toLocaleString()}
                </span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PricingForm;
