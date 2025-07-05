import { Wallet } from "lucide-react";
import { MdVilla } from "react-icons/md";

const SecondSectionAbout = () => {
  return (
    <div className="py-20">
      <div className="max-w-[76rem] mx-auto grid grid-cols-2 gap-16">
        <h1 className="text-2xl font-semibold">We're on a Mission to Change View of Real Estate Field.</h1>
        <div className="space-y-16">
          <div className="space-y-4 *:leading-relaxed text-[15px]">
            <p>
              It doesn’t matter how organized you are — a surplus of toys will always ensure your house is a
              mess waiting to happen. Fortunately, getting kids on board with the idea of ditching their stuff
              is a lot easier than it sounds.
            </p>
            <p>
              Maecenas quis viverra metus, et efficitur ligula. Nam congue augue et ex congue, sed luctus
              lectus congue. Integer convallis condimentum sem. Duis elementum tortor eget condimentum tempor.
              Praesent sollicitudin lectus ut pharetra pulvinar.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-16">
            <div className="space-y-2">
              <div className="size-[70px] bg-gray-100 rounded-full flex items-center justify-center">
                <MdVilla className="size-6" />
              </div>
              <h4 className="font-semibold">Modern Villa</h4>
              <p className="text-[15px]">Nullam sollicitudin blandit Nullam maximus.</p>
            </div>
            <div className="space-y-2">
              <div className="size-[70px] bg-gray-100 rounded-full flex items-center justify-center">
                <Wallet className="size-6" />
              </div>
              <h4 className="font-semibold">Secure Payment</h4>
              <p className="text-[15px]">Nullam sollicitudin blandit Nullam maximus.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecondSectionAbout;
