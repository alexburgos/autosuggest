import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Suggestions.css';

function Suggestions({ suggestions, activeSuggestion, onClick }) {
  return (
    <ul className='Suggestions'>
      {suggestions.map((suggestion, i) => {
        let className;

        if (i === activeSuggestion) {
          className = 'active';
        }

        return (
          <li className={className} key={suggestion} onClick={onClick}>
            {suggestion}
          </li>
        );
      })}
    </ul>
  );
}

Suggestions.defaultProps = {
  suggestions: [],
  activeSuggestion: 0
};

Suggestions.propTypes = {
  suggestions: PropTypes.array.isRequired,
  activeSuggestion: PropTypes.number.isRequired,
  onClick: PropTypes.func
};

export default Suggestions;
