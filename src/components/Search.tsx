import React from "react";

interface SearchProps {
  // searchText: string;
  setSearchText: (text: string) => void;
  filterTodo: Function;
}

const Search = ({ setSearchText, filterTodo }: SearchProps) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setSearchText(e.target.value);
    // filterTodo();
    console.log("After filter todo");
  };

  return (
    <input
      type="search"
      placeholder="Search..."
      // value={searchText}
      onChange={handleSearchChange}
    />
  );
};

export default Search;
