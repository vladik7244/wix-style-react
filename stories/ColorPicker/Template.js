import React, {Component} from 'react';
import {oneOfType, string, object, bool, func} from 'prop-types';
import reactElementToJSXString from 'react-element-to-jsx-string';
import ColorPicker from 'wix-style-react/ColorPicker';

export default class Template extends Component {

  static propTypes = {
    value: oneOfType([string, object]),
    showHistory: bool,
    showConverter: bool,
    showInput: bool,
    onChangeColor: func,
    onChange: func
  };

  componentDidUpdate(props) {
    props.onChange(reactElementToJSXString(this.getComponent()));
  }

  componentDidMount() {
    this.props.onChange(reactElementToJSXString(this.getComponent()));
  }

  getComponent() {
    return (
      <ColorPicker
        value={this.props.value}
        showHistory={this.props.showHistory}
        showConverter={this.props.showConverter}
        showInput={this.props.showInput}
        onChange={this.props.onChangeColor}
        onCancel={() => {}}
        onConfirm={() => {}}
        />
    );
  }

  render() {
    return this.getComponent();
  }

}
