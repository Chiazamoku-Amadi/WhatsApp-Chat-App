import { useDispatch } from "react-redux";
import search from "../assets/search.svg";
import { setSearchQuery } from "../features/chat/searchSlice";

interface SearchProps {
    placeholder: string;
  }

const Search: React.FC<SearchProps> = ({placeholder}) => {
    const dispatch = useDispatch();

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchQuery(event.target.value))
    }

  return (
    <div className="flex justify-start items-center bg-wa-gray-light2 py-[5px] rounded-lg w-[92%]">
        <img src={search} alt="" className=" pr-6 pl-3" />
            <input
                type="text"
                placeholder={placeholder}
                onChange={handleSearch}
                className="bg-wa-gray-light2 text-sm text-read-msg placeholder:text-read-msg outline-none focus:text-white w-4/5"
            />
    </div>
  );
}

export default Search;
