import React from "react";
import Slidebar from "./Slidebar";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";

const QueryReply = () => {
  const [query, setQuery] = useState({ to: "", sub: "", body: "" });

  const { id } = useParams();
  const navigate = useNavigate();

  async function queryData() {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/querysingledata/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      if (response.ok) {
        setQuery({ to: result.data.Email });
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error(error);
    }
  }
  useEffect(() => {
    queryData();
  }, []);

  async function handleForm(e) {
    try {
      e.preventDefault();
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/mailreply/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(query),
      });
      const result = await response.json();
      if (response.ok) {
        toast.success(result.message);
        navigate("/admin/adminquery");
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
    <div className="flex flex-col sm:flex-row mt-16">
      <Slidebar />
      <div className="flex-1 p-4 sm:p-6 lg:p-10 min-h-screen bg-slate-50">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-slate-700">
          Reply to Query
        </h1>
        <button
          className="bg-slate-300 px-3 sm:px-4 py-2 rounded hover:bg-slate-400 text-sm sm:text-base mb-4"
          onClick={() => {
            navigate("/admin/adminquery");
          }}
        >
          Back
        </button>
        <div className="bg-white p-4 sm:p-6 rounded-md shadow-md max-w-3xl mx-auto space-y-4 sm:space-y-6">
          <form action="" onSubmit={handleForm}>
            <label
              htmlFor=""
              className="block mb-2 font-semibold text-base sm:text-lg text-gray-700"
            >
              To
            </label>
            <input
              type="text"
              name=""
              value={query.to}
              id=""
              className="w-full border border-slate-400 rounded-md px-3 sm:px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <label
              htmlFor=""
              className="block mb-2 font-semibold text-base sm:text-lg text-gray-700 mt-3 sm:mt-4"
            >
              From
            </label>
            <input
              type="text"
              name=""
              value={"mariyamemon224@gmail.com"}
              id=""
              className="w-full border border-slate-400 rounded-md px-3 sm:px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <label
              htmlFor=""
              className="block mb-2 font-semibold text-base sm:text-lg text-gray-700 mt-3 sm:mt-4"
            >
              Subject
            </label>
            <input
              type="text"
              name="sub"
              onChange={handleChange}
              value={query.sub}
              id=""
              className="w-full border border-slate-400 rounded-md px-3 sm:px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <label
              htmlFor=""
              className="block mb-2 font-semibold text-base sm:text-lg text-gray-700 mt-3 sm:mt-4"
            >
              Body
            </label>
            <textarea
              name="body"
              onChange={handleChange}
              value={query.body}
              id=""
              className="w-full border border-slate-400 rounded-md px-3 sm:px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 min-h-32 sm:min-h-40"
            ></textarea>
            <div className="text-right mt-4">
              <button className="bg-emerald-600 text-white px-4 sm:px-5 py-2 rounded hover:bg-emerald-700 text-sm sm:text-base">
                Reply
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default QueryReply;
