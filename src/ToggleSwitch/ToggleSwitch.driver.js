import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import $ from 'jquery';
import styles from './ToggleSwitch.st.css';
import {hasCssState} from '../stylable-has-css-state';

const toggleSwitchDriverFactory = ({element, wrapper, component}) => {

  const toggleSwitch = $(element).find('input')[0];

  return {
    exists: () => !!element,
    click: () => ReactTestUtils.Simulate.change(toggleSwitch),
    isChecked: () => $(toggleSwitch).is(':checked'),
    isDisabled: () => hasCssState(element, styles, {disabled: true}),
    isXSmall: () => hasCssState(element, styles, {toggleSwitchXSmall: true}),
    isSmall: () => hasCssState(element, styles, {toggleSwitchSmall: true}),
    isLarge: () => !hasCssState(element, styles, {toggleSwitchXSmall: true}) && !hasCssState(element, styles, {toggleSwitchSmall: true}),
    setProps: props => {
      const ClonedWithProps = React.cloneElement(component, Object.assign({}, component.props, props), ...(component.props.children || []));
      ReactDOM.render(<div ref={r => element = r}>{ClonedWithProps}</div>, wrapper);
    }
  };
};

export default toggleSwitchDriverFactory;
