import React from 'react';

import { Input } from 'antd';

export const SearchBar = ({ searchValue, setSearchValue }) => {
  const handleSearch = (event) => {
    const { value } = event.target;
    setSearchValue(value);
  };

  return (
    <div
      style={{
        maxWidth: '200px',
        marginBottom: '10px',
      }}
    >
      <Input
        placeholder='Search expenses'
        value={searchValue}
        onChange={(e) => handleSearch(e)}
      />
    </div>
  );
};
