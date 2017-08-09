import {any, bool, func, oneOf, string} from 'prop-types';
import uniqueId from 'lodash/uniqueId';
import React from 'react';
import SvgV from '../svg/V';
import WixComponent from '../BaseComponents/WixComponent';
import Label from '../Label/Label';

import {SBComponent as sbcomponent} from 'stylable-react-component';
import styles from './Checkbox.st.css';

import {CheckBox as StylableCheckBox} from 'stylable-components';

/** a simple WixStyle checkbox */
class Checkbox extends WixComponent {
  static propTypes = {
    /** used for automatic testing */
    active: bool,
    checked: bool,
    children: any,
    disabled: bool,
    id: string,
    indeterminate: bool,
    /** used for automatic testing */
    hover: bool,
    size: oneOf(['medium', 'large']),
    onChange: func
  };

  static defaultProps = {
    size: 'medium',
    onChange: () => {
    }
  };

  static displayName = 'Checkbox';
  static boxAndIcons = indeterminate => (
    <div className={styles.checkbox}>
      <div className={styles.tickMark}><SvgV/></div>
      { indeterminate ? <div className={styles.indeterminate}/> : null }
    </div>
  );

  render() {
    const {id = uniqueId(), checked, indeterminate, disabled, hover, active, onChange, size} = this.props;

    return (
      <div cssStates={{checked, disabled, propHover: hover, propActive: active, indeterminate, large: size === 'large'}}>
        <StylableCheckBox
          data-hook-checked={checked}
          className={styles.stylableCheckBox}
          value={checked || active}
          disabled={disabled}
          indeterminate={indeterminate}
          tickIcon={() => null}
          indeterminateIcon={() => null}
          boxIcon={() => Checkbox.boxAndIcons(indeterminate)}
          onChange={onChange}
          >
          <Label for={id} appearance="T1.1">
            <div className={styles.children}>{this.props.children}</div>
          </Label>
        </StylableCheckBox>
      </div>
    );
  }
}

export default sbcomponent(Checkbox, styles);
