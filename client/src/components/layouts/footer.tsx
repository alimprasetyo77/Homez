import { Copyright, SendIcon } from "lucide-react";
import { FaApple, FaFacebook, FaGooglePlay, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const Footer = () => {
  return (
    <div className="max-w-[1230px] pt-10 mx-auto flex flex-col justify-between">
      <div className="grid grid-cols-4 pb-10 gap-x-16">
        <div className="space-y-10 ">
          <img
            alt="Logo"
            loading="lazy"
            width="138"
            height="44"
            decoding="async"
            src="https://homez-appdir.vercel.app/images/header-logo2.svg"
            style={{ color: "transparent" }}
          />
          <div className="space-y-4">
            <span className="text-sm text-black/80">Address</span>
            <p className="text-black text-[15px] font-semibold leading-7">
              329 Queensberry Street, North Melbourne VIC 3051, Australia.{" "}
            </p>
          </div>
          <div className="space-y-4">
            <span className="text-sm text-black/80">Total Free Customer Care</span>
            <p className="text-black text-[15px] font-semibold">+(0) 123 050 945 02</p>
          </div>
          <div className="space-y-4">
            <span className="text-sm text-black/80">Need Live Support?</span>
            <p className="text-black text-[15px] font-semibold">hi@homez.com</p>
          </div>
        </div>
        <div className="space-y-12">
          <div className="flex flex-col gap-y-[25px]">
            <h3 className="text-[15px] font-semibold">Popular Search</h3>
            <ul className="space-y-4 text-sm *:hover:cursor-pointer *:hover:underline">
              <li>Apartment for Rent</li>
              <li>Apartment Low to Hide</li>
              <li>Offices for Buy</li>
              <li>Offices for Rent</li>
            </ul>
          </div>
          <div className="flex flex-col gap-y-[25px]">
            <h3 className="text-[15px] font-semibold">Discover</h3>
            <ul className="space-y-4 text-sm *:hover:cursor-pointer *:hover:underline">
              <li>Miami</li>
              <li>Los Angeles</li>
              <li>Chicago</li>
              <li>New York</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-y-[25px]">
          <h3 className="text-[15px] font-semibold">Quick Links</h3>
          <ul className="space-y-4 text-sm *:hover:cursor-pointer *:hover:underline">
            <li>Terms of Use</li>
            <li>Privacy Policy</li>
            <li>Pricing Plans</li>
            <li>Our Services</li>
            <li>Contact Support</li>
            <li>Careers</li>
            <li>FAQs</li>
          </ul>
        </div>
        <div className="space-y-10">
          <div className="flex flex-col gap-y-[25px]">
            <h3 className="text-[15px] font-semibold">Keep Yourself Up to Date</h3>
            <form className="border border-black/10 rounded-xl flex items-center px-4 py-2">
              <Input
                placeholder="Search"
                className="outline-none bg-transparent border-none focus-visible:border-none focus-visible:ring-0 p-0"
              />
              <Button className="rounded-full">
                <SendIcon />
              </Button>
            </form>
          </div>
          <div className="flex flex-col gap-y-[25px]">
            <h3 className="text-[15px] font-semibold">Apps</h3>
            <div className="flex flex-col gap-2">
              <Button className="h-auto flex items-center justify-start cursor-pointer">
                <FaApple className="size-6" />
                <div className="flex flex-col items-start justify-center ml-2">
                  <span className="text-xs text-white/75">Download on the</span>
                  <span className="text-[15px] font-semibold text-white">App Store</span>
                </div>
              </Button>
              <Button className="h-auto flex items-center justify-start cursor-pointer">
                <FaGooglePlay className="size-6" />
                <div className="flex flex-col items-start justify-center ml-2">
                  <span className="text-xs text-white/75">Get it on</span>
                  <span className="text-[15px] font-semibold text-white">Google Play</span>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between py-6 border-t border-black/10">
        <div className="flex items-center gap-x-2">
          <Copyright className="size-4" />
          <p className="text-sm">Homez 2024 ib-themes - All rights reserved</p>
        </div>
        <div className="flex items-center">
          <span className="font-medium text-sm">Follow us</span>
          <Button variant={"ghost"}>
            <FaFacebook />
          </Button>
          <Button variant={"ghost"}>
            <FaTwitter />
          </Button>
          <Button variant={"ghost"}>
            <FaInstagram />
          </Button>
          <Button variant={"ghost"}>
            <FaLinkedin />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
