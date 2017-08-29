import React from 'react';
import PropTypes from 'prop-types';
import Tag from '../Tag/Tag';
import Input from '../Input';
import styles from './InputWithTags.scss';
import omit from 'omit';
import classNames from 'classnames';

class InputWithTags extends React.Component {
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

  handleInputChange = e => {
    if (!this.props.delimiters.includes(e.target.value)) {
      this.setState({inputValue: e.target.value});
      this.props.onChange && this.props.onChange(e);
    }
  };

  render() {
    const {tags, onRemoveTag, placeholder, error, disabled, ...inputProps} = this.props;

    const hasFocus = this.state.inputHasFocus;

    const className = classNames({
      [styles.tagsContainer]: true,
      [styles.disabled]: disabled,
      [styles.error]: error,
      [styles.hasFocus]: hasFocus
    });

    const validInputProps = omit([
      'onManuallyInput', 'inputElement', 'closeOnSelect', 'predicate', 'menuArrow',
      'onClickOutside', 'fixedHeader', 'fixedFooter', 'dataHook', 'delimiters'
    ], inputProps);

    const fontSize = (validInputProps.size && validInputProps.size === 'small') ? '14px' : '16px';

    return (
      <div
        className={className}
        style={{maxHeight: this.props.maxHeight}}
        onClick={() => this.handleInputFocus()}
        data-hook={this.props.dataHook}
        >
        {tags.map(({label, ...rest}) => <Tag key={rest.id} disabled={disabled} onRemove={onRemoveTag} {...rest}>{label}</Tag>)}
        <span className={styles.input} data-hook="inner-input-with-tags">
          <div className={styles.hiddenDiv} style={{fontSize}}>
            {this.state.inputValue}
          </div>

          <Input
            {...validInputProps}
            ref={input => this.input = input}
            onBlur={() => this.handleInputBlur()}
            placeholder={tags.length === 0 ? placeholder : ''}
            disabled={disabled}
            onChange={this.handleInputChange}
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

InputWithTags.propTypes = {
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
  onChange: PropTypes.func,
  delimiters: PropTypes.arrayOf(PropTypes.string)
};

InputWithTags.defaultProps = {
  onRemoveTag: () => {},
  tags: [],
  placeholder: '',
  delimiters: []
};

export default InputWithTags;
