import React from "react";
import Ingredient from "./ingredient";

type Ingredient = {
	ingredient: string;
    flags: string; //Json object of flags and boolean values
    name: string;
};


type IngredientListProps = {
	loading?: boolean; // Loading state of the card
	ingredients?: Ingredient[]; // Correct type for an array of ingredient objects
	flaggedIngredients?: Ingredient[]; // Correct type for an array of flagged ingredients
    unknownIngredients?: Ingredient[]; // Correct type for an array of unknown ingredients
};

const IngredientList: React.FC<IngredientListProps> = ({ ingredients, flaggedIngredients, unknownIngredients }) => {
if (!ingredients) return <p>Loading ingredients...</p>; // Handle loading or undefined state

return (
    <div>
        <ul className="list-disc">
            {(flaggedIngredients ?? []).map((item, index) => (
                <Ingredient key={index} ingredient={item.name} flag={true} /> // Pass the ingredient prop to the Ingredient component
            ))}
            {(unknownIngredients ?? []).map((item, index) => (
                <Ingredient key={index} ingredient={item.name} flag={false} unknown={true} /> // Pass the ingredient prop to the Ingredient component
            ))}
            {ingredients.map((item, index) => (
                <Ingredient key={index} ingredient={item.name} flag={false} /> // Pass the ingredient prop to the Ingredient component
            ))}
        </ul>
    </div>
);
};

export default IngredientList;
