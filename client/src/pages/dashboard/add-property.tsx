import { useState } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import VerifyForm from "@/components/forms/property/verify-form";
import DetailForm from "@/components/forms/property/detail-form";
import PricingForm from "@/components/forms/property/pricing-form";
import PhotosForm from "@/components/forms/property/photos-form";
import { Steps } from "@/constants/property";
import StepIndicator from "@/components/step-indicator";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { createPropertySchema, ICreateProperty } from "@/types/property-type";
import { zodResolver } from "@hookform/resolvers/zod";
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

  const form = useForm<ICreateProperty>({
    resolver: zodResolver(createPropertySchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      status: "pending",
      type: "house",
      listingType: "buy",
      bedrooms: 0,
      bathrooms: 0,
      squareFeet: 0,
      location: {
        address: "",
        city: "",
        state: "",
        country: "",
        postalCode: 0,
        latitude: 0,
        longitude: 0,
      },
      amenities: [],
      photos: {
        main_photo: "",
        photo_1: "",
        photo_2: "",
        photo_3: "",
        photo_4: "",
      },
      isFeatured: false,
      isVerified: false,
    },
  });

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
    if (currentStep < Steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

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
        return <VerifyForm />;
      case 1:
        return (
          <DetailForm
            formData={formData}
            handleArrayToggle={handleArrayToggle}
            handleInputChange={handleInputChange}
          />
        );
      case 2:
        return <PricingForm formData={formData} handleInputChange={handleInputChange} />;
      case 3:
        return <PhotosForm />;
      case 4:
        return <ReviewsStep />;
      default:
        return <VerifyForm />;
    }
  };

  return (
    <div className="min-h-screen font-sans">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Listing Your Property</h1>
          <p className="text-gray-800 ">Complete the following steps to publish your property.</p>
        </div>

        <StepIndicator currentStep={currentStep} />

        <Form {...form}>
          <form className="mb-8">{renderStep()}</form>
        </Form>

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
            Back
          </button>

          <button
            onClick={nextStep}
            disabled={currentStep === Steps.length - 1}
            className={`flex items-center px-6 py-3 rounded-lg transition-colors ${
              currentStep === Steps.length - 1
                ? "text-gray-400 cursor-not-allowed"
                : "bg-red-500 text-white hover:bg-red-600"
            }`}
          >
            Continue to {Steps[currentStep + 1]?.label}
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyListingFlow;
