import React from 'react';
// import PropTypes from 'prop-types';
import WixComponent from '../BaseComponents/WixComponent';
import styles from './Scrollable.scss';

class Scrollable extends WixComponent {
  // static propTypes = {
  // };

  // static defaultProps = {
  // };


  render() {
    const {
      children
    } = this.props;
    return (
      <div className={styles.container}>
        {children}
      </div>
    );
  }
}

export default Scrollable;
