"use client";

import React from "react";
import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpRounded";
import ThumbDownRoundedIcon from "@mui/icons-material/ThumbDownRounded";
import supabase from "@/app/_components/supabase";

export default function ScoreButton({ score, foodId }) {
	const [localScore, setLocalScore] = React.useState(score);

	const updateScore = async (newScore) => {
		setLocalScore(newScore); // Optimistically update the UI
		try {
			const { data, error } = await supabase
				.from("food_items")
				.update({ score: newScore })
				.match({ id: foodId });

			if (error) {
				throw error;
			}
			console.log("Score updated:", data);
		} catch (error) {
			console.error("Error updating score:", error);
			setLocalScore(score); // Revert to original score on error
		}
	};

	return (
		<div className="flex flex-col items-center">
			<button onClick={() => updateScore(localScore + 1)}>
				<ThumbUpRoundedIcon fontSize="large" />
			</button>
			<span
				className={`text-4xl ${
					localScore > 0
						? "text-green-500"
						: localScore < 0
						? "text-red-500"
						: "text-gray-500"
				}`}
			>
				{localScore}
			</span>
			<button onClick={() => updateScore(localScore - 1)}>
				<ThumbDownRoundedIcon fontSize="large" />
			</button>
		</div>
	);
}
