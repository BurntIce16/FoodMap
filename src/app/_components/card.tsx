import React from 'react';

// Define a type for the component props
type FoodCardProps = {
    foodName: string;  // Name of the food
    foodId: string;    // ID of the food
    imageUrl: string;  // URL of the image (added flexibility for image source)
};

// Use the defined props type
const FoodCard: React.FC<FoodCardProps> = ({ foodName, foodId, imageUrl }) => {
    return (
        <div className="relative w-64 h-80">
            <img
                className="w-full h-full object-cover"
                src={imageUrl}  // Use imageUrl from props
                alt={foodName}  // Use foodName for alt text
            />
            <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black to-transparent p-4">
                <h2 className="text-white text-lg font-bold">{foodName}</h2>
                <p className="text-white">ID: {foodId}</p>
            </div>
        </div>
    );
};

export default FoodCard;
