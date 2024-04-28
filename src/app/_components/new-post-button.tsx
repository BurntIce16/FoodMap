export default function NewPostButton() {
    return (
        <div>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => {
                    // Redirect to the new post page
                    window.location.href = "/new-post";
                }}
            >
                New Post
            </button>
        </div>
    );
}
