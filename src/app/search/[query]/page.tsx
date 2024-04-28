"use client";

import React from "react";
import SearchList from "@/app/_components/searchList";
import BackButton from "@/app/_components/back-button";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import Link from "next/link";

export default function SearchPage({ params }: { params: { query: string } }) {
	// Since your route is '/search/[query]', the dynamic part will be accessed via `query.query`

	return (
		<div className="flex flex-col items-center justify-center">
			<div className="w-full flex items-center justify-between p-4">
				<BackButton />
				<h1 className="text-3xl font-semibold">Search</h1>
				<Link href="/saved">
					<BookmarkBorderIcon fontSize="large"/>
				</Link>
			</div>
			<div className="flex-grow">
				<SearchList query={params.query} />
			</div>
		</div>
	);
}
