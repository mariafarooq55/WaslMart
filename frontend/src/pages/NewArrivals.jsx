import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  async function fetchNewArrivals() {
    try {
      const response = await fetch("/api/userproducts?category=All");
      const record = await response.json();
      // Assuming newer products have higher _id, sort descending
      const sortedProducts = record.data.sort((a, b) =>
        b._id.localeCompare(a._id),
      );
      // Take first 8 or so
      setProducts(sortedProducts.slice(0, 8));
    } catch (error) {
      toast.error("Failed to load new arrivals");
    }
  }

  useEffect(() => {
    fetchNewArrivals();
  }, []);

  return (
    <section className="py-6 mt-20 overflow-hidden bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800">
      {/* Heading */}
      <h2 className="text-center text-xl sm:text-2xl md:text-3xl font-bold text-emerald-400 mb-8">
        New Arrivals
      </h2>

      {/* Marquee Wrapper */}
      <div className="relative w-full overflow-hidden">
        {/* Moving Row */}
        <div className="flex w-max animate-marqueeReverse gap-4 sm:gap-6 md:gap-8">
          {/* Duplicate list for infinite loop */}
          {[...products, ...products].map((item, index) => (
            <div
              key={`${item._id}-${index}`}
              onClick={() => navigate(`/product/${item._id}`)}
              className="cursor-pointer bg-gradient-to-br from-emerald-500 to-slate-600 p-3 sm:p-4 rounded-2xl shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl min-w-[180px] sm:min-w-[200px]"
            >
              <div className="bg-white p-2 rounded-lg mb-2">
                <img
                  src={`/uploads/${item.productImage}`}
                  alt={item.productName}
                  className="w-full h-32 object-contain"
                />
              </div>
              <h3 className="text-sm font-semibold text-gray-100 mb-1 truncate">
                {item.productName}
              </h3>
              <p className="text-xs text-gray-300">Rs {item.productPrice}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
