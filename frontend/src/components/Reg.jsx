import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-hot-toast";

const Reg = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ fname: "", email: "", pass: "" });

  async function handleForm(e) {
    e.preventDefault();
    try {
      const response = await fetch("/api/regdata", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = await response.json();
      if (response.ok) {
        toast.success(result.message);
        navigate("/login");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error(error);
    }
  }
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="fixed inset-0 bg-black bg-opacity-45 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg relative">
        <button
          onClick={() => navigate("/")}
          className="absolute top-3 right-3 text-gray-700 hover:text-red-600 text-xl"
        >
          <IoIosCloseCircleOutline />
        </button>
        <h2 className="text-2xl font-bold mb-4 text-emerald-600 text-center">
          Create an Account..
        </h2>
        <form action="" onSubmit={handleForm}>
          <label className="block text-sm text-gray-700 mb-2" htmlFor="">
            Full Name
          </label>
          <input
            className="w-full px-4 py-2 border border-slate-400 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            type="text"
            name="fname"
            value={form.fname}
            id=""
            onChange={handleChange}
            placeholder="Enter your full name..."
          />
          <label className="block text-sm text-gray-700 mb-2" htmlFor="">
            Email
          </label>
          <input
            className="w-full px-4 py-2 border border-slate-400 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            type="text"
            name="email"
            value={form.email}
            id=""
            onChange={handleChange}
            placeholder="Enter your email..."
          />
          <label className="block text-sm text-gray-700 mb-2" htmlFor="">
            Password
          </label>
          <div className="relative">
            <input
              className="w-full px-4 py-2 border border-slate-400 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              type={showPassword ? "password" : "text"}
              name="pass"
              value={form.pass}
              id=""
              onChange={handleChange}
              placeholder="Enter your password..."
            />
            <button
              className="absolute top-3 right-3 hover:text-emerald-700"
              type="button"
              onClick={() => {
                setShowPassword(!showPassword);
              }}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <button className="w-full bg-gradient-to-r from-emerald-500 to-slate-600 text-white py-2 rounded-full hover:from-emerald-600 hover:to-slate-700 font-semibold">
            Register
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?
          <Link to={"/login"} className="text-emerald-500 hover:underline">
            {" "}
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Reg;
