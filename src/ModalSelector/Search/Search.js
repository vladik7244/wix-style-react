import React from 'react';
import PropTypes from 'prop-types';
import WixComponent from '../../BaseComponents/WixComponent';
import Input from '../../Input';
import styles from './Search.scss';
import Finder from '../../Icons/dist/components/Finder';

class Search extends WixComponent {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    delayTime: PropTypes.number,
    minimumChars: PropTypes.number,
  };

  static defaultProps = {
    delayTime: 0,
    minimumChars: 1,
  };

  onChange = e => {
    const {onChange, delayTime, minimumChars} = this.props;
    if (e.target && e.target.value && e.target.value.length > minimumChars) {
      setTimeout(() => onChange(e.target.value), delayTime);
    }
  }

  render() {
    return (
      <Input
        id="search-input"
        placeholder="Search..."
        prefix={
          <div className={styles.search}>
            <Finder/>
          </div>
        }
        roundInput
        onChange={this.onChange}
        />
    );
  }
}

export default Search;
