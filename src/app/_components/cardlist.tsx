"use client";

import React, { useState, useEffect } from "react";
import { createBrowserClient } from "@supabase/ssr";
import FoodCard from "./card";

// Define a type for your food items if you know the structure
type FoodItem = {
	id: number;
	name: string;
	// add other properties as needed
};

const CardList = () => {
	const [foods, setFoods] = useState<FoodItem[]>([]);

	useEffect(() => {
		const fetchFoods = async () => {
			// Ensure Supabase client is initialized properly, consider singleton pattern or context
			const supabase = createBrowserClient(
				process.env.NEXT_PUBLIC_SUPABASE_URL!,
				process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
			);

			const { data: food_items, error } = await supabase
				.from("food_items")
				.select("*");

			if (error) {
				console.error("Error fetching food items:", error.message);
				return;
			}

			setFoods(food_items || []);
		};

		fetchFoods();
	}, []);

	return (
		<div>
			<p>Trending:</p>
			<ul>
				{foods.map((food, index) => (
					<div>
						<FoodCard foodName={food.name} foodId={food.id.toString()} imageUrl={"https://pvknashlqegmindzlzvm.supabase.co/storage/v1/object/public/food-images/" + food.id + ".webp"} />
					</div>
				))}
			</ul>
		</div>
	);
};

export default CardList;

//https://pvknashlqegmindzlzvm.supabase.co/storage/v1/object/public/food-images/1.webp