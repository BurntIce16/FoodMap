"use client";

import React from "react";
import SavedList from "@/app/_components/saved-list";
import BackButton from "@/app/_components/back-button";



export default function SavedPage() {
	return (
		<div className="flex flex-col items-center justify-center">
			<div className="w-full flex items-center justify-between p-4">
				<BackButton />
				<h1 className="text-3xl font-semibold">Saved</h1>
               

				<div style={{ width: 48 }}></div>
			</div>
			<div className="flex-grow">
				<SavedList />
			</div>
		</div>
	);
}
