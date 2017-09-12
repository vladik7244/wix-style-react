import styles from './ToggleSwitch.st.css';
import {hasCssState} from '../stylable-has-css-state';

const toggleSwitchDriverFactory = component => ({
  click: () => component.click(),
  element: () => component,
  checked: () => component.$('input').isSelected(),
  isXSmall: () => hasCssState(element, styles, {toggleSwitchXSmall: true}),
  isSmall: () => hasCssState(element, styles, {toggleSwitchSmall: true}),
  isLarge: () => !hasCssState(element, styles, {toggleSwitchXSmall: true}) && !hasCssState(element, styles, {toggleSwitchSmall: true}),
});

export default toggleSwitchDriverFactory;
