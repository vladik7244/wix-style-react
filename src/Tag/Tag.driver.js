import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import styles from './Tag.st.css';

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

const tagDriverFactory = ({element, wrapper, component}) => {

  const isClassExists = (element, className) => (element && element.className.indexOf(className) !== -1);
  const removeButton = $(element).find('a')[0];
  const thumb = $(element).find('span')[0];
  const contentWithoutThumb = $(element).find('span')[0];

  return {
    exists: () => !!element,
    isLarge: () => hasCssState(element, styles, {large: true}),
    isStandardTheme: () => isClassExists(element, 'standard'),
    isWarningTheme: () => isClassExists(element, 'warning'),
    isErrorTheme: () => isClassExists(element, 'error'),
    isRemovable: () => isClassExists(removeButton, 'tagRemoveButton'),
    removeTag: () => ReactTestUtils.Simulate.click(removeButton),
    isThumbExists: () => isClassExists(thumb, 'thumb'),
    isWrapped: () => hasCssState(element, styles, {tagWrap: true}) && hasCssState(contentWithoutThumb, styles, {innerTagWrap: true}),
    isDisabled: () => hasCssState(element, styles, {disabled: true}),
    getLabel: () => element.textContent,
    getTitle: () => element.title,
    setProps: props => {
      const ClonedWithProps = React.cloneElement(component, Object.assign({}, component.props, props), ...(component.props.children || []));
      ReactDOM.render(<div ref={r => element = r}>{ClonedWithProps}</div>, wrapper);
    }
  };
};

export default tagDriverFactory;
