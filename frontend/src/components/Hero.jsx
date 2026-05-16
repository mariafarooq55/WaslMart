import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Multiple slider images
const sliderImages = [
  "https://www.dennemeyer.com/fileadmin/a/blog/Everyday_IP_Spreading_the_word_about_mobile_phones/Everyday-IP_Spreading-the-word-about-mobile-phones_12.jpg",
  "https://cdn.shopify.com/s/files/1/0576/9579/7455/files/Some_Makeup_Products_That_You_Should_Always_Have_With_You_4e0e5322-37d4-4a1e-ba34-a302b6fdbf38.jpg?v=1686757673",
  "https://powerhouseexpress.com.pk/cdn/shop/collections/kitchen-appliances.webp?v=1745918952",
  "https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/peripherals/output-devices/dell/snp-category-imagery/gaming-accessories/dell-snp-gaming-cat-all-gaming-accessories-aw620m-aw920k-aw720h-800x620-right.png?fmt=png-alpha&wid=800&hei=620",
];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % sliderImages.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? sliderImages.length - 1 : prev - 1));
  };

  useEffect(() => {
    const auto = setInterval(nextSlide, 4500);
    return () => clearInterval(auto);
  }, []);

  return (
    <section className="w-full mt-20  relative overflow-hidden">
      {/* Background slider images */}
      <div className="relative h-[70vh] sm:h-[80vh] w-full">
        {sliderImages.map((img, index) => (
          <img
            key={index}
            src={img}
            alt="Slider"
            className={`
              absolute inset-0 w-full h-full object-contain transition-all duration-700
              ${
                index === current
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-105"
              }
            `}
          />
        ))}

        {/* Dark overlay for contrast */}
        <div className="absolute inset-0 border bg-black/5 z-10" />

        {/* Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2  p-2 bg-gradient-to-r from-slate-800 via-emerald-600 to-emerald-500 rounded-full text-white hover:from-slate-700 hover:via-emerald-500 transition z-30"
        >
          <ChevronLeft size={32} />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-gradient-to-r from-slate-800 via-emerald-600 to-emerald-500 p-2 rounded-full text-white hover:from-slate-700 hover:via-emerald-500 transition z-30"
        >
          <ChevronRight size={32} />
        </button>

        {/* Text Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white space-y-4 z-20">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold drop-shadow-lg">
            Upgrade Your Everyday Living
            <br />
            <span className="text-emerald-400">One Quality Find at a Time</span>
          </h1>

          <p className="text-lg max-w-2xl drop-shadow-lg">
            Explore curated products that make your daily life more comfortable,
            stylish, and efficient.
          </p>

          <Link to="/products">
            <button className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-slate-600 text-white rounded-full font-semibold shadow hover:from-emerald-600 hover:to-slate-700 transition">
              Shop Now
            </button>
          </Link>

          <p className="text-sm opacity-80 mt-4">
            Trusted by thousands • Fast delivery • Quality guaranteed
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
