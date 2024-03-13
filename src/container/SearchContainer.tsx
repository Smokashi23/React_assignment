// import React, { useState } from "react";

// export interface SearchProps {
//   setSearch: React.Dispatch<React.SetStateAction<string>>;
// }

// const Search = ({ setSearch }: SearchProps) => {
//   const [searchText, setSearchText] = useState("");

//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchText(e.target.value);
//     setSearch(e.target.value);
//   };

//   return (
//     <input
//       type="search"
//       placeholder="Search..."
//       value={searchText}
//       onChange={handleSearchChange}
//     />
//   );
// };

// export default Search;

import React, { useState } from "react";
import Search from "../components/Search";

interface SearchContainerProps {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  filterTodo:Function
}

const SearchContainer = ({ setSearch,filterTodo }: SearchContainerProps) => {
  return (
    <Search  setSearchText={setSearch} filterTodo={filterTodo}/>
  );
};

export default SearchContainer;


