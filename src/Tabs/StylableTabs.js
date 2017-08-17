import React from 'react';
import PropTypes from 'prop-types';
import WixComponent from '../BaseComponents/WixComponent';

import {SBComponent as sbcomponent} from 'stylable-react-component';
import styles from './Tabs.st.css';

class Tabs extends WixComponent {
  render() {
    const {items, onClick, activeId, type, hasDivider, width} = this.props;
    const style = {};
    const tabs = items.map(item => {
      if (type === 'uniformSide') {
        style.width = width;
      }

      return (
        <li key={item.id} onClick={() => onClick(item)} cssStates={{active: item.id === activeId}} className="tab" style={style}>
          {item.title}
        </li>
      );
    });

    return <ul cssStates={{hasDivider}} className={`${type}`}>{tabs}</ul>;
  }
}

Tabs.tabTypes = ['compact', 'uniformSide', 'uniformFull'];

Tabs.propTypes = {
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
  type: PropTypes.oneOf(Tabs.tabTypes),
  hasDivider: PropTypes.bool,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

Tabs.defaultProps = {
  hasDivider: true,
};

export default sbcomponent(Tabs, styles);
