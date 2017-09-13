import React from 'react';
import {arrayOf, func, string} from 'prop-types';
import WixComponent from '../BaseComponents/WixComponent';

import {stylable} from 'wix-react-tools';
import styles from './ButtonSelection.st.css';

@stylable(styles)
export default class ButtonSelection extends WixComponent {
  static displayName = 'ButtonSelection';

  static propTypes = {
    buttonsNames: arrayOf(string.isRequired).isRequired,
    value: string,
    onChange: func.isRequired,
  }

  componentWillMount() {
    const {value, buttonsNames} = this.props;
    if (value && (buttonsNames.every(b => b !== value))) {
      throw new Error('ButtonSelection: Invalid button selected');
    }
  }

  render() {
    const {value, buttonsNames, onChange} = this.props;
    return (
      <div>
        {
          buttonsNames.map(buttonName =>
            <span
              key={buttonName}
              className={`${value === buttonName ? 'selected' : 'unselected'}`}
              onClick={() => {
                if (buttonName !== value) {
                  onChange(buttonName);
                }
              }}
              >
              {buttonName}
            </span>
          )
        }
      </div>
    );
  }
}
