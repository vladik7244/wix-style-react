import React from 'react';
import {bool, node, object, func, oneOfType, string} from 'prop-types';
import color from 'color';
import WixComponent from '../BaseComponents/WixComponent';

import Tabs from '../Tabs';
import Input from '../Input';
import Button from '../Button';
import {Close, V} from '../Icons';

import s from './ColorPicker.scss';

const tabs = [{id: 'hex', title: 'HEX'}, {id: 'rgb', title: 'RGB'}, {id: 'hsb', title: 'HSB'}];

class ColorPicker extends WixComponent {

  static propTypes = {
    value: oneOfType([string, object]),
    showHistory: bool,
    showConverter: bool,
    showInput: bool,
    onChange: func,
    onCancel: func,
    onConfirm: func
  };

  static defaultProps = {
    showHistory: true,
    showConverter: true,
    showInput: true
  };

  state = {
    activeTab: 'hex',
    currentValue: '',
    previousValue: ''
  };

  constructor(props) {
    super(props);
    this.changeTab = this.changeTab.bind(this);
    this.changeColor = this.changeColor.bind(this);
    this.state.currentValue = color(props.value);
    this.state.previousValue = color(props.value);
  }

  render() {

    const {showHistory, showInput, showConverter} = this.props;

    let hue = this.state.currentValue.hsl();
    hue.color[1] = 100;
    hue.color[2] = 50;

    return (
        <div className={s.root}>
          <div className={s.palette}>
            <div className={s.hue} style={{background: hue.hex()}} />
            <div className={s.saturation}/>
            <div className={s.brightness} />
            <div className={s.circle} style={{
              left: this.state.currentValue.saturationv()  + '%',
              top: (100 - this.state.currentValue.lightness()) + '%'
            }} />
          </div>
          <div className={s.spectrum}>
            <div className={s.circle} style={{left: this.state.currentValue.hue()/360*100 + '%'}} />
          </div>
          {showHistory && <div className={s.history}>
            <div className={s.previous} style={{background: this.state.previousValue.hex()}}/>
            <div className={s.current} style={{background: this.state.currentValue.hex()}}/>
          </div>}
          {showConverter && <div className={s.converter}>
            <Tabs items={tabs} activeId={this.state.activeTab} onClick={this.changeTab} />
          </div>}
          {(showConverter || showInput) && <div className={s.input}>
            {this.state.activeTab === 'hex' && <div>
              <Input size="small" value={this.state.currentValue.hex()} onChange={e => this.changeColor(e.target.value)} />
            </div>}
            {this.state.activeTab === 'rgb' && <div className={s.distribute}>
              <Input size="small" value={this.state.currentValue.red()} />
              <Input size="small" value={this.state.currentValue.green()} />
              <Input size="small" value={this.state.currentValue.blue()} />
            </div>}
            {this.state.activeTab === 'hsb' && <div className={s.distribute}>
              <Input size="small" value={this.state.currentValue.hue()} />
              <Input size="small" value={this.state.currentValue.saturationv()} />
              <Input size="small" value={this.state.currentValue.lightness()} />
            </div>}
          </div>}
          <div className={s.actions}>
            <Button heigth="small" theme="icon-standardsecondary">
              <Close size="12px" onClick={this.props.onCancel} />
            </Button>
            <Button heigth="small" theme="icon-standard">
              <V size="12px" onClick={this.props.onConfirm} />
            </Button>
          </div>
        </div>);
  }

  componentWillReceiveProps(newProps) {
    if (color(newProps.value).rgbNumber() !== this.state.currentValue.rgbNumber()) {
      this.setState({currentValue: color(newProps.value)})
    }
  }

  changeTab({id}) {
    this.setState({activeTab: id});
  }

  changeColor(value) {
    this.setState({currentValue: color(value)});
    this.props.onChange(value);
  }

}
export default ColorPicker;
