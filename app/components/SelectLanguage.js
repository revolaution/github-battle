import React from 'react'
import PropTypes from 'prop-types';

const SelectLanguage = ({selectedLanguage, onSelect}) => {
  const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];

  return (
    <ul className='languages'>
      {languages.map((language) => {
        return (
          <li
            style={language == selectedLanguage ? {color: '#d0021b'} : null}
            onClick={onSelect.bind(null, language)}
            key={language}
          >
            {language}
          </li>
        )
      })}
    </ul>
  )
}

SelectLanguage.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
}

export default SelectLanguage 
