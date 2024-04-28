import SearchBar from '@/app/_components/searchbar';
import BackButton from '@/app/_components/back-button';

const SearchPage: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl font-semibold">Search Page</h1>
            <SearchBar />
        </div>
    );
};

export default SearchPage;