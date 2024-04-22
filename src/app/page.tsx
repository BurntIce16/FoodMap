import Image from "next/image";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import SearchBar from "./_components/searchbar";
import CardList from "./_components/cardlist";
import Link from "next/link";

const pictureSize = "40px";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<div className="w-full">
				<div className="flex items-center justify-center mb-4">
					<Link href="/notifications">
						<NotificationsNoneOutlinedIcon
							className="mr-2"
							style={{ fontSize: pictureSize }}
						/>
					</Link>
					<h1 className="text-4xl font-bold">FoodMap</h1>
					<Link href="/profile">
						<div className="ml-4 flex items-center">
							<Image
								src="/profile-picture.jpg"
								alt="Profile Picture"
								width={60}
								height={60}
								className="rounded-full"
								style={{ minWidth: pictureSize, minHeight: pictureSize }} // Ensure the image respects the given dimensions
							/>
						</div>
					</Link>
				</div>
				{/* Search Bar */}
				<SearchBar />

				<div className="flex items-center justify-center">
					<CardList />
				</div>
			</div>
		</main>
	);
}
