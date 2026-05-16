import React from "react";
import {
  FaShoppingBag,
  FaHome,
  FaGamepad,
  FaLaptop,
  FaMobile,
} from "react-icons/fa";
import { CiCoffeeCup, CiFaceSmile, CiApple } from "react-icons/ci";
import { GiClothes } from "react-icons/gi";
import { GiJewelCrown } from "react-icons/gi";

const Category = ({ onSelectCat }) => {
  const categories = [
    { name: "All", icon: <FaShoppingBag /> },
    { name: "home", icon: <FaHome /> },
    { name: "toys", icon: <FaGamepad /> },
    { name: "fresh", icon: <CiApple /> },
    { name: "electronics", icon: <FaLaptop /> },
    { name: "mobile", icon: <FaMobile /> },
    { name: "fashion", icon: <CiFaceSmile /> },
    { name: "accessories", icon: <GiJewelCrown /> },
    { name: "clothes", icon: <GiClothes /> },
  ];

  return (
    <div className="w-full">
      <div className="max-w-7xl mb-4 mx-auto px-4">
        <div className="flex sm:justify-center overflow-x-auto">
          {categories.map((cat, index) => (
            <div
              key={index}
              onClick={() => {
                onSelectCat(cat.name);
              }}
              className="flex flex-col items-center min-w-[80px] text-sm text-gray-800 hover:text-emerald-500 cursor-pointer"
            >
              <div className="text-2xl mb-1">{cat.icon}</div>
              <div className="text-center capitalize">
                {cat.name.replace("-", " ")}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
