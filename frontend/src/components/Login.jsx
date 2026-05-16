import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();

  const [login, setLogin] = useState({
    loginEmail: "",
    loginPass: "",
    loginRole: "user",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleForm = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/loginuser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(login),
      });

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem("token", result.token);
        localStorage.setItem("role", result.data.role);
        localStorage.setItem("userName", result.data.userName);

        if (result.data.role === "admin") {
          toast.success("Welcome Admin");
          navigate("/admin/dashboard");
        } else {
          toast.success("Login successful");
          navigate("/");
        }
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

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
          Login to Continue..
        </h2>

        <form onSubmit={handleForm}>
          {/* EMAIL */}
          <label className="block text-sm text-gray-700 mb-2">Email</label>
          <input
            className="w-full px-4 py-2 border border-slate-400 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            type="text"
            name="loginEmail"
            value={login.loginEmail}
            onChange={handleChange}
            placeholder="Enter your email..."
          />

          {/* PASSWORD */}
          <label className="block text-sm text-gray-700 mb-2">Password</label>
          <div className="relative">
            <input
              className="w-full px-4 py-2 border border-slate-400 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              type={showPassword ? "password" : "text"}
              name="loginPass"
              value={login.loginPass}
              onChange={handleChange}
              placeholder="Enter your password..."
            />
            <button
              className="absolute top-3 right-3 hover:text-emerald-700"
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* ROLE */}
          <label className="block text-sm text-gray-700 mb-2">Login As</label>
          <select
            className="w-full px-4 py-2 border border-slate-400 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            name="loginRole"
            value={login.loginRole}
            onChange={handleChange}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <button className="w-full bg-gradient-to-r from-emerald-500 to-slate-600 text-white py-2 rounded-full hover:from-emerald-600 hover:to-slate-700 font-semibold">
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?
          <Link to="/reg" className="text-emerald-500 hover:underline">
            {" "}
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
