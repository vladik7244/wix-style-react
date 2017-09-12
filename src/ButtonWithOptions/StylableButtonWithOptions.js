import React from 'react';
import PropTypes from 'prop-types';
import WixComponent from '../BaseComponents/WixComponent';
import omit from 'omit';
import DropdownLayout from '../DropdownLayout';
import Button from '../Button';

import {stylable} from 'wix-react-tools';
import styles from './ButtonWithOptions.st.css';

const Option = function () {
  return null;
};
Option.displayName = 'ButtonWithOptions.Option';

const StaticButton = function (props) {
  return <Button {...props}/>;
};
StaticButton.displayName = 'ButtonWithOptions.Button';

@stylable(styles)
export default class ButtonWithOptions extends WixComponent {
  static defaultProps = {
    ...DropdownLayout.defaultProps,
    onSelect: () => {
    },
    options: [],
    closeOnSelect: true,
    valueParser: option => option.value,
    dropdownOffsetLeft: '0',
    restrainDropdownSize: true
  };

  static propTypes = {
    ...DropdownLayout.propTypes,
    closeOnSelect: PropTypes.bool,
    valueParser: PropTypes.func,
    dropdownWidth: PropTypes.string,
    dropdownOffsetLeft: PropTypes.string,
    restrainDropdownSize: PropTypes.bool,
    children: PropTypes.arrayOf((propValue, key) => {
      if (key === 0 && propValue[key].type !== ButtonWithOptions.Button) {
        return new Error(`ButtonWithOptions: Invalid Prop children, first child must be ButtonWithOptions.Button`);
      }

      if (key !== 0) {
        React.Children.forEach(propValue[key], item => {
          if (item.type !== ButtonWithOptions.Option) {
            return new Error(`ButtonWithOptions: Invalid Prop children was given. Validation failed on child number ${key}`);
          }
        });
      }
    })
  };

  static Option = Option;

  static Button = StaticButton;

  // Abstraction
  dropdownAdditionalProps() {
  }

  constructor(props) {
    super(props);
    this.state = {
      showOptions: false,
    };

    this._onSelect = this._onSelect.bind(this);
    this._onKeyDown = this._onKeyDown.bind(this);
    this.hideOptions = this.hideOptions.bind(this);
    this.showOptions = this.showOptions.bind(this);
    this._onCloseKey = this._onCloseKey.bind(this);
    this._renderDropdownLayout = this._renderDropdownLayout.bind(this);
    this.closeOnSelect = this.closeOnSelect.bind(this);

    if (props.children) {
      this.sortChildren(props);
    }
  }

  componentWillReceiveProps(nextProps) {
    this.sortChildren(nextProps);
  }

  sortChildren(props) {
    [this.buttonElement, ...this.optionsElement] = React.Children.toArray(props.children);
  }

  onClickOutside() {
    this.hideOptions();
  }

  renderButton() {
    return React.cloneElement(this.buttonElement, {
      onClick: this.showOptions
    });
  }

  _renderDropdownLayout() {
    const dropdownProps = Object.assign(omit(['dataHook'], this.props), this.dropdownAdditionalProps());
    const customStyle = {marginLeft: this.props.dropdownOffsetLeft};
    if (this.props.dropdownWidth) {
      customStyle.width = this.props.dropdownWidth;
    }

    const dropdownLayoutOptions = React.Children.map(this.optionsElement, option => {
      const {children: value, ...rest} = option.props;
      return {value, ...rest};
    });
    return (
      <div className="dropdownWrapper" style={customStyle}>
        <DropdownLayout
          ref={dropdownLayout => this.dropdownLayout = dropdownLayout}
          {...dropdownProps}
          options={dropdownLayoutOptions}
          theme={this.props.theme}
          visible={this.state.showOptions}
          onClose={this.hideOptions}
          onSelect={this._onSelect}
          onClickOutside={this.hideOptions}
          />
      </div>
    );
  }

  render() {
    const {dropDirectionUp, style} = this.props;
    const sizeRestrictionStyles = this.props.restrainDropdownSize ? {display: 'inline-block'} : {};
    const customStyle = Object.assign({}, sizeRestrictionStyles, style);
    return (
      <div style={customStyle}>
        {dropDirectionUp ? this._renderDropdownLayout() : null}
        <div onKeyDown={this._onKeyDown} onFocus={this._onFocus}>
          {this.renderButton()}
        </div>
        {!dropDirectionUp ? this._renderDropdownLayout() : null}
      </div>
    );
  }

  hideOptions() {
    this.setState({showOptions: false});
  }

  showOptions() {
    this.setState({showOptions: true});
  }

  closeOnSelect() {
    return this.props.closeOnSelect;
  }

  _onCloseKey() {
    if (this.closeOnSelect()) {
      this.hideOptions();
    }
  }

  _onSelect(option, isSelectedOption) {
    this.showOptions();
    const {onSelect} = this.props;

    if (this.closeOnSelect()) {
      this.hideOptions();
    }

    if (isSelectedOption) {
      this.setState({showOptions: false});
    } else if (onSelect) {
      onSelect(option);
    }
  }

  _onKeyDown(event) {
    if (!this.dropdownLayout._onKeyDown(event)) {
      switch (event.key) {
        case 'Enter':
        case 'Tab': {
          this._onCloseKey();
          break;
        }
        default:
          this.showOptions();
      }
    }
  }
}
