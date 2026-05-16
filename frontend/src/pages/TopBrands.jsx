import React from "react";

const brands = [
  {
    name: "Nike",
    logo: "https://images.seeklogo.com/logo-png/9/1/nike-logo-png_seeklogo-99478.png",
  },
  {
    name: "Adidas",
    logo: "https://images.seeklogo.com/logo-png/48/1/adidas-logo-png_seeklogo-483084.png",
  },
  { name: "Apple", logo: "https://pngimg.com/d/apple_logo_PNG19688.png" },
  {
    name: "Samsung",
    logo: "https://www.freepnglogos.com/uploads/original-samsung-logo-10.png",
  },
  {
    name: "Puma",
    logo: "https://www.step.org.uk/app/uploads/2018/07/Puma-logo-PNG-Transparent-Background.png",
  },
  {
    name: "Sony",
    logo: "https://images.seeklogo.com/logo-png/12/1/sony-logo-png_seeklogo-129420.png",
  },
  {
    name: "Huawei",
    logo: "https://logos-world.net/wp-content/uploads/2020/05/Huawei-Logo-2006.png",
  },
  {
    name: "Xiaomi",
    logo: "https://images.seeklogo.com/logo-png/40/2/xiaomi-new-2021-logo-png_seeklogo-400999.png",
  },
];

const TopBrands = () => {
  return (
    <section className="py-6 mt-20 overflow-hidden">
      {/* Heading */}
      <h2 className="text-center text-xl sm:text-2xl md:text-3xl font-bold text-emerald-400 mb-8">
        Trusted by Top Brands
      </h2>

      {/* Marquee Wrapper */}
      <div className="relative w-full overflow-hidden">
        {/* Moving Row */}
        <div className="flex w-max animate-marqueeReverse gap-16">
          {/* Duplicate list for infinite loop */}
          {[...brands, ...brands].map((brand, index) => (
            <img
              key={index}
              src={brand.logo}
              alt={brand.name}
              className="
                h-12 sm:h-14 md:h-16
                object-contain
                opacity-80 hover:opacity-100
                transition duration-300
              "
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopBrands;
