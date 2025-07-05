const Hero = () => {
  return (
    <div
      className="min-h-[450px] flex items-center justify-center"
      style={{
        backgroundImage: `url("https://homez-appdir.vercel.app/_next/static/media/about-page-bg.cad1db94.jpg")`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="max-w-[76rem] space-y-4 w-full">
        <h2 className="font-semibold text-3xl">About Us</h2>
        <p className="text-sm">Home / About</p>
      </div>
    </div>
  );
};

export default Hero;
