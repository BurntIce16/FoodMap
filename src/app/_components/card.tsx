import React from "react";
import Link from "next/link";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";

// Define a type for the component props
type FoodCardProps = {
	loading?: boolean; // Loading state of the card
	foodName?: string; // Name of the food
	foodId?: string; // ID of the food
	imageUrl?: string; // URL of the image
	clickable?: boolean; // Indicates if the card is clickable
	flagged?: boolean; // Indicates if the food is flagged as potentially harmful
};

// Skeleton loader component
const SkeletonLoader = () => {
	return (
		<div className="animate-pulse flex flex-col">
			<div className="relative w-64 h-80 bg-gray-300">
				<div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-gray-400 to-transparent">
					<div className="p-4">
						<div className="h-6 bg-gray-300 rounded"></div>
						<div className="mt-2 h-4 bg-gray-300 rounded w-1/2"></div>
					</div>
				</div>
			</div>
		</div>
	);
};

// FoodCard component using the defined props
const FoodCard: React.FC<FoodCardProps> = ({
	loading,
	foodName,
	foodId,
	imageUrl,
	clickable,
	flagged,
}) => {
	if (loading) {
		return <SkeletonLoader />;
	}

	const cardContent = (
		<div
			className="relative w-64 h-80 overflow-hidden"
			style={{ cursor: clickable ? "pointer" : "default" }}
		>
			<img
				className="w-full h-full object-cover"
				src={imageUrl}
				alt={foodName}
			/>
			<div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black to-transparent p-4 z-10">
				<h2 className="text-white text-lg font-bold">{foodName}</h2>
				{flagged && (
					<WarningAmberRoundedIcon
						style={{ color: "red", position: "absolute", top: 10, right: 10 }}
					/>
				)}
			</div>
		</div>
	);

	return clickable ? (
		<Link href={`/item/${foodId}`} style={{ cursor: "pointer" }}>
			{cardContent}
		</Link>
	) : (
		cardContent
	);
};

export default FoodCard;
