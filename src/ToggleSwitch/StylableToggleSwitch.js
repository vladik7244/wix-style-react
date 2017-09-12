import React from 'react';
import PropTypes from 'prop-types';
import uniqueId from 'lodash/uniqueId';
import WixComponent from '../BaseComponents/WixComponent';

import {stylable} from 'wix-react-tools';
import styles from './ToggleSwitch.st.css';

@stylable(styles)
export default class ToggleSwitch extends WixComponent {

  static displayName = 'ToggleSwitch';
  static propTypes = {
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    size: PropTypes.oneOf(['x-small', 'small', 'large'])
  };

  static defaultProps = {
    checked: false,
    onChange: () => { },
    disabled: false,
    size: 'large'
  };

  constructor(params) {
    super(params);
    this.id = uniqueId();
  }

  render() {
    const {checked, onChange, size, disabled} = this.props;
    const id = this.id;

    return (
      <div style-state={{toggleSwitchSmall: size === 'small', toggleSwitchXSmall: size === 'x-small', disabled}}>
        <input type="checkbox" id={id} className="inputCheckbox" checked={checked} onChange={onChange}/>
        <label htmlFor={id} style-state={{disabled}} className="outerLabel">
          <label htmlFor={id} style-state={{disabled}} className="innerLabel">
            <svg style-state={{disabled}} className="toggleActive" viewBox="0 0 41 32">
              <path d="M0.169 17.815c0.169 1.098 0.76 2.111 1.689 2.871l14.269 10.385c1.942 1.435 4.644 1.013 6.079-0.844l18.069-23.303c1.435-1.858 1.098-4.559-0.844-5.995s-4.644-1.098-6.164 0.844l-15.367 19.842-10.723-7.852c-1.942-1.435-4.644-1.013-6.164 0.844-0.76 0.929-1.013 2.111-0.844 3.208z"/>
            </svg>
            <svg style-state={{disabled}} className="toggleInactive" viewBox="0 0 143 32">
              <path d="M0 0h142.545v32h-142.545v-32z"/>
            </svg>
          </label>
        </label>
      </div>
    );
  }
}
