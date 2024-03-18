import React, { useState } from "react";
import SortContainer  from "../container/SortContainer";

function Sort() {
  const [sortBy, setSortBy] = useState<string>("name");
  const [sortOrder, setSortOrder] = useState<string>("asc");

  const handleSortChange = (criteria: string) => {
    setSortBy(criteria);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <SortContainer sortBy={sortBy} sortOrder={sortOrder} handleSort={handleSortChange} />
  );
}

export default Sort;
