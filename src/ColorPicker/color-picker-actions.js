import React from 'react';
import {func} from 'prop-types';

import Button from '../Button';
import {Close, V} from '../Icons';

import css from './color-picker-actions.scss';

const ColorPickerActions = ({onCancel, onConfirm}) =>
  <div className={css.root}>
    <Button height="small" theme="icon-standardsecondary">
      <Close size="12px" onClick={onCancel} />
    </Button>
    <Button height="small" theme="icon-standard">
      <V size="12px" onClick={onConfirm} />
    </Button>
  </div>;

ColorPickerActions.propTypes = {
  onCancel: func.isRequired,
  onConfirm: func.isRequired
};

export default ColorPickerActions;
