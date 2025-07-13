import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../context/Search";
import api from "../utils/api";

const SearchInput = () => {
  const [value, setValue] = useState("");
  const [searchState, setSearchState] = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await api.get(`/api/v1/product/search/${value}`);
      setSearchState({
        keyword: value,
        results: data.products || [],
      });
      navigate("/search");
    } catch (error) {
      console.error("Search failed", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-48 md:w-64">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search..."
        className="w-full pl-9 pr-4 py-1 text-sm text-gray-800 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      {/* Icon inside input */}
      <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none text-gray-400">
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
    </form>
  );
};

export default SearchInput;
