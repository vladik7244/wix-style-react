import React from 'react';
import PropTypes from 'prop-types';
import InputWithOptions from '../InputWithOptions/InputWithOptions';
import InputWithTags from './InputWithTags';
import last from 'lodash/last';
import difference from 'difference';
import uniqueId from 'lodash/uniqueId';

class MultiSelect extends InputWithOptions {

  constructor(props) {
    super(props);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onManuallyInput = this.onManuallyInput.bind(this);
    this.onEnterPressed = this.onEnterPressed.bind(this);
  }

  getUnselectedOptions() {
    const optionIds = this.props.options.map(option => option.id);
    const tagIds = this.props.tags.map(tag => tag.id);
    const unselectedOptionsIds = difference(optionIds, tagIds);
    return this.props.options.filter(option => unselectedOptionsIds.includes(option.id));
  }

  dropdownAdditionalProps() {
    return {
      options: this.getUnselectedOptions().filter(this.props.predicate)
    };
  }

  closeOnSelect() {
    return false;
  }

  inputAdditionalProps() {
    return {
      inputElement: <InputWithTags/>,
      onKeyDown: this.onKeyDown,
      onEnterPressed: this.onEnterPressed,
      delimiters: this.props.delimiters
    };
  }

  _onSelect(option) {
    this.onSelect(option);
  }

  _onManuallyInput(inputValue) {
    if (inputValue.trim()) {
      if (this.closeOnSelect()) {
        this.hideOptions();
      }

      this.onManuallyInput(inputValue);
    } else {
      super.hideOptions();
    }
    this.clearInput();
  }

  onEnterPressed() {
    if (this.props.value.trim()) {
      const unselectedOptions = this.getUnselectedOptions();
      const visibleOptions = unselectedOptions.filter(this.props.predicate);
      const maybeNearestOption = visibleOptions[0];

      if (maybeNearestOption) {
        this.onSelect(maybeNearestOption);
      }

      this.clearInput();
    }
  }

  onKeyDown(event) {
    const {tags, value, onRemoveTag, delimiters} = this.props;

    if (tags.length > 0 && (event.key === 'Delete' || event.key === 'Backspace') && value.length === 0) {
      onRemoveTag(last(tags).id);
    }

    if (event.key === 'Tab' || event.key === 'Escape') {
      this.clearInput();
      super.hideOptions();
    }

    if (delimiters.includes(event.key)) {
      this.onEnterPressed();
    }

    if (this.props.onKeyDown) {
      this.props.onKeyDown(event);
    }
  }

  optionToTag({id, value, tag}) {
    return tag ? {id, ...tag} : {id, label: value};
  }

  onSelect(option) {
    this.clearInput();

    if (this.props.onSelect) {
      this.props.onSelect(this.optionToTag(option));
    }

    this.input.focus();
  }

  onManuallyInput(inputValue) {
    if (!inputValue) {
      this.input.blur();
      return;
    }

    if (this.props.onManuallyInput) {
      this.props.onManuallyInput(this.optionToTag({id: uniqueId('customOption_'), value: inputValue}));
    }

    this.clearInput();
  }

  clearInput() {
    if (this.props.onChange) {
      this.props.onChange({target: {value: ''}});
    }
  }
}

MultiSelect.propTypes = {
  ...InputWithOptions.propTypes,
  predicate: PropTypes.func,
  tags: PropTypes.array,
  delimiters: PropTypes.array
};

MultiSelect.defaultProps = {
  ...InputWithOptions.defaultProps,
  predicate: () => true,
  tags: [],
  delimiters: []
};

export default MultiSelect;
