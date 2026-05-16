import React from "react";
import Slidebar from "./Slidebar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-hot-toast";

const AddProducts = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    Pname: "",
    Pdesc: "",
    Price: "",
    Cat: "",
  });
  const [Pimage, setPimage] = useState("");

  async function handleForm(e) {
    e.preventDefault();
    const formallData = new FormData();
    formallData.append("Pname", product.Pname);
    formallData.append("Pdesc", product.Pdesc);
    formallData.append("Price", product.Price);
    formallData.append("Cat", product.Cat);
    formallData.append("image", Pimage);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/addadminproduct", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formallData,
      });
      const record = await response.json();
      if (response.ok) {
        toast.success(record.message);
        navigate("/admin/adminproduct");
      } else {
        toast.error(record.message);
      }
    } catch (error) {
      toast.error(error);
    }
  }

  function handleChange(e) {
    setProduct({ ...product, [e.target.name]: e.target.value });
  }
  return (
    <div className="flex flex-col sm:flex-row mt-16">
      <Slidebar />
      <div className="flex-1 p-4 sm:p-6 lg:p-10 min-h-screen bg-slate-50">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-slate-700">
          Add Products
        </h1>
        <button
          className="bg-slate-300 px-3 sm:px-4 py-2 rounded hover:bg-slate-400 text-sm sm:text-base"
          onClick={() => {
            navigate("/admin/adminproduct");
          }}
        >
          Back
        </button>
        <form
          action=""
          enctype="multipart/form-data"
          onSubmit={handleForm}
          className="bg-white shadow-md rounded-xl p-4 sm:p-6 max-w-3xl mx-auto space-y-4 sm:space-y-6 mt-4"
        >
          <label
            htmlFor=""
            className="block mb-2 text-base sm:text-lg font-medium text-gray-700"
          >
            Product Name
          </label>
          <input
            type="text"
            name="Pname"
            value={product.Pname}
            onChange={handleChange}
            id=""
            className="border border-slate-400 px-3 sm:px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded w-full"
          />
          <label
            htmlFor=""
            className="block mb-2 text-base sm:text-lg font-medium text-gray-700"
          >
            Product Description
          </label>
          <input
            type="text"
            name="Pdesc"
            value={product.Pdesc}
            onChange={handleChange}
            id=""
            className="border border-slate-400 px-3 sm:px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded w-full"
          />
          <label
            htmlFor=""
            className="block mb-2 text-base sm:text-lg font-medium text-gray-700"
          >
            Price
          </label>
          <input
            type="number"
            name="Price"
            value={product.Price}
            onChange={handleChange}
            id=""
            className="border border-slate-400 px-3 sm:px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded w-full"
          />

          <label
            htmlFor=""
            className="block text-base sm:text-lg mb-2 font-medium text-gray-700"
          >
            Categories
          </label>
          <select
            name="Cat"
            value={product.Cat}
            onChange={handleChange}
            id=""
            className="border border-slate-400 px-3 sm:px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded w-full"
          >
            <option value="">---Select---</option>
            <option value="home">Home</option>
            <option value="toys">Toys</option>
            <option value="fresh">Fresh</option>
            <option value="electronics">Electronics</option>
            <option value="mobile">Mobile</option>
            <option value="fashion">Fashion</option>
            <option value="accessories">Accessories</option>
            <option value="clothes">Clothes</option>
          </select>

          <label
            htmlFor=""
            className="block mb-2 text-base sm:text-lg font-medium text-gray-700"
          >
            Product Image
          </label>
          <input
            type="file"
            name="image"
            onChange={(e) => {
              setPimage(e.target.files[0]);
            }}
            id=""
            className="border border-slate-400 px-3 sm:px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded w-full"
          />
          <div className="text-right">
            <button className="bg-emerald-600 text-white px-3 sm:px-4 py-2 rounded hover:bg-emerald-700 text-sm sm:text-base">
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProducts;
