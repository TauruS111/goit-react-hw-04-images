import React, { useState } from 'react';
import css from './SearchBar.module.css';

const SearchBar = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = e => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!searchQuery.trim()) return alert('Can not be empty');
    onSubmit(searchQuery);
    setSearchQuery('');
  };

  return (
    <div className={css.SearchBar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css.SearchFormButton}>
          <span className={css.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          className={css.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchQuery}
          onChange={handleChange}
        />
      </form>
    </div>
  );
};

export default SearchBar;
