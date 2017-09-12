import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import Tabs from './index';
import styles from './Tabs.st.css';

function hasCssState(elem, stylesheet, stateMap) {
  if (!elem) {
    return false;
  }
  const errors = [];
  for (const k in stateMap) {
    if (stateMap.hasOwnProperty(k)) {// eslint-disable-line no-prototype-builtins
      const mapping = stylesheet.$stylesheet.cssStates({[k]: true});
      if (stateMap[k]) {
        for (const m in mapping) {
          if (!elem.hasAttribute(m)) {
            errors.push(`expected element to have state ":${k}" with mapping to "${m}" but got nothing.`);
          }
        }
      } else {
        for (const m in mapping) {
          if (elem.hasAttribute(m)) {
            errors.push(`expected element to not have state ":${k}" but found with mapping "${m}".`);
          }
        }
      }
    }
  }
  return !errors.length;
}

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
