import React from "react";
import BackButton from "../_components/back-button";


const SearchPage: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-start h-screen">
			<div className="w-full flex items-center justify-between p-4">
				<BackButton />
				<h1 className="text-3xl font-semibold">Profile</h1>
				<div style={{ width: 48 }}></div>{" "}
				{/* Spacer div to balance the layout */}
			</div>
			<p>Hi :)</p>
		</div>
    );
};

export default SearchPage;