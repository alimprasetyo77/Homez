import { ArrowLeft, ArrowRight } from "lucide-react";
import VerifyForm from "@/components/forms/property/verify-form";
import DetailForm from "@/components/forms/property/detail-form";
import PricingForm from "@/components/forms/property/pricing-form";
import PhotosForm from "@/components/forms/property/photos-form";
import { DEFAULT_FORM_VALUES, STEP_VALIDATION_FIELDS, Steps } from "@/constants/property";
import StepIndicator from "@/components/step-indicator";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import {
  createPropertySchema,
  ICreateProperty,
  IUpdateProperty,
  updatePropertySchema,
} from "@/types/property-type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FaSpinner } from "react-icons/fa";
import { useEffect, useState } from "react";
import ReviewForm from "@/components/forms/property/review-form";
import { useProperty, useSaveProperty } from "@/hooks/use-properties";

const PropertyForm = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentStep = Number(searchParams.get("step")) || 1;
  const [isFormReady, setIsFormReady] = useState(false);
  const { propertyId } = useParams();
  const isEditMode = Boolean(propertyId);

  const { property } = useProperty(propertyId!);
  const { saveProperty } = useSaveProperty(propertyId, {
    onSuccess: () => {
      navigate("/dashboard/property");
      form.reset();
    },
  });

  const form = useForm<ICreateProperty | IUpdateProperty>({
    resolver: zodResolver(isEditMode ? updatePropertySchema : createPropertySchema),
    defaultValues: DEFAULT_FORM_VALUES,
  });

  useEffect(() => {
    if (isEditMode && property) {
      form.reset({
        ...property,
        photos: {
          main_photo: property.photos.main_photo,
          photo_1: property.photos.photo_1,
          photo_2: property.photos.photo_2,
          photo_3: property.photos.photo_3,
          photo_4: property.photos.photo_4,
        },
      });
      setIsFormReady(true);
    } else if (!isEditMode) {
      setIsFormReady(true);
    }
  }, [isEditMode, property]);

  const handleStepChange = (direction: "next" | "prev") => {
    const newStep = direction === "next" ? currentStep + 1 : currentStep - 1;
    setSearchParams({ step: String(newStep) });
  };

  const validateCurrentStep = async () => {
    const fieldsToValidate = STEP_VALIDATION_FIELDS[currentStep as keyof typeof STEP_VALIDATION_FIELDS];
    return await form.trigger(fieldsToValidate, { shouldFocus: true });
  };

  const handleNextStep = async () => {
    if (currentStep < Steps.length) {
      const isValid = await validateCurrentStep();
      if (!isValid) return;
      handleStepChange("next");
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      handleStepChange("prev");
    }
  };

  const handleSubmit = async (data: ICreateProperty | IUpdateProperty) => {
    try {
      await saveProperty(data);
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  const renderStepContent = () => {
    const stepComponents = {
      1: <VerifyForm />,
      2: <DetailForm />,
      3: <PricingForm />,
      4: <PhotosForm />,
      5: <ReviewForm />,
    };

    return stepComponents[currentStep as keyof typeof stepComponents] || <VerifyForm />;
  };

  if (!isFormReady) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <FaSpinner className="animate-spin text-red-500 text-2xl" />
      </div>
    );
  }

  return (
    <div className="min-h-screen font-sans py-16">
      <div className="max-w-6xl mx-auto px-4 ">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {isEditMode ? "Update" : "Listing"} Your Property
          </h1>
          <p className="text-gray-800 ">Complete the following steps to publish your property.</p>
        </div>

        <StepIndicator currentStep={currentStep} />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="mb-8 space-y-4">
            {renderStepContent()}
          </form>
        </Form>

        {/* Navigation */}
        <div className="flex justify-between items-center max-w-5xl mx-auto">
          {currentStep > 1 && (
            <Button
              variant={"secondary"}
              onClick={handlePrevStep}
              className={`flex items-center px-6 py-4 rounded-lg transition-colors cursor-pointer `}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          )}
          {currentStep < Steps.length && (
            <Button
              variant={"secondary"}
              onClick={handleNextStep}
              className={`flex items-center px-6 py-4 rounded-lg transition-colors cursor-pointer ml-auto `}
            >
              {`Continue to ${Steps[currentStep]?.label}`}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyForm;
