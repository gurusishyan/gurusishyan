import React from 'react';
import Select from 'react-select';

const DropdownComponent = ({
  options,
  placeholder,
  selected_options,
  onChange,
  isMulti,
  closeMenuOnSelect,
}) => {
  return (
    <Select
      isSearchable
      hideSelectedOptions
      value={selected_options}
      options={options}
      placeholder={placeholder}
      onChange={onChange}
      isMulti={isMulti}
      closeMenuOnSelect={closeMenuOnSelect}
    />
  );
};

export default DropdownComponent;
