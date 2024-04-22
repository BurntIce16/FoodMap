export default function Page({ params }: { params: { id: number } }) {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<div className="w-full">
				<div>ID: {params.id}</div>
			</div>
		</main>
	);
}

function fetchData(id: number) {
	return null;
}
