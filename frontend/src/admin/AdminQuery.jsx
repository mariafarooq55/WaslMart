import React from "react";
import Slidebar from "./Slidebar";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const AdminQuery = () => {
  const [query, setQuery] = useState([]);
  async function allQuery() {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/userallquery", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      if (response.ok) {
        setQuery(result.data);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error(error);
    }
  }
  useEffect(() => {
    allQuery();
  }, []);

  async function handleDelete(id) {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/querydelete/${id}`, {
        method: "Delete",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      if (response.ok) {
        toast.success(result.message);
        allQuery();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error(error);
    }
  }

  return (
    <div className="flex flex-col sm:flex-row mt-16">
      <Slidebar />
      <div className="flex-1 p-4 sm:p-6 lg:p-10 min-h-screen bg-slate-50 overflow-x-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-slate-700">
          Manage Queries
        </h1>
        <div className="overflow-x-auto">
          <table className="w-full text-xs sm:text-sm text-left text-slate-700">
            <thead className="text-xs bg-slate-200 text-slate-800">
              <tr>
                <th className="px-2 sm:px-4 py-2 sm:py-3">S.no</th>
                <th className="px-2 sm:px-4 py-2 sm:py-3">UserName</th>
                <th className="px-2 sm:px-4 py-2 sm:py-3">Query</th>
                <th className="px-2 sm:px-4 py-2 sm:py-3">Email</th>
                <th className="px-2 sm:px-4 py-2 sm:py-3">Status</th>
                <th className="px-2 sm:px-4 py-2 sm:py-3">Actions</th>
              </tr>
            </thead>
            {query.length === 0 ? (
              <tbody>
                <tr>
                  <td
                    colSpan="6"
                    className="text-center text-emerald-600 font-bold py-4"
                  >
                    No Queries here ...
                  </td>
                </tr>
              </tbody>
            ) : (
              query.map((item, index) => (
                <tbody key={index}>
                  <tr className="bg-white border-b border-gray-300 text-gray-800">
                    <td className="px-2 sm:px-4 py-2 sm:py-3">{index + 1}</td>
                    <td className="px-2 sm:px-4 py-2 sm:py-3 truncate">
                      {item.Name}
                    </td>
                    <td className="px-2 sm:px-4 py-2 sm:py-3 truncate">
                      {item.Query}
                    </td>
                    <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm truncate">
                      {item.Email}
                    </td>
                    <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs">
                      {item.QueryStatus}
                    </td>
                    <td className="px-2 sm:px-4 py-2 sm:py-3">
                      <div className="flex gap-2 flex-col sm:flex-row">
                        <Link to={`/admin/queryreply/${item._id}`}>
                          <button className="bg-blue-600 hover:bg-blue-700 px-2 sm:px-3 text-white py-1 sm:py-2 rounded text-xs w-full sm:w-auto">
                            Reply
                          </button>
                        </Link>
                        <button
                          onClick={() => {
                            handleDelete(item._id);
                          }}
                          className="bg-red-600 text-white hover:bg-red-700 px-2 sm:px-3 py-1 sm:py-2 rounded text-xs w-full sm:w-auto"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              ))
            )}
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminQuery;
