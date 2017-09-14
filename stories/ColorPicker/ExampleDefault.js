import React from 'react';
import {func} from 'prop-types';
import Template from './Template';
import {Input, Label, ToggleSwitch} from 'wix-style-react';

import s from './ExampleDefault.scss';

export default class ExampleDefault extends React.Component {

  state = {
    value: '#cccccc',
    showHistory: true,
    showConverter: true,
    showInput: true,
  };

  static propTypes = {
    onChange: func
  };

  render() {
    return (<div className={s.root}>
      <div className={s.left}>
        <div className={s.row}>
          <Label>Color</Label>
          <Input value={this.state.value} onChange={e => this.setState({value: e.target.value})} />
        </div>
        <div className={s.row}>
          <ToggleSwitch checked={this.state.showHistory} onChange={() => this.setState({showHistory: !this.state.showHistory})} />
          <Label>Show history</Label>
        </div>
        <div className={s.row}>
          <ToggleSwitch checked={this.state.showConverter} onChange={() => this.setState({showConverter: !this.state.showConverter})} />
          <Label>Show converter</Label>
        </div>
        <div className={s.row}>
          <ToggleSwitch checked={this.state.showInput} onChange={() => this.setState({showInput: !this.state.showInput})} />
          <Label>Show input</Label>
        </div>
      </div>
      <div className={s.right}>
        <Template {...this.state} onChangeColor={value => this.setState({value})} onChange={this.props.onChange} />
      </div>
    </div>);
  }
};
