import React from 'react';
import PropTypes from 'prop-types';
import Tag from '../Tag/Tag';
import Input from '../Input';
import omit from 'omit';
import isUndefined from 'lodash/isUndefined';

import {stylable} from 'wix-react-tools';
import styles from './InputWithTags.st.css';

@stylable(styles)
export default class InputWithTags extends React.Component {
  static propTypes = {
    onRemoveTag: PropTypes.func,
    tags: PropTypes.array,
    maxHeight: PropTypes.string,
    onKeyDown: PropTypes.func,
    dataHook: PropTypes.string,
    placeholder: PropTypes.string,
    onFocus: PropTypes.func,
    autoFocus: PropTypes.bool,
    disabled: PropTypes.bool,
    error: PropTypes.bool,
    delimiters: PropTypes.array
  };

  static defaultProps = {
    onRemoveTag: () => {},
    tags: [],
    placeholder: '',
    delimiters: []
  };

  constructor(props) {
    super(props);
    this.focus = this.focus.bind(this);
    this.blur = this.blur.bind(this);
    this.select = this.select.bind(this);

    this.state = {inputValue: '', inputHasFocus: false};
  }

  componentDidMount() {
    this.props.autoFocus && this.props.onFocus();
  }

  handleInputFocus() {
    this.input.focus();
    this.setState({inputHasFocus: true});
  }

  handleInputBlur() {
    this.setState({inputHasFocus: false});
  }

  render() {
    const {tags, onRemoveTag, placeholder, error, disabled, delimiters, ...inputProps} = this.props;
    const hasFocus = this.state.inputHasFocus;

    const desiredProps = omit(['onManuallyInput', 'inputElement', 'closeOnSelect', 'predicate', 'menuArrow', 'onClickOutside', 'fixedHeader', 'fixedFooter', 'dataHook'], inputProps);
    const fontSize = (desiredProps.size && desiredProps.size === 'small') ? '14px' : '16px';

    return (
      <div
        style-state={{disabled, error, hasFocus, hasMaxHeight: !isUndefined(this.props.maxHeight)}}
        style={{maxHeight: this.props.maxHeight}}
        onClick={() => this.handleInputFocus()}
        data-hook={this.props.dataHook}
        >
        {tags.map(({label, ...rest}) => <Tag key={rest.id} disabled={disabled} onRemove={onRemoveTag} {...rest}>{label}</Tag>)}
        <span className="input" data-hook="inner-input-with-tags">
          <div className="hiddenDiv" style={{fontSize}}>
            {this.state.inputValue}
          </div>

          <Input
            ref={input => this.input = input}
            onBlur={() => this.handleInputBlur()}
            placeholder={tags.length === 0 ? placeholder : ''}
            {...desiredProps}
            disabled={disabled}
            onChange={e => {
              if (!delimiters.includes(e.target.value)) {
                this.setState({inputValue: e.target.value});
                desiredProps.onChange && desiredProps.onChange(e);
              }
            }}
            />
        </span>
      </div>
    );
  }

  focus() {
    this.input.focus();
  }

  blur() {
    this.input.blur();
  }

  select() {
    this.input.select();
  }
}
