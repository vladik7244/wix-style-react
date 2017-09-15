import React from 'react';
import color from 'color';
import {object, func} from 'prop-types';

import WixComponent from '../BaseComponents/WixComponent';
import Input from '../Input';

import css from './color-picker-converter.scss';

export default class ColorPickerConverterRgb extends WixComponent {

  static propTypes = {
    current: object.isRequired,
    onChange: func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = props.current.rgb().object();
  }

  render() {
    const {current} = this.props;
    return (
      <div className={css.root}>
        <div className={css.distribute}>
          <Input size="small" value={this.state.r} onChange={e => this.change('r', e)}/>
          <Input size="small" value={this.state.g} onChange={e => this.change('g', e)}/>
          <Input size="small" value={this.state.b} onChange={e => this.change('b', e)}/>
        </div>
      </div>
    );
  }

  componentWillReceiveProps(props) {
    this.setState(props.current.rgb().object());
  }

  change(part, {target: {value}}) {
    this.setState({[part]: value}, () => {
      const color = safeColor(this.state);
      if (color) {
        this.props.onChange(color);
      }
    });
  }

}

function safeColor(input) {
  try {
    return color(input);
  } catch (error) {
    return null;
  }
}
