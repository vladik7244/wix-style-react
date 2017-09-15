import React from 'react';
import {object, func} from 'prop-types';

import WixComponent from '../BaseComponents/WixComponent';

import css from './color-picker-hsb.scss';

export default class ColorPickerHsb extends WixComponent {

  static propTypes = {
    current: object.isRequired,
    onChange: func.isRequired
  }

  render() {
    const {current} = this.props;
    const hue = current.saturationv(100).lightness(50);
    const style = {
      left: `${current.saturationv()}%`,
      top: `${100 - current.lightness()}%`
    }
    return (
      <div className={css.root}>
        <div className={css.hue} style={{background: hue.hex()}}/>
        <div className={css.saturation}/>
        <div className={css.brightness}/>
        <div className={css.handle} style={style}/>
      </div>
    );
  }

}
