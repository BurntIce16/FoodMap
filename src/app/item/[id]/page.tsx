"use client";

import React, { useState, useEffect } from "react";
import { createBrowserClient } from "@supabase/ssr";
import IngredientList from "@/app/_components/ingredientList";
import BackButton from "@/app/_components/back-button";
import ScoreButton from "@/app/_components/score-button";

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

export default function Page({ params }: { params: { id: number } }) {
	const [food, setFood] = useState<FoodInfo | null>(null);
	const [sensitivities, setSensitivities] = useState<Sensitivity[]>([]);

	useEffect(() => {
		const fetchFood = async () => {
			// Initialize the Supabase client
			const supabase = createBrowserClient(
				process.env.NEXT_PUBLIC_SUPABASE_URL!,
				process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
			);

			// Fetching a single item by ID
			const { data: foodData, error: foodError } = await supabase
				.from("food_items")
				.select("*")
				.eq("id", params.id)
				.single(); // Using .single() to fetch one row

			if (foodError) {
				console.error("Error fetching food item:", foodError.message);
			} else {
				setFood(foodData); // Set a single object to state
			}

			const { data: userFlags, error } = await supabase
				.from("user_flags")
				.select("*");

			if (error) {
				console.error("Error fetching sensitivities:", error.message);
			} else if (!userFlags.length) {
				console.log("No flags found");
			} else {
				setSensitivities(userFlags); // Set the sensitivities array to state
				console.log(userFlags);
			}

			console.log("User Flags:", userFlags);
		};

		fetchFood();
	}, [params.id]); // Include params.id in the dependency array to re-fetch if id changes

	return (
		<main className="flex min-h-screen flex-col items-center justify-center p-24">
			<div className="flex flex-row justify-between">
				<BackButton />
				<h1 className="text-4xl font-bold text-center">Info</h1>
			</div>

			<div className="w-full">
				{food ? ( // Check if food is not null
					<div>
						<h2 className="text-4xl font-bold">Name: {food.name}</h2>
						<h3 className="text-4xl font-bold">Score: {food.score}</h3>
						<h3 className="text-2xl font-bold">Uploader: {food.uploader}</h3>
						<ScoreButton score={12} onClick={undefined} />
						{sensitivities.length > 0 && (
							<div>
								<h2 className="text-2xl font-bold">Sensitivities:</h2>
								<ul>
									{sensitivities.map((sensitivity, index) => (
										<li key={index}>{sensitivity.sensitivity}</li>
									))}
								</ul>
							</div>
						)}
						<IngredientList ingredients={food.ingredients} />
					</div>
				) : (
					<p>Loading...</p>
				)}
			</div>
		</main>
	);
}
