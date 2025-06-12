import { Button } from "@/components/ui/button";
import { StepAddNewProperty } from "@/constants/property";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";

const AddProperty = () => {
  const [step, setStep] = useState(1);
  const handleNextStep = () => {
    if (step == 5) return;
    setStep((prev) => prev + 1);
  };
  const handlePrevStep = () => {
    if (step == 1) return;
    setStep((prev) => prev - 1);
  };
  return (
    <div className="flex flex-col gap-y-6 items-center justify-center">
      <div className="bg-white rounded-xl max-w-7xl w-full p-4 shadow space-y-2">
        <h1 className="text-center font-semibold text-xl">For Listing Your Property</h1>
        <span className="text-xs font-semibold text-center block text-muted-foreground">
          Complete these steps to get your property listing.
        </span>
        <div className="space-y-4 max-w-5xl mx-auto my-8 ">
          <div className="h-3 rounded-full border overflow-hidden relative  ">
            <span
              className={`bg-red-500 h-10 w-[${
                step * 20
              }%]  absolute max-w-full transition-all duration-500 z-20`}
            ></span>
          </div>
          <div className=" grid grid-cols-5 place-items-center">
            {StepAddNewProperty.map((value) => (
              <div key={value.id} className="flex flex-col items-center gap-y-2 text-xs font-medium">
                <div
                  className={`size-3 ${step >= value.id ? "bg-red-500" : "bg-gray-200"} shadow rounded-full`}
                ></div>
                <span>{value.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl max-w-7xl w-full p-8 shadow space-y-2 min-h-96">
        <div className="flex items-center gap-x-4">
          <div className="size-14 bg-red-500 rounded-full flex items-center justify-center text-white font-semibold text-lg">
            1
          </div>
          <div>
            <h2 className="text-lg font-semibold">Property Verification</h2>
            <span className="text-muted-foreground text-sm">
              Let's verify your ownership and property details
            </span>
          </div>
        </div>
        <div id="content" className="h-52 flex items-center justify-center">
          Content
        </div>
        <div className="flex items-center justify-between gap-x-3">
          <Button variant={"outline"} className="flex items-center gap-x-2" onClick={() => handlePrevStep()}>
            <ArrowLeft />
            <span className="text-xs">Back</span>
          </Button>
          <Button variant={"outline"} className="flex items-center gap-x-2" onClick={() => handleNextStep()}>
            <span className="text-xs">{step === 5 ? "Preview" : "Continue to Details"}</span>
            <ArrowRight />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddProperty;
