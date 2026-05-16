import React, { useEffect, useState } from "react";
import Category from "../pages/Category";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Product = () => {
  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState("All");
  const navigate = useNavigate();

  async function productData(selectCategory = "All") {
    try {
      const response = await fetch(
        `/api/userproducts?category=${selectCategory}`,
      );
      const record = await response.json();
      setProduct(record.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to load products");
    }
  }

  useEffect(() => {
    productData(category);
  }, [category]);

  return (
    <div className="max-w-7xl mt-16 mx-auto px-6 py-28">
      <Category onSelectCat={setCategory} />

      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-emerald-600 text-center mb-6">
        Products
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {product.map((item) => (
          <div
            key={item._id}
            onClick={() => navigate(`/product/${item._id}`)}
            className="cursor-pointer border rounded-lg p-4 hover:shadow-lg transition"
          >
            <img
              src={`/uploads/${item.productImage}`}
              alt={item.productName}
              className="w-full h-48 object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
