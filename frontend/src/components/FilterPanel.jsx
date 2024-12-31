import React from 'react';

const FilterPanel = ({ filter, setFilter, sort, setSort }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Filters</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Filter By:</label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
        >
          <option value="all">All</option>
          <option value="author">Author</option>
          <option value="title">Title</option>
          <option value="category">Category</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Sort By:</label>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
        >
          <option value="title">Title</option>
          <option value="author">Author</option>
        </select>
      </div>
    </div>
  );
};

export default FilterPanel;