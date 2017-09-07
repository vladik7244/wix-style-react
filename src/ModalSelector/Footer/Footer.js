import React from 'react';
import PropTypes from 'prop-types';
import WixComponent from '../../BaseComponents/WixComponent';
import FooterLayout from '../../MessageBox/FooterLayout';

class Footer extends WixComponent {
  static propTypes = {
    buttonsHeight: PropTypes.string,
    onCancel: PropTypes.func,
    onOk: PropTypes.func
  }

  static defaultProps = {
    buttonsHeight: 'small'
  }

  render() {
    const {
      onOk,
      onCancel,
      buttonsHeight,
      children
    } = this.props;
    return (
      <FooterLayout
        buttonsHeight={buttonsHeight}
        confirmText="OK"
        cancelText="Cancel"
        onCancel={onCancel}
        onOk={onOk}
        >
        {children}
      </FooterLayout>
    );
  }
}

export default Footer;
