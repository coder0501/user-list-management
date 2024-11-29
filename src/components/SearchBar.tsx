import React from "react";

interface Props {
  query: string;
  setQuery: (query: string) => void;
}

const SearchBar: React.FC<Props> = ({ query, setQuery }) => {
  return (
    <div className="container bg-gray-100 p-4 rounded shadow mx-auto m-4 max-w-lg">
      <h3 className="text-xl font-bold">Search User</h3>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by name or email"
        className="p-2 border rounded w-full"
      />
    </div>
  );
};

export default SearchBar;
