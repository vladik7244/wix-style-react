import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import $ from 'jquery';
import styles from './Checkbox.st.css';

function hasCssState(elem, stylesheet, stateMap){
  if (!elem) {
    return false;
  }

  const errors = [];
  for (const k in stateMap) {
    if (stateMap.hasOwnProperty(k)) {
      const mapping = stylesheet.$stylesheet.cssStates({ [k]: true });
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

const checkboxDriverFactory = ({element, wrapper, component}) => {

  const checkbox = $(element).find('[data-automation-id="CHECKBOX_ROOT"]')[0];

  return {
    exists: () => !!element,
    click: () => ReactTestUtils.Simulate.click(checkbox),
    isChecked: () => hasCssState(element, styles, {checked: true}),
    isDisabled: () => hasCssState(element, styles, {disabled: true}),
    isIndeterminate: () => $(element).find('.indeterminate').length === 1,
    hasError: () => hasCssState(element, styles, {hasError: true}),
    getLabel: () => element.textContent,
    setProps: props => {
      const ClonedWithProps = React.cloneElement(component, Object.assign({}, component.props, props), ...(component.props.children || []));
      ReactDOM.render(<div ref={r => element = r}>{ClonedWithProps}</div>, wrapper);
    }
  };
};

export default checkboxDriverFactory;
