import { Upload } from "lucide-react";

interface IVerifyForm {
  formData: any;
  handleInputChange: (fieldType: string, value: any) => void;
}

const VerifyForm = ({ formData, handleInputChange }: IVerifyForm) => {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white rounded-lg p-8 shadow-sm border">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
            <span className="text-red-500 font-bold text-lg">1</span>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Verifikasi Properti</h2>
            <p className="text-gray-600">Mari verifikasi kepemilikan dan detail properti Anda</p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Jenis Properti</label>
            <select
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              value={formData.propertyType}
              onChange={(e) => handleInputChange("propertyType", e.target.value)}
            >
              <option value="">Pilih jenis properti</option>
              <option value="house">Rumah</option>
              <option value="apartment">Apartemen</option>
              <option value="villa">Villa</option>
              <option value="townhouse">Townhouse</option>
              <option value="land">Tanah</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status Kepemilikan</label>
            <div className="grid grid-cols-2 gap-4">
              {["Pemilik", "Agen"].map((type) => (
                <button
                  key={type}
                  className={`p-4 border-2 rounded-lg text-center transition-all ${
                    formData.ownership === type.toLowerCase()
                      ? "border-red-500 bg-red-50 text-red-700"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                  onClick={() => handleInputChange("ownership", type.toLowerCase())}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Upload Dokumen</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-16 text-center hover:border-gray-400 transition-colors">
              <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-gray-600 mb-2">Sertifikat, IMB, atau dokumen kepemilikan lainnya</p>
              <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
                Pilih File
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyForm;
