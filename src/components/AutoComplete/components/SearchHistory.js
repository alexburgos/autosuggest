import React from 'react';
import PropTypes from 'prop-types';
import '../../../styles/SearchHistory.css';

function SearchHistory({ searches }) {
  return (
    <>
      <p>Previous searches: </p>
      <ul className='SearchHistory'>
        {searches.map((search, index) => (
          <li key={index}>
            {search.text}:{' '}
            <span className='SearchHistory-time-stamp '>
              {search.timeStamp}
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}

SearchHistory.defaultProps = {
  searches: []
};

SearchHistory.propTypes = {
  searches: PropTypes.array.isRequired
};

export default SearchHistory;
