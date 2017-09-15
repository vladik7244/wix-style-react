import React from 'react';
import {func, object} from 'prop-types';

import WixComponent from '../BaseComponents/WixComponent';

import css from './color-picker-hue.scss';

export default class ColorPickerHue extends WixComponent {

  static propTypes = {
    current: object.isRequired,
    onChange: func.isRequired
  }

  render() {
    // HUE is an intenger value from 0 to 360.
    const percentage = (this.props.current.hue() / 360) * 100;
    return (
      <div className={css.root}>
        <div className={css.handle} style={{left: `${percentage}%`}}/>
      </div>
    );
  }

}
