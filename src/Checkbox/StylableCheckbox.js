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

  static Box = () => <div className={styles.checkbox}/>;
  static Mark = () => <div className={styles.inner}><SvgV/></div>;
  static BothIcon = () => <div className={styles.checkbox}><div className={styles.inner + ' ' + styles.tickMark}><SvgV/></div></div>
  static Indeterminate = () => <div className={styles.inner}>
    <div className={styles.indeterminate}/>
  </div>;

  render() {
    const {id = uniqueId(), checked, indeterminate, disabled, hover, active, onChange} = this.props;

    return (
      <div cssStates={{checked, disabled, propHovered: hover, propActive: active, indeterminate}}>
        <StylableCheckBox
          className={styles.StylableCheckBox}
          value={checked || active}
          disabled={disabled}
          indeterminate={indeterminate}
          tickIcon={() => <span/>}
          indeterminateIcon={Checkbox.Indeterminate}
          boxIcon={Checkbox.BothIcon}
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
