"use client";
import "./countryScroll.css";
import { useEffect, useRef, useState } from "react";

import { Globe, ChevronDown, Search } from "lucide-react";

import useCountries from "@/hooks/useCountries";

const CountrySelect = ({ value, onChange }) => {
  const { countries, loading } = useCountries();

  const [open, setOpen] = useState(false);

  const [search, setSearch] = useState("");

  const dropdownRef = useRef(null);

  // Close Outside
  useEffect(() => {
    const handleOutside = (event) => {
      if (!dropdownRef.current?.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutside);

    return () => {
      document.removeEventListener("mousedown", handleOutside);
    };
  }, []);

  // Filter
  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* SELECT BUTTON */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full  border-b border-white/20 bg-transparent py-3   flex items-center justify-between text-white hover:border-white/20 transition-all"
      >
        <div className="flex items-center gap-3">
          <Globe size={18} className="text-gray-200" />

          <span className={value ? "text-gray-200" : "text-gray-300"}>
            {value || "Select Country"}
          </span>
        </div>

        <ChevronDown
          size={18}
          className={`text-gray-200 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* DROPDOWN */}
      {open && (
        <div className="absolute top-[65px] left-0 w-full bg-white border border-white/10 rounded shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          {/* SEARCH */}
          <div className="p-3 border-b border-white">
            <div className="flex items-center gap-2 bg-brand rounded px-3 h-[44px]">
              <Search size={16} className="text-gray-200" />

              <input
                type="text"
                placeholder="Search country..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent text-white outline-none placeholder:text-gray-200"
              />
            </div>
          </div>

          {/* OPTIONS */}
          <div className="max-h-[200px] overflow-y-auto  custom-scrollbar">
            {loading ? (
              <div className="p-4 text-gray-700 text-sm">
                Loading countries...
              </div>
            ) : filteredCountries.length > 0 ? (
              filteredCountries.map((country) => (
                <button
                  key={country._id}
                  type="button"
                  onClick={() => {
                    onChange({
                      target: {
                        value: country.name,
                      },
                    });

                    setOpen(false);
                  }}
                  className="w-full px-4 py-3 flex items-center justify-between text-left text-white hover:bg-brand/10 transition-all"
                >
                  <span className="text-gray-100 font-bold p-2 w-12 bg-brand rounded text-sm">
                    {country.code}
                  </span>
                  <span className="text-brand font-medium">{country.name}</span>
                </button>
              ))
            ) : (
              <div className="p-4 text-gray-500 text-sm">No country found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CountrySelect;
