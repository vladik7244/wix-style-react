import React from 'react';
import classNames from 'classnames';
import Input from './StylableInput';

import {stylable} from 'wix-react-tools';
import styles from './Input.st.css';

@stylable(styles)
export default class ThemedInput extends Input {
  render() {
    const {
      id,
      size,
      dataHook,
      title,
      theme,
      rtl,
      disabled,
      error,
      forceHover,
      forceFocus,
      roundInput,
      noLeftBorderRadius,
      noRightBorderRadius,
      value,
      withSelection
    } = this.props;

    const classes = {
      rtl: !!rtl,
      disabled,
      hasError: !!error,
      hasHover: forceHover,
      hasFocus: forceFocus || this.state.focus,
      roundInput,
      hasValue: (value && value.length) || (this.input && !!this.input.value)
    };

    const borderRadiusClasses = {
      [noRightBorderRadius]: noRightBorderRadius,
      [noLeftBorderRadius]: noLeftBorderRadius
    };

    let placeholder = this.props.placeholder;
    if (theme === 'amaterial' && !classes[styles.hasFocus] && !classes[styles.hasValue]) {
      placeholder = '';
    }

    return (
      <div
        style-state={classes}
        className={classNames(borderRadiusClasses, styles[`theme-${theme}`], styles[`size-${size}${withSelection ? '-with-selection' : ''}`])}
        data-hook={dataHook}
        >
        {(theme === 'amaterial') &&
        <label className="materialTitle" htmlFor={id}>{title}</label>}
        {super.render({placeholder})}
        {(theme === 'material') && <div className="bar barBlack"/>}
        {(theme === 'amaterial') && <div className="bar barBlue"/>}
      </div>
    );
  }
}
