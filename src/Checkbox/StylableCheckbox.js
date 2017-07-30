import {any, bool, func, oneOf, string} from 'prop-types';
import uniqueId from 'lodash/uniqueId';
import React from 'react';
import SvgV from '../svg/V';
import WixComponent from '../BaseComponents/WixComponent';
import Label from '../Label/Label';

import {SBComponent as sbcomponent} from 'stylable-react-component';
import CheckboxCss from './Checkbox.st.css';

import {CheckBox as StylableCheckBox} from 'stylable-components';
const isStylableCheckBox = true;

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
    onChange: () => {}
  };

  static displayName = 'Checkbox';

  static Box = () => <div className={CheckboxCss.checkbox}/>;
  static Mark = () => <div className={CheckboxCss.inner}><SvgV/></div>;
  static Indeterminate = () => <div className={CheckboxCss.inner}><div className={CheckboxCss.indeterminate}/></div>;

  render() {
    const {id = uniqueId(), checked, indeterminate, disabled, hover, active, size, onChange} = this.props;

    const checkedSymbol = indeterminate ? <div className="indeterminate"/> : <SvgV/>;

    return (
      <div cssStates={{checked, disabled, propHovered: hover, propActive: active}}>
        {!isStylableCheckBox ?
          <input
            type="checkbox"
            id={id}
            checked={checked}
            disabled={disabled}
            onChange={disabled ? null : onChange}
            /> : null
        }
        {!isStylableCheckBox ?
          <Label for={id} appearance="T1.1">
            <div className={`checkbox ${size === 'medium' || size === 'large' ? size : ''}`}>
              <div className="inner">
                {checkedSymbol}
              </div>
            </div>
            <div className="children">{this.props.children}</div>
          </Label> : null
        }
        {isStylableCheckBox ?
          <StylableCheckBox
            className="StylableCheckBox"
            value={checked}
            disabled={disabled}
            indeterminate={indeterminate}
            tickIcon={Checkbox.Mark}
            indeterminateIcon={Checkbox.Indeterminate}
            boxIcon={Checkbox.Box}
            >
            <Label for={id} appearance="T1.1">
              <div className="children">{this.props.children}</div>
            </Label>
          </StylableCheckBox> : null
        }
      </div>
    );
  }
}

export default sbcomponent(Checkbox, CheckboxCss);
