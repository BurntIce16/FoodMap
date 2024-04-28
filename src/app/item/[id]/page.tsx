"use client";

import React, { useState, useEffect } from "react";
import IngredientList from "@/app/_components/ingredientList";
import BackButton from "@/app/_components/back-button";
import ScoreButton from "@/app/_components/score-button";
import FoodCard from "@/app/_components/card";
import SaveButton from "@/app/_components/save-button";
import supabase from "@/app/_components/supabase";
import { Container } from "postcss";

type FoodInfo = {
	id: number;
	name: string;
	ingredients: string;
	uploader: string;
	score: number;
};

type Sensitivity = {
	sensitivity: string;
};

type Ingredient = {
	name: string;
	flags: string; //Json object of flags and boolean values
};

//Itterate through the ingredients and check if the food ingredients contain any of the ingredients, if so add them to the recipieIngredients array and return it
function isolateRecipieIngredients(
	ingredients: Ingredient[],
	foodIngredients: string[]
): Ingredient[] {
	// Create a new array from foodIngredients that converts all entries to lower case for case-insensitive comparison
	let foodIngredientsArray = foodIngredients.map((item) =>
		item.ingredient.toLowerCase()
	);
	let recipieIngredients: Ingredient[] = [];

	ingredients.forEach((ingredient) => {
		// Check if the ingredient name in lower case is included in the foodIngredientsArray
		if (foodIngredientsArray.includes(ingredient.name.toLowerCase())) {
			recipieIngredients.push(ingredient);
		}
	});

	return recipieIngredients;
}

// Itterate through all ingredients and check if they contain any flaggs that the user has, if so add them to the flaggedIngredients array and return it
function highlightIngredients(
	ingredients: Ingredient[],
	sensitivities: Sensitivity[]
) {
	let flaggedIngredients: Ingredient[] = [];
	ingredients.forEach((ingredient: { flags: string; name: string }) => {
		try {
			let flags = ingredient.flags;
			sensitivities.forEach((sensitivity) => {
				if (flags[sensitivity.sensitivity]) {
					flaggedIngredients.push(ingredient);
				}
			});
		} catch (error) {
			console.error(
				"Error parsing flags for ingredient",
				ingredient.name,
				": ",
				error
			);
		}
	});
	return flaggedIngredients;
}

export default function Page({ params }: { params: { id: number } }) {
	const [food, setFood] = useState<FoodInfo | null>(null); //All foods have a name string, ingredient string, uploader string, and score number
	const [userSensitivities, setUserSensitivities] = useState<Sensitivity[]>([]); //All sensitivities have a sensitivity string
	const [ingredients, setIngredients] = useState<Ingredient[]>([]);
	const [flaggedIngredients, setFlaggedIngredients] = useState<Ingredient[]>(
		[]
	);

	useEffect(() => {
		const fetchData = async () => {
			// Fetch the food item by ID
			const { data: foodData, error: foodError } = await supabase
				.from("food_items")
				.select("*")
				.eq("id", params.id)
				.single();

			if (foodError) {
				console.error("Error fetching food item:", foodError.message);
				return;
			}

			setFood(foodData);

			// Now fetch ingredients and sensitivities in parallel if food is fetched successfully
			const ingredientPromise = supabase.from("ingredients").select("*");
			const userFlagsPromise = supabase.from("user_flags").select("*");

			try {
				const [ingredientResponse, userFlagsResponse] = await Promise.all([
					ingredientPromise,
					userFlagsPromise,
				]);

				if (ingredientResponse.error) {
					throw new Error(ingredientResponse.error.message);
				}

				if (userFlagsResponse.error) {
					throw new Error(userFlagsResponse.error.message);
				}

				if (foodData && foodData.ingredients) {
					const recipieIngredients = isolateRecipieIngredients(
						ingredientResponse.data,
						foodData.ingredients
					);
					setIngredients(recipieIngredients);
					setUserSensitivities(userFlagsResponse.data);

					const flaggedIngredients = highlightIngredients(
						recipieIngredients,
						userFlagsResponse.data
					);
					setFlaggedIngredients(flaggedIngredients);
				}
			} catch (error: any) {
				console.error("Error fetching data:", error.message);
			}
		};

		fetchData();
	}, [params.id]); // Only re-run the effect if params.id changes

	return (
		<main className="flex min-h-screen flex-col items-center justify-center pr-12 pl-12 pt-4">
			<div className="flex flex-row items-center justify-between w-full">
				<BackButton />
				<h1 className="text-4xl font-bold text-center line-clamp-1">Food Info</h1>
				{food && food.id && <SaveButton id={food.id} />}
			</div>


			<div className="w-full flex flex-col items-center gap-4">
				{food ? (
					<>
						<div className="flex flex-row justify-center items-center gap-4 w-full">
							<div className="flex-grow-2 flex-basis-2/3">
								<FoodCard
									foodName={food.name}
									foodId={food.id.toString()}
									imageUrl={`https://pvknashlqegmindzlzvm.supabase.co/storage/v1/object/public/food-images/${food.id}.webp`}
									clickable={false}
								/>
								<span className="text-1xl font-bold">Uploader: {food.uploader}</span>
							</div>
							<div className="flex justify-center items-center flex-grow-1 flex-basis-1/3">
								<ScoreButton score={food.score} foodId={food.id}/>
							</div>
						</div>
						<div className="w-full">
							<h2 className="text-2xl ml-0">Ingredients:</h2>
							<IngredientList
								ingredients={ingredients}
								flaggedIngredients={flaggedIngredients}
							/>
						</div>
					</>
				) : (
					<p>Loading...</p>
				)}
			</div>
		</main>
	);
}
