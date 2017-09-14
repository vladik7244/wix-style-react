import React from 'react';
import PropTypes from 'prop-types';
import WixComponent from '../BaseComponents/WixComponent';

import {stylable} from 'wix-react-tools';
import styles from './PopoverMenuItem.st.css';

@stylable(styles)
export default class PopoverMenuItem extends WixComponent {
  static propTypes = {
    icon: PropTypes.node,
    text: PropTypes.string,
    onClick: PropTypes.func
  };

  render() {
    return (
      <li>
        <button type="button" className="button" onClick={this.props.onClick}>
          <span className="icon">{this.props.icon}</span><span className="text">{this.props.text}</span>
        </button>
      </li>
    );
  }
}
