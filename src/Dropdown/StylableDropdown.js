import React from 'react';
import isUndefined from 'lodash/isUndefined';
import InputWithOptions from '../InputWithOptions';

import {stylable} from 'wix-react-tools';
import styles from './Dropdown.st.css';

@stylable(styles)
export default class Dropdown extends InputWithOptions {

  static propTypes = InputWithOptions.propTypes;

  static defaultProps = InputWithOptions.defaultProps;

  constructor(props) {
    super(props);
    this.update(props, {isFirstTime: true});
  }

  update(props, {isFirstTime}) {
    let value = '', selectedId = -1;
    if (!isUndefined(props.selectedId)) {
      const option = props.options.find(option => {
        return option.id === props.selectedId;
      });

      if (option) {
        value = props.valueParser(option);
        selectedId = option.id;
      }
    }

    if (isFirstTime) {
      this.state = {value, selectedId};
    } else {
      this.setState({value, selectedId});
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.selectedId !== nextProps.selectedId) {
      this.update(nextProps, {isFirstTime: false});
    }
  }

  dropdownAdditionalProps() {
    return {selectedId: this.state.selectedId, value: this.state.value};
  }

  inputAdditionalProps() {
    return {readOnly: true, value: this.state.value};
  }

  _onSelect(option) {
    this.setState({value: this.props.valueParser(option), selectedId: option.id});
    super._onSelect(option);
  }

  render() {
    return React.cloneElement(super.render(), {
      'style-state': {
        noBorder: this.props.noBorder,
        noRightBorderRadius: this.props.noRightBorderRadius
      }
    });
  }
}
