import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
    const statusCode = 404;  // Typically set for custom client-rendered error pages

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div>
                <Image src="/NotFound.png" alt="404" width={500} height={500} />
                <h2>Error {statusCode}</h2>
                <p>Could not find the requested resource.</p>

                <p>Just pretend you didnt see this...</p>
                <Link href="/" passHref>
                    <button
                        type="button"
                        className="ml-2 px-4 py-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Return Home
                    </button>
                </Link>
            </div>
        </main>
    );
}
