import React from "react";
import BackButton from "../_components/back-button";
import Image from "next/image";
import FoodCard from "../_components/card";

const SearchPage: React.FC = () => {
	return (
		<div className="flex flex-col items-center justify-start h-screen">
			<div className="w-full flex items-center justify-between p-4">
				<BackButton />
				<h1 className="text-3xl font-semibold">Profile</h1>
				<div style={{ width: 48 }}></div> {/* Spacer Div */}
			</div>
			<div className="w-full flex items-start">
				<span className="text-2xl font-semibold text-left pl-4">
					Clayton Midgley
				</span>
			</div>
			<div className="flex items-start p-4">
				<div className="mr-8">
					{" "}
					{/* Added margin-right to create space */}
					<h2 className="text-2xl">
						Score: <span className="text-green-500">12</span>
					</h2>
					<h3>7 Posts</h3>
					<h3>24 comments</h3>
					<h3>Flags:</h3>
					<ul className="text-xs list-disc pl-4">
						<li>Fructose</li>
						<li>Gluten</li>
					</ul>
				</div>
				<Image
					src="/profile-picture.jpg"
					alt="Profile Picture"
					width={200}
					height={200}
					className="rounded-lg"
				/>
			</div>

			{/* Spacer */}
			<div className="w-full h-4"></div>

			{/* Properly aligned 'Posts' text within a flex container */}
			<div className="flex items-start pl-4">
				<span className="text-xl font-semibold">Posts</span>
			</div>

			{/* Horizontal divider bar */}
			<div className="w-full h-1 bg-gray-200"></div>
			<p>No posts here...</p>
		</div>
	);
};

export default SearchPage;
