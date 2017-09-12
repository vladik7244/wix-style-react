import React from 'react';
import PropTypes from 'prop-types';
import WixComponent from '../BaseComponents/WixComponent';

import {stylable} from 'wix-react-tools';
import styles from './Tabs.st.css';

const tabTypes = ['compact', 'uniformSide', 'uniformFull'];

@stylable(styles)
export default class Tabs extends WixComponent {
  static tabTypes = tabTypes;

  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ]),
      title: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element
      ]).isRequired
    })).isRequired,
    onClick: PropTypes.func,
    activeId: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    type: PropTypes.oneOf(tabTypes),
    hasDivider: PropTypes.bool,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  };

  static defaultProps = {
    hasDivider: true,
  };
  
  render() {
    const {items, onClick, activeId, type, hasDivider, width} = this.props;
    const style = {};
    const tabs = items.map(item => {
      if (type === 'uniformSide') {
        style.width = width;
      }

      return (
        <li key={item.id} onClick={() => onClick(item)} style-state={{active: item.id === activeId}} className="tab" style={style}>
          {item.title}
        </li>
      );
    });

    return <ul style-state={{hasDivider}} className={`${type}`}>{tabs}</ul>;
  }
}
