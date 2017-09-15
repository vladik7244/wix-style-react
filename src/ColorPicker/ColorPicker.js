import React from 'react';
import color from 'color';
import PropTypes from 'prop-types';

import WixComponent from '../BaseComponents/WixComponent';
import Tabs from '../Tabs';
import Input from '../Input';
import ColorPickerActions from './color-picker-actions';

import s from './ColorPicker.scss';

const HEX = 'HEX';
const RGB = 'RGB';
const HSB = 'HSB';

const colorConverterTabs = [
  {id: HEX, title: HEX},
  {id: RGB, title: RGB},
  {id: HSB, title: HSB}
];

/**
 * Color Picker
 *
 * Under the hood uses color manipulation library [https://github.com/Qix-/color](https://github.com/Qix-/color).
 * Value for this component can be given in `string` or `object` format.
 * The callbacks always respond with color `object` format.
 */
class ColorPicker extends WixComponent {

  static displayName = 'ColorPicker';

  static propTypes = {
    /** Current color, can be given in `string` or `object` format [https://github.com/Qix-/color](https://github.com/Qix-/color) */
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    /** Should current/previous color be displayed */
    showHistory: PropTypes.bool,
    /** Should `HEX`/`RGB`/`HSB` converter tabs be displayed */
    showConverter: PropTypes.bool,
    /** Should color input (in `HEX` mode) be displayed */
    showInput: PropTypes.bool,
    /** Handle color change event */
    onChange: PropTypes.func.isRequired,
    /** Handle cancel button click */
    onCancel: PropTypes.func.isRequired,
    /** Handle confirm button click */
    onConfirm: PropTypes.func.isRequired
  }

  static defaultProps = {
    showHistory: false,
    showConverter: true,
    showInput: true
  }

  constructor(props) {
    super(props);
    this.changeTab = this.changeTab.bind(this);
    this.changeColor = this.changeColor.bind(this);
    this.state = {
      activeTab: HEX,
      currentValue: color(props.value),
      previousValue: color(props.value)
    }
  }

  render() {

    const {
      showHistory,
      showInput,
      showConverter
    } = this.props;

    let hue = this.state.currentValue.hsl();
    hue.color[1] = 100;
    hue.color[2] = 50;

    return (
        <div className={s.root}>
          <div className={s.palette}>
            <div className={s.hue} style={{background: hue.hex()}}/>
            <div className={s.saturation}/>
            <div className={s.brightness}/>
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
            <Tabs items={colorConverterTabs} activeId={this.state.activeTab} onClick={this.changeTab} />
          </div>}
          {(showConverter || showInput) && <div className={s.input}>
            {this.state.activeTab === HEX && <div>
              <Input size="small" value={this.state.currentValue.hex()} onChange={this.changeColor} />
            </div>}
            {this.state.activeTab === RGB && <div className={s.distribute}>
              <Input size="small" value={this.state.currentValue.red()} />
              <Input size="small" value={this.state.currentValue.green()} />
              <Input size="small" value={this.state.currentValue.blue()} />
            </div>}
            {this.state.activeTab === HSB && <div className={s.distribute}>
              <Input size="small" value={this.state.currentValue.hue()} />
              <Input size="small" value={this.state.currentValue.saturationv()} />
              <Input size="small" value={this.state.currentValue.lightness()} />
            </div>}
          </div>}
          <ColorPickerActions
            onConfirm={this.props.onConfirm}
            onCancel={this.props.onCancel}
            />
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

  changeColor({target: {value}}) {
    this.setState({currentValue: color(value)});
    this.props.onChange(value);
  }

}
export default ColorPicker;
