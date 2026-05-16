import React, { useState, useEffect } from "react";
import { FaTimesCircle } from "react-icons/fa";
import { toast } from "react-hot-toast";

const SearchData = ({ onClose }) => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (search.trim()) {
        fetch(`/api/search?q=${search}`)
          .then((res) => {
            return res.json();
          })
          .then((result) => {
            console.log(result);
            setSearchResult(result.data);
          })
          .catch((err) => {
            toast.error(err);
          });
      }
    }, 300);
    return () => clearTimeout(delayDebounce);
  }, [search]);

  return (
    <div className="fixed inset-0 bg-white z-[999] p-4 overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          name=""
          id=""
          placeholder="Search here..."
          autoFocus
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          className="flex-1 px-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />

        <button
          className="ml-3 text-xl text-gray-700 hover:text-red-600"
          onClick={() => {
            onClose(false);
          }}
        >
          <FaTimesCircle />
        </button>
      </div>

      {/* result */}
      <div className="mt-4 space-y-4">
        {searchResult.length > 0 ? (
          searchResult.map((items, index) => (
            <div
              className="flex justify-between items-center shadow-sm rounded-lg border  p-3"
              key={index}
            >
              <div>
                <img
                  src={`/uploads/${items.productImage}`}
                  alt=""
                  className="w-full h-32 object-contain rounded"
                />
                <h2 className="font-semibold">{items.productName}</h2>
                <p className="text-gray-600 text-sm">{items.productCategory}</p>
              </div>
              <p className="font-bold text-lg text-emerald-500">
                {items.productPrice} Rs
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-emerald-500 text-lg">
            No results found....
          </p>
        )}
      </div>
    </div>
  );
};

export default SearchData;
