import { ArrowUp,ArrowDown } from "lucide-react";
import React from "react";

interface SortContainerProps {
  sortBy: string;
  sortOrder: string;
  handleSort: (criteria: string) => void;
}

const SortContainer: React.FC<SortContainerProps> = ({ sortBy, sortOrder, handleSort }) => {
  return (
    <div className="dropdown">
      <button className="btn btn-warning dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Sort By
      </button>
      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <button className={`dropdown-item ${sortBy === "name" ? "active" : ""}`} onClick={() => handleSort("name")}>
          Name
        </button>
        <button className={`dropdown-item ${sortBy === "date" ? "active" : ""}`} onClick={() => handleSort("date")}>
          Date
        </button>
      </div>
      <span onClick={() => handleSort(sortBy)}>
        {sortOrder === "asc" ? <ArrowUp /> : <ArrowDown />}
      </span>
    </div>
  );
}

export default SortContainer;
