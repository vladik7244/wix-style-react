import React from 'react';
import PropTypes from 'prop-types';
import WixComponent from '../../BaseComponents/WixComponent';
import * as Icons from 'wix-style-react/Icons';
import s from './style.scss';

class Icon extends WixComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
  };

  render() {
    return (
      <div className={s.singleIconView} key={name}>
        <span>{React.createElement(Icons[name])}</span>
      </div>
    );
  }
}

export default Icon;
