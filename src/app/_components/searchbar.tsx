import React from "react";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import Link from "next/link";

const SearchBar: React.FC = () => {
	return (
		<div className="flex items-center justify-center">
			<input
				type="text"
				placeholder="Search..."
				className="px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
