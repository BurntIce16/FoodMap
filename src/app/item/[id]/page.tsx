"use client";

import React, { useState, useEffect } from "react";
import IngredientList from "@/app/_components/ingredientList";
import BackButton from "@/app/_components/back-button";
import ScoreButton from "@/app/_components/score-button";
import FoodCard from "@/app/_components/card";
import SaveButton from "@/app/_components/save-button";
import supabase from "@/app/_components/supabase";

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
		const fetchFood = async () => {
			// Fetch food item by ID
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
		};

		fetchFood();
	}, [params.id]);

	useEffect(() => {
		const fetchIngredientsAndSensitivities = async () => {
			// Fetch ingredients and sensitivities in parallel
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

				setIngredients(ingredientResponse.data);
				setUserSensitivities(userFlagsResponse.data);

				const flaggedIngredients = highlightIngredients(
					ingredientResponse.data,
					userFlagsResponse.data
				);

				setFlaggedIngredients(flaggedIngredients);
			} catch (error: any) {
				console.error("Error fetching data:", error.message);
			}
		};

		fetchIngredientsAndSensitivities();
	}, [params.id]); // assuming you want this to re-run only when params.id changes

	return (
		<main className="flex min-h-screen flex-col items-center justify-center p-24">
			<div className="flex flex-row justify-between">
				<BackButton />
				<h1 className="text-4xl font-bold text-center">Food Info</h1>
				{food && food.id && <SaveButton id={food.id} />}
			</div>

			<div className="w-full flex gap-4">
				{food ? (
					<>
						<div className="flex-1">
							<FoodCard
								foodName={food.name}
								foodId={food.id.toString()}
								imageUrl={`https://pvknashlqegmindzlzvm.supabase.co/storage/v1/object/public/food-images/${food.id}.webp`}
								clickable={false}
							/>
							<h3 className="text-2xl font-bold">Uploader: {food.uploader}</h3>

							<IngredientList
								ingredients={ingredients}
								flaggedIngredients={flaggedIngredients}
							/>
						</div>
						<div className="flex justify-center items-center flex-none">
							<ScoreButton score={food.score} onClick={undefined} />
						</div>
					</>
				) : (
					<p>Loading...</p>
				)}
			</div>
		</main>
	);
}
