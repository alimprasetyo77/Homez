import { Steps } from "@/constants/property";
interface IStepIndicator {
  currentStep: number;
}

const StepIndicator = ({ currentStep }: IStepIndicator) => {
  return (
    <div className="flex justify-center mb-8">
      <div className="flex items-center space-x-4">
        {Steps.map((step, index) => {
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
              {index < Steps.length - 1 && (
                <div className={`w-12 h-0.5 ml-4 ${isCompleted ? "bg-green-500" : "bg-gray-300"}`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepIndicator;
