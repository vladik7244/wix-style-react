import React from 'react';
import {shallow} from 'enzyme';
import ToggleSwitch from './index';

export default class ToggleSwitchDriver {
  constructor() {
    this.props = {};
  }

  given = {
    size: size => {
      this.props.size = size;
      return this;
    },
    checked: value => {
      this.props.checked = value;
      return this;
    },
    onChange: value => {
      this.props.onChange = value;
      return this;
    }
  };

  when = {
    created: () => {
      this.wrapper = shallow(
        <ToggleSwitch {...this.props}/>
      );
      return this;
    },
    changed: () => {
      this.wrapper.find('input').simulate('change');
      return this;
    }
  };

  get = {
    element: () => this.wrapper,
    checked: () => this.wrapper.find('input').props().checked,
    isXSmall: () => this.wrapper.hasClass('toggleSwitchXSmall'),
    isSmall: () => this.wrapper.hasClass('toggleSwitchSmall'),
    isLarge: () => !this.get.isSmall() && !this.get.isXSmall()
  }
}
