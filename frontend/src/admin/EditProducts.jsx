import React from "react";
import Slidebar from "./Slidebar";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useEffect } from "react";

const EditProducts = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [edit, setEdit] = useState({});

  async function editValueData() {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/editvaluedata/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      if (response.ok) {
        setEdit(result.data);
        console.log(result);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error(error);
    }
  }
  useEffect(() => {
    editValueData();
  }, []);

  async function handleForm(e) {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const formData = {
        Pname: edit.productName,
        Pdesc: edit.productDescription,
        Pprice: edit.productPrice,
        Cat: edit.productCategory,
        Pstatus: edit.productStatus,
      };

      const response = await fetch(`/api/productupdate/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
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
    setEdit({ ...edit, [e.target.name]: e.target.value });
  }

  return (
    <div className="flex flex-col sm:flex-row mt-16">
      <Slidebar />
      <div className="flex-1 p-4 sm:p-6 lg:p-10 min-h-screen bg-slate-50">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-slate-700">
          Update Product
        </h1>
        <button
          className="bg-gray-300 px-3 sm:px-4 py-2 rounded hover:bg-gray-400 text-sm sm:text-base mb-4"
          onClick={() => {
            navigate("/admin/adminproduct");
          }}
        >
          Back
        </button>
        <form
          action=""
          onSubmit={handleForm}
          className="bg-white shadow-md rounded-xl p-4 sm:p-6 max-w-3xl mx-auto space-y-4 sm:space-y-6"
        >
          <label
            htmlFor=""
            className="block mb-2 text-base sm:text-lg font-medium text-gray-700"
          >
            Product Name
          </label>
          <input
            type="text"
            name="productName"
            value={edit.productName}
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
            name="productDescription"
            value={edit.productDescription}
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
            value={edit.productPrice}
            onChange={handleChange}
            name="productPrice"
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
            name="productCategory"
            onChange={handleChange}
            value={edit.productCategory}
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
            className="block text-base sm:text-lg mb-2 font-medium text-gray-700"
          >
            Status
          </label>
          <select
            name="productStatus"
            value={edit.productStatus}
            onChange={handleChange}
            id=""
            className="border border-slate-400 px-3 sm:px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded w-full"
          >
            <option value="">---Select---</option>
            <option value="In-Stock">In-Stock</option>
            <option value="Out-Of-Stock">Out-Of-Stock</option>
          </select>
          <div className="text-right">
            <button className="bg-emerald-600 text-white px-3 sm:px-4 py-2 rounded hover:bg-emerald-700 text-sm sm:text-base">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProducts;
