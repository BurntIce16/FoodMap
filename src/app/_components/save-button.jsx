import { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import supabase from "./supabase";

export default function SaveButton({ id }) {
	const [saved, setSaved] = useState(false);
	const [loading, setLoading] = useState(true);

	// Fetch the current saved status from the food_items table
	const fetchSavedStatus = async () => {
		setLoading(true);
		try {
			const { data, error } = await supabase
				.from("food_items")
				.select("saved")
				.eq("id", id)
				.single();

			if (error) throw error;

			setSaved(!!data.saved);
		} catch (error) {
			console.error("Error fetching saved status:", error.message);
		} finally {
			setLoading(false);
		}
	};

	// Effect to fetch saved status when component mounts or id changes
	useEffect(() => {
		if (id) {
			// Ensure id is present before attempting to fetch
			fetchSavedStatus();
		}
	}, [id]);

	// Toggle the saved status in the food_items table
	const toggleSaved = async () => {
		if (loading || !id) return; // Prevent toggling if loading or if id is undefined
		setLoading(true);
		try {
			const newSavedStatus = !saved;
			const { data, error } = await supabase
				.from("food_items")
				.update({ saved: newSavedStatus })
				.eq("id", id)
				.single(); // Make sure to target only the specific record

			if (error) throw error;

			setSaved(newSavedStatus);
			console.log("Update successful:", data);
		} catch (error) {
			console.error("Error toggling saved status:", error.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<IconButton onClick={toggleSaved} disabled={loading}>
			{saved ? <BookmarkIcon fontSize="large"/> : <BookmarkBorderIcon fontSize="large"/>}
		</IconButton>
	);
}
