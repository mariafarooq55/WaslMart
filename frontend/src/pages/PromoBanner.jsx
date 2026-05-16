import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const deals = [
  {
    title: "Modern Kitchen Appliances",
    desc: "Upgrade your kitchen with energy-efficient, compact, and powerful appliances designed to save time while delivering professional cooking results.",
    category: "Home Appliances",
    image:
      "https://powerhouseexpress.com.pk/cdn/shop/collections/kitchen-appliances.webp?v=1745918952",
    discount: 70,
    endTime: new Date(new Date().getTime() + 4 * 24 * 60 * 60 * 1000),
  },
  {
    title: "Nike Sneakers",
    desc: "Experience unmatched comfort, superior grip, and iconic style—perfect for workouts, casual wear, and everyday performance.",
    category: "Fashion",
    image:
      "https://file.aiquickdraw.com/imgcompressed/img/compressed_44909a2e5cf110ed53a486ffe779c7a8.webp",
    discount: 50,
    endTime: new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000),
  },
  {
    title: "Elegant Handbag",
    desc: "A premium handbag crafted for daily comfort and timeless elegance—perfect for work, travel, and casual outings.",
    category: "Fashion",
    image: "https://freepngimg.com/save/19711-women-bag-png-hd/699x691",
    discount: 60,
    endTime: new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000),
  },
  {
    title: "Heart-Shaped Bracelet",
    desc: "A beautifully designed heart bracelet that adds elegance and charm to every outfit.",
    category: "accessories",
    image:
      "https://png.pngtree.com/png-vector/20240721/ourmid/pngtree-3d-love-heart-pendant-link-chain-bracelet-elegant-hand-png-image_13163377.png",
    discount: 55,
    endTime: new Date(new Date().getTime() + 4 * 24 * 60 * 60 * 1000),
  },
];

const PromoBanner = () => {
  const [current, setCurrent] = useState(0);
  const [counter, setCounter] = useState(0);
  const [timeLeft, setTimeLeft] = useState({});

  // Auto slide
  useEffect(() => {
    const slide = setInterval(() => {
      setCurrent((prev) => (prev + 1) % deals.length);
    }, 5000);
    return () => clearInterval(slide);
  }, []);

  // Discount counter animation
  useEffect(() => {
    setCounter(0);
    const max = deals[current].discount;
    const count = setInterval(() => {
      setCounter((prev) => (prev < max ? prev + 1 : prev));
    }, 20);
    return () => clearInterval(count);
  }, [current]);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      const diff = deals[current].endTime - new Date();
      setTimeLeft({
        days: Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24))),
        hours: Math.max(0, Math.floor((diff / (1000 * 60 * 60)) % 24)),
        minutes: Math.max(0, Math.floor((diff / (1000 * 60)) % 60)),
        seconds: Math.max(0, Math.floor((diff / 1000) % 60)),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [current]);

  return (
    <section className="mt-16 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 py-16 px-4">
      {/* Marquee */}
      <div className="overflow-hidden whitespace-nowrap mb-8">
        <div className="animate-marquee text-white font-bold text-lg inline-block">
          🔥 Deals 2026 — Up to 70% OFF • Limited Stock • Shop Before It’s Gone
          🔥
        </div>
      </div>

      {/* Slider */}
      <div className="max-w-5xl mx-auto relative overflow-hidden rounded-2xl shadow-2xl bg-white">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {deals.map((deal, i) => (
            <div
              key={i}
              className="w-full flex-shrink-0 flex flex-col md:flex-row relative"
            >
              {/* Countdown box */}
              <div className="absolute left-0 top-24 bg-emerald-600 text-white p-4 rounded-tr-2xl rounded-br-2xl text-xs text-center shadow-lg">
                <p className="font-bold">Ends In</p>
                <p>
                  {timeLeft.days}d {timeLeft.hours}h
                </p>
                <p>
                  {timeLeft.minutes}m {timeLeft.seconds}s
                </p>
              </div>

              {/* Image */}
              <img
                src={deal.image}
                alt={deal.title}
                className="w-full md:w-1/2 h-64 md:h-80 object-contain"
              />

              {/* Content */}
              <div className="p-6 md:w-1/2 md:pl-20 flex flex-col justify-center">
                <span className="bg-emerald-100 text-emerald-600 px-3 py-1 rounded-full text-xs font-bold w-fit">
                  {deal.category}
                </span>

                <span className="mt-3 bg-emerald-600 text-white px-4 py-1 rounded-full font-bold w-fit animate-bounce">
                  {counter}% OFF
                </span>

                <h3 className="text-2xl font-bold mt-3">{deal.title}</h3>
                <p className="text-gray-600 mt-2">{deal.desc}</p>

                {/* Shop Now Button */}
                <Link
                  to="/products"
                  className="mt-4 inline-flex items-center justify-center 
             bg-gradient-to-r from-emerald-500 to-slate-600 
             text-white px-5 py-2 text-sm font-semibold 
             rounded-full shadow-md
             transition-all duration-300 ease-out
             hover:px-8 hover:shadow-xl hover:from-emerald-600 hover:to-slate-700"
                >
                  Shop Now →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 py-4">
          {deals.map((_, i) => (
            <span
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-3 h-3 rounded-full cursor-pointer ${
                current === i ? "bg-emerald-600" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Marquee Animation */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 14s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default PromoBanner;
