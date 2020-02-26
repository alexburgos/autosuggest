import React from 'react';
import PropTypes from 'prop-types';
import '../styles/SearchHistory.css';

function SearchHistory({ searches }) {
  return (
    <ul className='SearchHistory'>
      { searches.map( (search, index) =>  <li key={index}>{search.text}: {search.timeStamp}</li>)}
    </ul>
  );
}

SearchHistory.defaultProps = {
  searches: [],
};

SearchHistory.propTypes = {
  searches: PropTypes.array.isRequired,
};

export default SearchHistory;
