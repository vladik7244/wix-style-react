import React, {Component} from 'react';
import {func} from 'prop-types';
import {Input, Label, ToggleSwitch} from 'wix-style-react';

import Template from './Template';

import s from './ExampleDefault.scss';

export default class ExampleDefault extends Component {

  static propTypes = {
    onChange: func
  }

  state = {
    value: '#2b8aa3',
    showHistory: true,
    showConverter: true,
    showInput: true,
  }

  render() {

    const {
      value,
      showHistory,
      showConverter,
      showInput
    } = this.state;

    return (
      <div className={s.root}>
        <div className={s.left}>
          <div className={s.row}>
            <Label>Color:</Label>
            <Input
              size="small"
              value={value}
              onChange={e => this.setState({value: e.target.value})}
              />
          </div>
          <div className={s.row}>
            <Label>Show history:</Label>
            <ToggleSwitch
              size="small"
              checked={showHistory}
              onChange={() => this.setState({showHistory: !this.state.showHistory})}
              />
          </div>
          <div className={s.row}>
            <Label>Show converter:</Label>
            <ToggleSwitch
              size="small"
              checked={showConverter}
              onChange={() => this.setState({showConverter: !this.state.showConverter})}
              />
          </div>
          <div className={s.row}>
            <Label>Show input:</Label>
            <ToggleSwitch
              size="small"
              checked={showInput}
              onChange={() => this.setState({showInput: !this.state.showInput})}
              />
          </div>
        </div>
        <div className={s.right}>
          <Template
            {...this.state}
            onChangeColor={value => this.setState({value})}
            onChange={this.props.onChange}
            />
        </div>
      </div>
    );
  }
}
