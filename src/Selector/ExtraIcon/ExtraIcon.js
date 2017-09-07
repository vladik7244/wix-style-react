import React from 'react';
import PropTypes from 'prop-types';
import WixComponent from '../../BaseComponents/WixComponent';
import * as Icons from 'wix-style-react/Icons';

class ExtraIcon extends WixComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
  };

  render() {
    return (
      <div key={name}>
        <span>{React.createElement(Icons[name])}</span>
      </div>
    );
  }
}

export default ExtraIcon;
