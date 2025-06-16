import React, { useState } from "react";
import {
  ChevronRight,
  Home,
  MapPin,
  Camera,
  DollarSign,
  FileText,
  Check,
  ArrowLeft,
  Upload,
  Eye,
  Edit3,
} from "lucide-react";

const PropertyFlow = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    propertyType: "",
    location: "",
    basicInfo: {},
    photos: [],
    pricing: {},
    description: "",
  });

  const steps = [
    { id: 1, title: "Pilih Tipe Properti", icon: Home, color: "bg-blue-500" },
    { id: 2, title: "Informasi Lokasi", icon: MapPin, color: "bg-green-500" },
    { id: 3, title: "Detail Properti", icon: FileText, color: "bg-purple-500" },
    { id: 4, title: "Upload Foto", icon: Camera, color: "bg-orange-500" },
    { id: 5, title: "Harga & Biaya", icon: DollarSign, color: "bg-red-500" },
    { id: 6, title: "Review & Publish", icon: Check, color: "bg-teal-500" },
  ];

  const propertyTypes = [
    { type: "rumah", label: "Rumah", desc: "Rumah tinggal, villa, townhouse" },
    { type: "apartemen", label: "Apartemen", desc: "Apartemen, kondominium, studio" },
    { type: "ruko", label: "Ruko", desc: "Ruko, shophouse, commercial space" },
    { type: "tanah", label: "Tanah", desc: "Tanah kosong, kavling, lahan" },
    { type: "warehouse", label: "Gudang", desc: "Gudang, warehouse, pabrik" },
    { type: "office", label: "Kantor", desc: "Ruang kantor, coworking space" },
  ];

  const renderStepIndicator = () => (
    <div className="bg-white border-b px-6 py-4">
      <div className="flex items-center justify-between max-w-4xl mx-auto">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  currentStep >= step.id ? step.color : "bg-gray-200"
                } transition-colors duration-300`}
              >
                <step.icon className={`w-5 h-5 ${currentStep >= step.id ? "text-white" : "text-gray-400"}`} />
              </div>
              <span
                className={`text-xs mt-1 ${
                  currentStep >= step.id ? "text-gray-900 font-medium" : "text-gray-400"
                }`}
              >
                {step.title}
              </span>
            </div>
            {index < steps.length - 1 && (
              <ChevronRight
                className={`w-4 h-4 mx-4 ${currentStep > step.id ? "text-gray-400" : "text-gray-300"}`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderStep1 = () => (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Pilih Tipe Properti</h2>
        <p className="text-gray-600">Tentukan jenis properti yang ingin Anda tambahkan</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {propertyTypes.map((property) => (
          <div
            key={property.type}
            onClick={() => setFormData({ ...formData, propertyType: property.type })}
            className={`p-6 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md ${
              formData.propertyType === property.type
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{property.label}</h3>
            <p className="text-gray-600 text-sm">{property.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Informasi Lokasi</h2>
        <p className="text-gray-600">Masukkan detail lokasi properti Anda</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Alamat Lengkap</label>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
              placeholder="Masukkan alamat lengkap properti..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Provinsi</label>
              <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option>Pilih Provinsi</option>
                <option>DKI Jakarta</option>
                <option>Jawa Barat</option>
                <option>Jawa Tengah</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Kota/Kabupaten</label>
              <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option>Pilih Kota</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Kecamatan</label>
              <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option>Pilih Kecamatan</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Kode Pos</label>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="12345"
              />
            </div>
          </div>
        </div>

        <div className="bg-gray-100 rounded-lg p-4 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <MapPin className="w-12 h-12 mx-auto mb-2" />
            <p>Peta akan muncul di sini</p>
            <p className="text-sm">untuk konfirmasi lokasi</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Detail Properti</h2>
        <p className="text-gray-600">Lengkapi informasi detail tentang properti</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nama/Judul Properti</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Contoh: Rumah Modern 2 Lantai di Jakarta Selatan"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Kamar Tidur</label>
              <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5+</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Kamar Mandi</label>
              <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5+</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Lantai</label>
              <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4+</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Luas Tanah (m²)</label>
              <input
                type="number"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="120"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Luas Bangunan (m²)</label>
              <input
                type="number"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="90"
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Fasilitas</label>
            <div className="grid grid-cols-2 gap-3">
              {["AC", "Parkir", "Security", "Swimming Pool", "Gym", "Taman"].map((facility) => (
                <label key={facility} className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span className="text-sm text-gray-700">{facility}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Kondisi Properti</label>
            <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
              <option>Baru</option>
              <option>Renovasi</option>
              <option>Terawat</option>
              <option>Perlu Renovasi</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sertifikat</label>
            <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
              <option>SHM (Sertifikat Hak Milik)</option>
              <option>SHGB (Sertifikat Hak Guna Bangunan)</option>
              <option>AJB (Akta Jual Beli)</option>
              <option>Girik</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload Foto Properti</h2>
        <p className="text-gray-600">Tambahkan foto-foto menarik untuk menarik perhatian pembeli</p>
      </div>

      <div className="space-y-6">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-lg font-medium text-gray-700 mb-2">Drop foto di sini atau klik untuk upload</p>
          <p className="text-gray-500 mb-4">Maksimal 20 foto, format JPG/PNG, ukuran max 5MB per foto</p>
          <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">
            Pilih Foto
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((index) => (
            <div key={index} className="relative group">
              <div className="aspect-square bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                <Camera className="w-8 h-8 text-gray-400" />
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                <button className="p-2 bg-white rounded-full">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="p-2 bg-white rounded-full">
                  <Edit3 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">Tips Foto yang Baik:</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Gunakan pencahayaan alami yang cukup</li>
            <li>• Foto dari berbagai sudut (depan, samping, belakang)</li>
            <li>• Sertakan foto interior dan eksterior</li>
            <li>• Pastikan foto tidak blur dan berkualitas tinggi</li>
          </ul>
        </div>
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Harga & Biaya</h2>
        <p className="text-gray-600">Tentukan harga dan informasi keuangan lainnya</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tipe Transaksi</label>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 border-2 border-blue-500 bg-blue-50 rounded-lg text-center">
                <p className="font-medium text-blue-900">Dijual</p>
              </button>
              <button className="p-4 border-2 border-gray-300 rounded-lg text-center hover:border-gray-400">
                <p className="font-medium text-gray-700">Disewa</p>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Harga Jual</label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-500">Rp</span>
              <input
                type="text"
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="1.500.000.000"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Harga per m²</label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-500">Rp</span>
              <input
                type="text"
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                placeholder="12.500.000"
                readOnly
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">Dihitung otomatis berdasarkan luas bangunan</p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Biaya Tambahan</label>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-700">Biaya Notaris</span>
                <input
                  type="text"
                  className="w-24 p-1 text-right border border-gray-300 rounded text-sm"
                  placeholder="1%"
                />
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-700">PPN</span>
                <input
                  type="text"
                  className="w-24 p-1 text-right border border-gray-300 rounded text-sm"
                  placeholder="11%"
                />
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-700">BPHTB</span>
                <input
                  type="text"
                  className="w-24 p-1 text-right border border-gray-300 rounded text-sm"
                  placeholder="5%"
                />
              </div>
            </div>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-medium text-green-900 mb-2">Estimasi Total Biaya:</h4>
            <div className="space-y-1 text-sm text-green-800">
              <div className="flex justify-between">
                <span>Harga Properti:</span>
                <span>Rp 1.500.000.000</span>
              </div>
              <div className="flex justify-between">
                <span>Biaya Tambahan:</span>
                <span>Rp 255.000.000</span>
              </div>
              <div className="border-t border-green-200 pt-1 mt-2">
                <div className="flex justify-between font-medium">
                  <span>Total:</span>
                  <span>Rp 1.755.000.000</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep6 = () => (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Review & Publish</h2>
        <p className="text-gray-600">Periksa kembali semua informasi sebelum mempublikasikan</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Ringkasan Properti</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Tipe:</span>
                <span className="font-medium">Rumah</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Lokasi:</span>
                <span className="font-medium">Jakarta Selatan</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Kamar Tidur:</span>
                <span className="font-medium">3</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Kamar Mandi:</span>
                <span className="font-medium">2</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Luas:</span>
                <span className="font-medium">120/90 m²</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Harga:</span>
                <span className="font-medium text-green-600">Rp 1.5 M</span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Deskripsi Properti</label>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              rows={6}
              placeholder="Tulis deskripsi menarik tentang properti Anda..."
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Opsi Publikasi</h3>
            <div className="space-y-4">
              <label className="flex items-center space-x-3">
                <input type="radio" name="publish" className="text-blue-500" defaultChecked />
                <div>
                  <p className="font-medium">Publish Sekarang</p>
                  <p className="text-sm text-gray-600">Properti akan langsung tampil di listing</p>
                </div>
              </label>
              <label className="flex items-center space-x-3">
                <input type="radio" name="publish" className="text-blue-500" />
                <div>
                  <p className="font-medium">Simpan sebagai Draft</p>
                  <p className="text-sm text-gray-600">Simpan untuk diedit nanti</p>
                </div>
              </label>
              <label className="flex items-center space-x-3">
                <input type="radio" name="publish" className="text-blue-500" />
                <div>
                  <p className="font-medium">Jadwalkan Publikasi</p>
                  <p className="text-sm text-gray-600">Tentukan waktu untuk dipublikasikan</p>
                </div>
              </label>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Sebelum Publish:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>✓ Pastikan semua foto sudah terupload</li>
              <li>✓ Periksa kembali harga dan detail</li>
              <li>✓ Verifikasi informasi kontak</li>
              <li>✓ Baca syarat dan ketentuan</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      case 4:
        return renderStep4();
      case 5:
        return renderStep5();
      case 6:
        return renderStep6();
      default:
        return renderStep1();
    }
  };

  return (
    <div className=" bg-gray-50">
      {renderStepIndicator()}

      <div className="py-8 *:min-h-[35rem] ">{renderCurrentStep()}</div>

      <div className="bg-white border-t px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <button
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
            className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Sebelumnya</span>
          </button>

          <div className="flex space-x-3">
            {currentStep < 6 ? (
              <button
                onClick={() => setCurrentStep(Math.min(6, currentStep + 1))}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2"
              >
                <span>Lanjutkan</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2">
                <Check className="w-4 h-4" />
                <span>Publish Properti</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyFlow;
