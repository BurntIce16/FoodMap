import React from "react";
import Link from "next/link";

// Define a type for the component props
type FoodCardProps = {
    loading?: boolean; // Loading state of the card
	foodName?: string; // Name of the food
	foodId?: string; // ID of the food
	imageUrl?: string; // URL of the image (added flexibility for image source)
};



const SkeletonLoader = () => {
	return (
		<div className="animate-pulse flex flex-col">
			<div className="w-64 h-80 bg-gray-300" />
			<div className="space-y-2 mt-2 px-4">
				<div className="h-6 bg-gray-300 rounded"></div>
				<div className="h-4 bg-gray-300 rounded w-1/2"></div>
			</div>
		</div>
	);
};


// Use the defined props type
const FoodCard: React.FC<FoodCardProps> = ({ loading, foodName, foodId, imageUrl }) => {

    if (loading) {
		return <SkeletonLoader />;
	}


	return (
		<Link href={`/item/${foodId}`}>
			<div className="relative w-64 h-80 overflow-hidden">
				<img
					className="w-full h-full object-cover"
					src={imageUrl}
					alt={foodName}
				/>
				<div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black to-transparent p-4 z-10">
					{" "}
					{/* Added 'z-10' to ensure this div is above the image*/}
					<h2 className="text-white text-lg font-bold">{foodName}</h2>
					<p className="text-white">ID: {foodId}</p>
				</div>
			</div>
		</Link>
	);
};

export default FoodCard;
