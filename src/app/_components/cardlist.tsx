"use client";

import React, { useState, useEffect } from "react";
import { createBrowserClient } from "@supabase/ssr";
import FoodCard from "./card";

// Define a type for your food items
type FoodItem = {
    id: number;
    name: string;
    score: number;
    // add other properties as needed
};

const CardList = () => {
    const [foods, setFoods] = useState<FoodItem[]>([]);
    const [loading, setLoading] = useState(true);  // Loading state to control the UI

    useEffect(() => {
        const fetchFoods = async () => {
            // Initialize the Supabase client
            const supabase = createBrowserClient(
                process.env.NEXT_PUBLIC_SUPABASE_URL!,
                process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
            );

            const { data: food_items, error } = await supabase
                .from("food_items")
                .select("*");

            if (error) {
                console.error("Error fetching food items:", error.message);
            } else {
                setFoods(food_items || []);
            }
            setLoading(false);  // Set loading to false after fetching data
        };

        fetchFoods();
    }, []);

    const numberOfLoadingCards = 6; // Number of loading cards to display initially

    return (
        <div>
            <ul style={{ listStyleType: "none", padding: 0 }}>
                {loading ? (
                    // Display loading cards if data is still loading
                    Array.from({ length: numberOfLoadingCards }).map((_, index) => (
                        <li key={index} style={{ marginBottom: "10px" }}>
                            <FoodCard loading />
                        </li>
                    ))
                ) : (
                    // Display actual data cards once data is fetched
                    foods.map((food) => (
                        <li key={food.id} style={{ marginBottom: "10px" }}>
                            <FoodCard
							
                                foodName={food.name}
                                foodId={food.id.toString()}
                                imageUrl={
                                    `https://pvknashlqegmindzlzvm.supabase.co/storage/v1/object/public/food-images/${food.id}.webp`
                                }
                                clickable={true}
                                score={food.score}
                            />
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default CardList;
