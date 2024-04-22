"use client"

import React, { useState } from "react";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import Link from "next/link";

const SearchBar: React.FC = () => {
    const [inputValue, setInputValue] = useState("");

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleInputSubmit = () => {
        if (inputValue.trim()) {
            // Here, handle the search logic or redirect, etc.
            console.log("Input submitted:", inputValue);
            // Redirect or fetch data based on inputValue, for example:
            // router.push(`/search?query=${inputValue}`);
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            handleInputSubmit();
            event.currentTarget.blur(); // Optionally blur the input after submit
        }
    };

    const handleBlur = () => {
        // You can also handle submit on mobile when keyboard closes if no 'Enter' is detected
        handleInputSubmit();
    };

    return (
        <div className="flex items-center justify-center">
            <input
                type="text"
                placeholder="Search..."
                className="px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onBlur={handleBlur} // Triggered when input loses focus
            />
            <button
                type="button"
                className="ml-2 px-4 py-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <Link href="/camera">
                    <CameraAltOutlinedIcon />
                </Link>
            </button>
        </div>
    );
};

export default SearchBar;
