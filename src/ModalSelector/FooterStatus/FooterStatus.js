import React from 'react';
import PropTypes from 'prop-types';
import WixComponent from '../../BaseComponents/WixComponent';
import Checkbox from '../../Checkbox';

class FooterStatus extends WixComponent {
  static propTypes = {
    onCheckBoxClick: PropTypes.func,
    text: PropTypes.string,
    checked: PropTypes.bool
  }

  static defaultProps = {
    onCheckBoxClick: () => {}
  }

  render() {
    const {
      onCheckBoxClick,
      text,
      checked
    } = this.props;

    return (
      <div
        style={{paddingLeft: '32px'}}
        >
        <Checkbox
          checked={checked}
          indeterminate
          onChange={() => onCheckBoxClick()}
          />
        {text}
      </div>
    );
  }
}

export default FooterStatus;
