import * as styles from './Checkbox.scss';
import {uniqueId} from 'lodash';
import * as React from 'react';
import * as classNames from 'classnames';
import SvgV from '../svg/V';
import WixComponent, {IWixComponentProps} from '../BaseComponents/WixComponent';
import Label from '../Label/Label';

export interface ICheckboxProps extends IWixComponentProps {
  active?: boolean,
  checked?: boolean,
  children?: any,
  disabled?: boolean,
  id?: string,
  indeterminate?: boolean,
  /** used for automatic testing */
  hover?: boolean,
  size?: 'medium' | 'large',
  onChange?: React.EventHandler<React.FormEvent<HTMLInputElement>>,
}

/** a simple WixStyle checkbox */
class Checkbox extends WixComponent<ICheckboxProps, {}> {

  public static defaultProps: Partial<ICheckboxProps> = {
    size: 'medium',
    onChange: (event: React.FormEvent<HTMLInputElement>) => { event.preventDefault() },
  };

  public static displayName = 'Checkbox';

  render() {
    const {id = uniqueId(), checked, indeterminate, disabled, hover, active, size, onChange} = this.props;

    const classname = classNames({
      [styles.wrapper]: true,
      [styles.checked]: checked,
      [styles.unchecked]: !checked,
      [styles.hover]: hover,
      [styles.active]: active,
      [styles.disabled]: disabled,
    });

    const checkedSymbol = indeterminate ? <div className={styles.indeterminate}/> : <SvgV/>;

    return (
      <div className={classname} >
        <input type="checkbox" id={id} checked={checked} disabled={disabled} onChange={disabled ? null : onChange}/>
        <Label for={id} appearance="T1.1">
          <div className={classNames(styles.checkbox, styles[size])}>
            <div className={styles.inner}>
              {checkedSymbol}
            </div>
          </div>
          <div className={styles.children}>{this.props.children}</div>
        </Label>
      </div>
    );
  }
}

export default Checkbox;
