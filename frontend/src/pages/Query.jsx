import React from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
const Query = () => {
  const [query, setQuery] = useState({
    userName: "",
    userEmail: "",
    userQuery: "",
  });

  async function handleForm(e) {
    try {
      e.preventDefault();
      const response = await fetch("/api/userquery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(query),
      });
      const result = await response.json();
      if (response.ok) {
        toast.success(result.message);
        setQuery({
          userName: "",
          userEmail: "",
          userQuery: "",
        });
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error(error);
    }
  }

  function handleChange(e) {
    setQuery({ ...query, [e.target.name]: e.target.value });
  }

  return (
    <div className="max-w-7xl mx-auto p-6 bg-slate-50 mt-24 rounded-xl shadow-2xl">
      <h2 className="text-3xl font-bold text-emerald-600 text-center mb-4">
        Query Form
      </h2>
      <form action="" onSubmit={handleForm}>
        <label className="block text-gray-700 font-medium mb-2" htmlFor="">
          Your Name
        </label>
        <input
          className="w-full border border-slate-400 rounded-xl px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          type="text"
          name="userName"
          value={query.userName}
          onChange={handleChange}
          id=""
          placeholder="Enter your name..."
        />
        <label className="block text-gray-700 font-medium mb-2" htmlFor="">
          Your Email
        </label>
        <input
          className="w-full border border-slate-400 rounded-xl px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          type="email"
          name="userEmail"
          value={query.userEmail}
          onChange={handleChange}
          id=""
          placeholder="Enter your email..."
        />
        <label className="block text-gray-700 font-medium mb-2" htmlFor="">
          Your Query
        </label>
        <textarea
          className="w-full border border-slate-400 rounded-xl px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          name="userQuery"
          value={query.userQuery}
          onChange={handleChange}
          id=""
          placeholder="Enter your query here..."
        ></textarea>
        <button className="mt-3 w-full bg-gradient-to-r from-emerald-500 to-slate-600 text-white px-4 py-2 rounded-full hover:from-emerald-600 hover:to-slate-700 transition-all">
          Submit Query
        </button>
      </form>
    </div>
  );
};

export default Query;
