import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import Tabs from './index';
import styles from './Tabs.st.css';
import {hasCssState} from '../stylable-has-css-state';

const tabsDriverFactory = ({element, wrapper, component}) => {
  const getTabs = () => [...element.childNodes];
  return {
    exists: () => !!element,
    getTitles: () => getTabs().map(childNode => childNode.textContent),
    clickTabAt: index => ReactTestUtils.Simulate.click(getTabs()[index]),
    getActiveTabIndex: () => getTabs().findIndex(childNode => hasCssState(childNode, styles, {active: true})),
    isDefaultType: () => Tabs.tabTypes.every(tabType => !element.classList.contains(styles[tabType])),
    isOfType: type => element.classList.contains(styles[type]),
    hasDivider: () => hasCssState(element, styles, {hasDivider: true}),
    getTabsWidth: () => new Set(getTabs().map(item => item.style.width)),
    setProps: props => {
      const ClonedWithProps = React.cloneElement(component, Object.assign({}, component.props, props), ...(component.props.children || []));
      ReactDOM.render(<div ref={r => element = r.childNodes[0]}>{ClonedWithProps}</div>, wrapper);
    }
  };
};

export default tabsDriverFactory;
