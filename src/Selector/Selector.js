import React from 'react';
import PropTypes from 'prop-types';
import WixComponent from '../BaseComponents/WixComponent';
// import styles from './Selector.scss';

class Search extends WixComponent {
  static propTypes = {
    onToggle: PropTypes.func,
    isSelected: PropTypes.bool,
    title: PropTypes.string.isRequired,
    image: PropTypes.string,
    subTitle: PropTypes.string,
    extraText: PropTypes.string,
  };

  static defaultProps = {
  };

  render() {

    return (
      <div>
        Inside Selector
      </div>
    );
  }
}

export default Search;
