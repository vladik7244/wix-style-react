import React, {Component} from 'react';
import {object, bool, func} from 'prop-types';
import reactElementToJSXString from 'react-element-to-jsx-string';
import ColorPicker from 'wix-style-react/ColorPicker';

export class Template extends Component {

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
          onChange={this.props.onChangeColor} />
    );
  }

  render() {
    return this.getComponent();
  }
}

Template.propTypes = {
  value: object,
  showHistory: bool,
  showConverter: bool,
  showInput: bool,
  onChangeColor: func,
  onChange: func
};


export default Template;

