"use client";

import React, { useState } from "react";
import BackButton from "@/app/_components/back-button";
import supabase from "@/app/_components/supabase";
import { useRouter } from "next/navigation";

export default function NewPage() {
	const [name, setName] = useState("");
	const [ingredients, setIngredients] = useState("");
	const [image, setImage] = useState(null);
	const [submitting, setSubmitting] = useState(false);
	const router = useRouter(); // Initialize useRouter

	const handleImageChange = async (event) => {
		if (event.target.files.length > 0) {
			const file = event.target.files[0];
			const reader = new FileReader();

			reader.onload = async (e) => {
				const img = new Image();
				img.src = e.target.result;
				img.onload = () => {
					const canvas = document.createElement("canvas");
					canvas.width = img.width;
					canvas.height = img.height;
					const ctx = canvas.getContext("2d");
					ctx.drawImage(img, 0, 0);
					canvas.toBlob((blob) => {
						if (blob) {
							const newFile = new File(
								[blob],
								file.name.replace(/\.[^/.]+$/, ".webp"),
								{ type: "image/webp" }
							);
							setImage(newFile);
						}
					}, "image/webp");
				};
			};
			reader.readAsDataURL(file);
		}
	};

	const submitForm = async (event) => {
		event.preventDefault();
		setSubmitting(true);

		const ingredientsArray = ingredients.split(",").map((ingredient) => ({
			ingredient: ingredient.trim(),
		}));

		try {
			const { data: insertData, error: insertError } = await supabase
				.from("food_items")
				.insert([
					{ name, ingredients: ingredientsArray, uploader: "Clayton M" },
				])
				.select("id");

			if (insertError) throw insertError;

			let lastId = insertData[0].id;
			if (image && lastId) {
				const fileName = `${lastId}.webp`;

				const { error: uploadError } = await supabase.storage
					.from("food-images")
					.upload(fileName, image);

				if (uploadError) throw uploadError;

				//alert("Data and image submitted successfully!");
				router.push("/"); // Redirect to the homepage
			} else {
				alert("Please upload an image.");
			}
		} catch (error) {
			console.error("Error submitting form:", error.message);
		}

		setSubmitting(false);
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen">
			{" "}
			{/* Ensure full viewport height */}
			<div className="w-full flex items-center justify-between p-4">
				<BackButton />
				<h1 className="text-3xl font-semibold">New Item</h1>
				<div style={{ width: 48 }}></div>
			</div>
			<div className="flex-grow w-full max-w-4xl p-4">
				<form onSubmit={submitForm} className="space-y-6">
					<div>
						<label
							htmlFor="name"
							className="block text-lg font-medium text-gray-700"
						>
							Name
						</label>
						<input
							type="text"
							name="name"
							id="name"
							value={name}
							onChange={(e) => setName(e.target.value)}
							required
							className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
						/>
					</div>

					<div>
						<label
							htmlFor="ingredients"
							className="block text-lg font-medium text-gray-700"
						>
							Ingredients (separate with commas, e.g., flour, sugar, eggs)
						</label>
						<input
							type="text"
							name="ingredients"
							id="ingredients"
							value={ingredients}
							onChange={(e) => setIngredients(e.target.value)}
							required
							className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
						/>
					</div>

					<div>
						<label
							htmlFor="image"
							className="block text-lg font-medium text-gray-700"
						>
							Upload Image
						</label>
						<input
							type="file"
							name="image"
							id="image"
							onChange={handleImageChange}
							required
							className="mt-1 block w-full file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
						/>
					</div>

					<div className="flex justify-end">
						<button
							type="submit"
							disabled={submitting}
							className="cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
						>
							{submitting ? "Submitting..." : "Submit"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
