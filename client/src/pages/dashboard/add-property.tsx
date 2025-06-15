import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Upload,
  MapPin,
  Home,
  DollarSign,
  Camera,
  Star,
  Check,
  AlertCircle,
} from "lucide-react";
type FormDataType = {
  propertyType: string;
  ownership: string;
  documents: any[];
  title: string;
  description: string;
  address: string;
  bedrooms: string;
  bathrooms: string;
  area: string;
  yearBuilt: string;
  amenities: string[];
  listingType: string;
  price: string;
  pricePerSqft: string;
  photos: any[];
  allowReviews: boolean;
};

const PropertyListingFlow = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const [formData, setFormData] = useState<FormDataType>({
    // Verification data
    propertyType: "",
    ownership: "",
    documents: [],

    // Details data
    title: "",
    description: "",
    address: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
    yearBuilt: "",
    amenities: [],

    // Pricing data
    listingType: "sale",
    price: "",
    pricePerSqft: "",

    // Photos data
    photos: [],

    // Reviews data
    allowReviews: true,
  });

  const steps = [
    { id: "verify", label: "Verifikasi", icon: Check },
    { id: "details", label: "Detail", icon: Home },
    { id: "pricing", label: "Harga", icon: DollarSign },
    { id: "photos", label: "Foto", icon: Camera },
    { id: "reviews", label: "Ulasan", icon: Star },
  ];

  const amenitiesList = [
    "AC",
    "Kolam Renang",
    "Gym",
    "Parkir",
    "Keamanan 24 Jam",
    "Taman",
    "Balkon",
    "Furnished",
    "Internet",
    "Laundry",
  ];

  const handleInputChange = (field: any, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleArrayToggle = (field: any, item: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: prev[field].includes(item)
        ? prev[field].filter((i: any) => i !== item)
        : [...prev[field], item],
    }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const StepIndicator = () => (
    <div className="flex justify-center mb-8">
      <div className="flex items-center space-x-4">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;

          return (
            <div key={step.id} className="flex items-center">
              <div
                className={`
                flex items-center justify-center size-12 rounded-full border-2 transition-all
                ${
                  isActive
                    ? "bg-red-500 border-red-500 text-white"
                    : isCompleted
                    ? "bg-green-500 border-green-500 text-white"
                    : "bg-gray-100 border-gray-200 text-gray-400"
                }
              `}
              >
                <Icon size={20} />
              </div>
              <span className={`ml-2 text-sm font-medium ${isActive ? "text-red-500" : "text-gray-500"}`}>
                {step.label}
              </span>
              {index < steps.length - 1 && (
                <div className={`w-12 h-0.5 ml-4 ${isCompleted ? "bg-green-500" : "bg-gray-300"}`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  const VerifyStep = () => (
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

  const DetailsStep = () => (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white rounded-lg p-8 shadow-sm border">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
            <span className="text-red-500 font-bold text-lg">2</span>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Detail Properti</h2>
            <p className="text-gray-600">Lengkapi informasi detail tentang properti Anda</p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Judul Listing</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              placeholder="Contoh: Rumah Modern 3 Kamar di Jakarta Selatan"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Deskripsi</label>
            <textarea
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              placeholder="Deskripsikan properti Anda dengan detail..."
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Alamat Lengkap</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                placeholder="Masukkan alamat lengkap"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Kamar Tidur</label>
              <input
                type="number"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                value={formData.bedrooms}
                onChange={(e) => handleInputChange("bedrooms", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Kamar Mandi</label>
              <input
                type="number"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                value={formData.bathrooms}
                onChange={(e) => handleInputChange("bathrooms", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Luas (m²)</label>
              <input
                type="number"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                value={formData.area}
                onChange={(e) => handleInputChange("area", e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Fasilitas</label>
            <div className="grid grid-cols-2 gap-2">
              {amenitiesList.map((amenity) => (
                <label key={amenity} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-red-500 focus:ring-red-500"
                    checked={formData.amenities.includes(amenity)}
                    onChange={() => handleArrayToggle("amenities", amenity)}
                  />
                  <span className="text-sm text-gray-700">{amenity}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const PricingStep = () => (
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

  const PhotosStep = () => (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white rounded-lg p-8 shadow-sm border">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
            <span className="text-red-500 font-bold text-lg">4</span>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Foto Properti</h2>
            <p className="text-gray-600">Upload foto berkualitas tinggi untuk menarik minat pembeli</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-gray-400 transition-colors">
            <Camera className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Foto Properti</h3>
            <p className="text-gray-600 mb-4">
              Drag & drop foto atau klik untuk memilih file
              <br />
              <span className="text-sm">Format: JPG, PNG (Max 5MB per file)</span>
            </p>
            <button className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors">
              Pilih Foto
            </button>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg">
            <div className="flex items-start">
              <Camera className="h-5 w-5 text-yellow-600 mt-0.5 mr-2" />
              <div>
                <h4 className="text-sm font-medium text-yellow-800">Tips Foto Terbaik</h4>
                <ul className="text-sm text-yellow-700 mt-1 space-y-1">
                  <li>• Ambil foto di siang hari dengan cahaya alami</li>
                  <li>• Sertakan foto eksterior, interior, dan area sekitar</li>
                  <li>• Pastikan ruangan terlihat rapi dan bersih</li>
                  <li>• Upload minimal 5 foto untuk hasil terbaik</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="aspect-video bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center"
              >
                <div className="text-center">
                  <Camera className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">Foto {i}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const ReviewsStep = () => (
    <div className="max-w-5xl mx-auto">
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

          <div className="space-y-4">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-red-500 focus:ring-red-500"
                checked={formData.allowReviews}
                onChange={(e) => handleInputChange("allowReviews", e.target.checked)}
              />
              <span className="text-gray-700">Izinkan pengunjung memberikan ulasan</span>
            </label>

            <label className="flex items-center space-x-3">
              <input type="checkbox" className="rounded border-gray-300 text-red-500 focus:ring-red-500" />
              <span className="text-gray-700">Terima notifikasi email untuk inquiry baru</span>
            </label>

            <label className="flex items-center space-x-3">
              <input type="checkbox" className="rounded border-gray-300 text-red-500 focus:ring-red-500" />
              <span className="text-gray-700">Tampilkan nomor kontak di listing</span>
            </label>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Ringkasan Listing</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Jenis:</span>
                <span className="ml-2 text-gray-900 capitalize">{formData.propertyType || "-"}</span>
              </div>
              <div>
                <span className="text-gray-600">Harga:</span>
                <span className="ml-2 text-gray-900">Rp {formData.price || "-"}</span>
              </div>
              <div>
                <span className="text-gray-600">Kamar:</span>
                <span className="ml-2 text-gray-900">
                  {formData.bedrooms || "-"} KT, {formData.bathrooms || "-"} KM
                </span>
              </div>
              <div>
                <span className="text-gray-600">Luas:</span>
                <span className="ml-2 text-gray-900">{formData.area || "-"} m²</span>
              </div>
            </div>
          </div>

          <button className="w-full bg-red-500 text-white py-4 px-6 rounded-lg hover:bg-red-600 transition-colors font-medium text-lg">
            Publikasikan Listing
          </button>
        </div>
      </div>
    </div>
  );

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <VerifyStep />;
      case 1:
        return <DetailsStep />;
      case 2:
        return <PricingStep />;
      case 3:
        return <PhotosStep />;
      case 4:
        return <ReviewsStep />;
      default:
        return <VerifyStep />;
    }
  };

  return (
    <div className="min-h-screen font-sans">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Listing Properti Anda</h1>
          <p className="text-gray-800 ">
            Lengkapi langkah-langkah berikut untuk mempublikasikan properti Anda.
          </p>
        </div>

        <StepIndicator />

        <div className="mb-8">{renderStep()}</div>

        {/* Navigation */}
        <div className="flex justify-between items-center max-w-5xl mx-auto">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className={`flex items-center px-6 py-3 rounded-lg transition-colors ${
              currentStep === 0 ? "text-gray-400 cursor-not-allowed" : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali
          </button>

          <button
            onClick={nextStep}
            disabled={currentStep === steps.length - 1}
            className={`flex items-center px-6 py-3 rounded-lg transition-colors ${
              currentStep === steps.length - 1
                ? "text-gray-400 cursor-not-allowed"
                : "bg-red-500 text-white hover:bg-red-600"
            }`}
          >
            Lanjutkan ke {steps[currentStep + 1]?.label}
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyListingFlow;
