import { ArrowLeft, ArrowRight, Check, CheckCircleIcon } from "lucide-react";
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
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { createProperty } from "@/services/property-service";
import { toast } from "sonner";
import PublishProperty from "@/components/modals/publish-property-modal";
import { FaSpinner } from "react-icons/fa";
import { useAuthStore } from "@/stores/auth-store";

const PropertyListingFlow = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const step = Number(searchParams.get("step"));
  const havePropertyPending = useAuthStore((state) =>
    state.user?.properties.some((property) => property.status === "pending")
  );

  const mutation = useMutation({
    mutationKey: ["properties"],
    mutationFn: createProperty,
    onSuccess: ({ message }) => {
      toast.success(message);
      setSearchParams((searchParams) => {
        searchParams.delete("step");
        return searchParams;
      });
    },
    onError: ({ message }) => {
      toast.error(message);
    },
  });

  const form = useForm<ICreateProperty>({
    resolver: zodResolver(createPropertySchema),
    mode: "onChange",
    defaultValues: {
      location: {
        address: "",
        city: "",
        state: "",
        country: "",
        postalCode: "",
        latitude: 0,
        longitude: 0,
      },

      amenities: [],

      isVerified: false,
      isFeatured: false,
    },
  });

  const nextStep = async () => {
    if (Number(step) < Steps.length) {
      const isValidForm = await checkValidForm(step == 0 ? 1 : step);
      if (!isValidForm) return;
      setStepParams("next");
    }
  };

  const prevStep = async () => {
    if (Number(step) > 1) {
      setStepParams("prev");
    }
  };

  const checkValidForm = (stepForm: number) => {
    type FieldNames = Parameters<typeof form.trigger>[0];
    const field: Record<number, FieldNames> = {
      1: ["type", "photoDocument"],
      2: ["title", "description", "location.address", "bedrooms", "bathrooms", "squareFeet", "amenities"],
      3: ["listingType", "price"],
      4: ["photos.main_photo", "photos.photo_1", "photos.photo_2", "photos.photo_3", "photos.photo_4"],
    };
    return form.trigger(field[stepForm], { shouldFocus: true });
  };

  const setStepParams = (type: "prev" | "next") => {
    setSearchParams((searchParams) => {
      if (step == 0) {
        searchParams.set("step", String(step + 2));
      } else {
        searchParams.set("step", String(type === "next" ? step + 1 : step - 1));
      }
      return searchParams;
    });
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

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Ringkasan Listing</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Jenis:</span>
                <span className="ml-2 text-gray-900 capitalize">{form.getValues("listingType") || "-"}</span>
              </div>
              <div>
                <span className="text-gray-600">Harga:</span>
                <span className="ml-2 text-gray-900">Rp {form.getValues("price") || "-"}</span>
              </div>
              <div>
                <span className="text-gray-600">Kamar:</span>
                <span className="ml-2 text-gray-900">{form.getValues("bathrooms") || "-"} KT</span>
              </div>
              <div>
                <span className="text-gray-600">Luas:</span>
                <span className="ml-2 text-gray-900">{form.getValues("squareFeet") || "-"} m²</span>
              </div>
            </div>
          </div>
          <PublishProperty
            onSubmit={form.handleSubmit((data) => {
              mutation.mutate(data);
            })}
          >
            <Button
              type="button"
              disabled={form.formState.isSubmitting}
              aria-disabled={form.formState.isSubmitting}
              className="w-full cursor-pointer  ml-auto bg-red-500 text-white h-10  rounded-lg hover:bg-red-600  flex items-center justify-center"
            >
              {form.formState.isLoading ? (
                <FaSpinner className="animate-spin duration-300" />
              ) : (
                <div className="flex items-center gap-x-2">Publish Listing</div>
              )}
            </Button>
          </PublishProperty>
        </div>
      </div>
    </div>
  );
  const renderStep = () => {
    switch (Number(step)) {
      case 1:
        return <VerifyForm />;
      case 2:
        return <DetailForm />;
      case 3:
        return <PricingForm />;
      case 4:
        return <PhotosForm />;
      case 5:
        return <ReviewsStep />;
      default:
        return <VerifyForm />;
    }
  };
  return (
    <div className="min-h-screen font-sans ">
      <div className="max-w-6xl mx-auto px-4 ">
        {havePropertyPending || (form.formState.isSubmitted && !form.formState.isSubmitting) ? (
          <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-6 mt-10">
            <div className="flex items-start gap-4">
              <div className="text-[#ef4f4f] text-3xl">
                <CheckCircleIcon className="h-8 w-8" />
              </div>
              <div className="flex-1 ">
                <h3 className="text-lg font-semibold text-[#ef4f4f] mb-1">Property Submitted Successfully</h3>
                <p className="text-sm text-gray-700">
                  Your property has been submitted and is now under review. Our team will verify the details
                  within 1–2 business days. Once approved, your listing will go live.
                </p>
                <div className="mt-4 flex gap-3">
                  <Link to={"/dashboard/property"}>
                    <Button variant={"animate"}>View My Listings</Button>
                  </Link>
                  <Link to={"/dashboard"}>
                    <Button variant={"outline"}>Go to Dashboard</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Listing Your Property</h1>
              <p className="text-gray-800 ">Complete the following steps to publish your property.</p>
            </div>

            <StepIndicator currentStep={step === 0 ? 1 : step} />

            <Form {...form}>
              <form className="mb-8 space-y-4">{renderStep()}</form>
            </Form>

            {/* Navigation */}
            <div className="flex justify-between items-center max-w-5xl mx-auto">
              <Button
                variant={"secondary"}
                onClick={prevStep}
                hidden={step <= 1}
                className={`flex items-center px-6 py-4 rounded-lg transition-colors cursor-pointer `}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>

              <Button
                variant={"secondary"}
                onClick={nextStep}
                hidden={step === Steps.length}
                className={`flex items-center px-6 py-4 rounded-lg transition-colors cursor-pointer ml-auto `}
              >
                {`Continue to ${Steps[step]?.label}`}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PropertyListingFlow;
