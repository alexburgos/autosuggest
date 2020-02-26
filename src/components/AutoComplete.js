import React, { useState, useEffect } from 'react';
import Suggestions from './Suggestions';
import SearchResult from './SearchResult';
import SearchHistory from './SearchHistory';
import '../styles/AutoComplete.css';

function AutoComplete() {
  const [breeds, setBreeds] = useState([]);
  const [activeSuggestion, setActiveSuggestion] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [inputVal, setInputVal] = useState('');
  const cachedSearch = localStorage.getItem('search');
  const [search, setSearch] = useState(cachedSearch ? JSON.parse(cachedSearch) : '');
  const [savedSearches, setSavedSearches] = useState([]);
  const [dogPicture, setDogPicture] = useState(null);

  useEffect(() => {
    async function fetchDogBreeds() {
      try {
        const response = await fetch('https://dog.ceo/api/breeds/list/all');
        const data = await response.json();
        const breeds = Object.keys(data.message).map(
          breed => breed.charAt(0).toUpperCase() + breed.slice(1)
        );
        setBreeds(breeds);
      } catch (error) {
        throw new Error('Error fetching dog breeds');
      }
    }
    fetchDogBreeds();
  }, []);

  useEffect(() => {
    if (search.length === 0) return;

    async function fetchDogBreedImage() {
      try {
        const response = await fetch(
          `https://dog.ceo/api/breed/${search.toLowerCase()}/images/random`
        );
        const data = await response.json();
        if (data.status === 'success') {
          setDogPicture(data.message);
        }
      } catch (error) {
        throw new Error('Error fetching images of the good pup');
      }
    }
    fetchDogBreedImage();
  }, [search]);

  function saveSearch(currentSearch) {
    const searches = [...savedSearches];
    const newSearch = {};

    if (savedSearches.some(search => search.text === currentSearch)) return;

    newSearch.text = currentSearch;
    let timeStamp = new Date();
    newSearch.timeStamp = `${timeStamp.toDateString()} ${timeStamp.toTimeString().substring(0, 8)}`;
    searches.unshift(newSearch);
    setSavedSearches(searches);
    localStorage.setItem('search', JSON.stringify(currentSearch));
  }

  function handleChange(e) {
    let regExpr = /[^a-zA-Z0-9-. ]/g;
    let sanitizedInput = e.target.value.replace(regExpr, '');
    setInputVal(sanitizedInput);

    if (sanitizedInput.length > 0) {
      let suggestions = breeds.filter(
        breed => breed.toLowerCase().indexOf(sanitizedInput.toLowerCase()) > -1
      );

      if (suggestions.length > 0) {
        setSuggestions(suggestions);
        setShowSuggestions(true);
      } else {
        setShowSuggestions(false);
      }
    } else {
      setShowSuggestions(false);
    }
  }

  function handleClick(e) {
    const currentSearch = e.currentTarget.innerText;

    setSearch(currentSearch);
    setInputVal(currentSearch);
    saveSearch(currentSearch);
    setSuggestions([]);
    setActiveSuggestion(0);
    setShowSuggestions(false);
  }

  function handleKeyDown(e) {
    let currentSearch;

    // User pressed Enter or Return
    if (e.keyCode === 13) {
      if (e.target.value.length === 0) return;
      currentSearch = suggestions[activeSuggestion];
      if (currentSearch) {
        setSearch(currentSearch);
        setInputVal(currentSearch);
        saveSearch(currentSearch);
        setActiveSuggestion(0);
        setShowSuggestions(false);
      }
    }

    // User pressed the up arrow
    else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }

      currentSearch = activeSuggestion - 1;
      setActiveSuggestion(currentSearch);
    }

    // User pressed the down arrow
    else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === suggestions.length) {
        return;
      }

      currentSearch = activeSuggestion + 1;
      setActiveSuggestion(currentSearch);
    }
  }

  return (
    <div className='AutoComplete'>
      <label>Who's a good dog?</label>
      <input
        type='text'
        value={inputVal}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      {showSuggestions && (
        <Suggestions
          suggestions={suggestions}
          activeSuggestion={activeSuggestion}
          onClick={handleClick}
        />
      )}
      {savedSearches.length > 0 && <SearchHistory searches={savedSearches}/>}
      {dogPicture && <SearchResult dogPicture={dogPicture} searchQuery={search} />}
    </div>
  );
}

export default AutoComplete;
