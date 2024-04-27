import React from "react";
import Ingredient from "./ingredient";

type Ingredient = {
    ingredient: string;
};

type IngredientListProps = {
    loading?: boolean; // Loading state of the card
    ingredients?: Ingredient[]; // Correct type for an array of ingredient objects
};

const IngredientList: React.FC<IngredientListProps> = ({
    ingredients,
}) => {
    if (!ingredients) return <p>Loading ingredients...</p>; // Handle loading or undefined state

    return (
        <div>
            <ul>
                {ingredients.map((item, index) => (
                    <Ingredient key={index} ingredient={item.ingredient} flag={true} /> // Pass the ingredient prop to the Ingredient component
                ))}
            </ul>
        </div>
    );
};

export default IngredientList;
