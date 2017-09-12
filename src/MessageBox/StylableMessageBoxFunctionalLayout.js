import React from 'react';
import PropTypes from 'prop-types';
import HeaderLayout from './StylableHeaderLayout';
import FooterLayout from './StylableFooterLayout';
import WixComponent from '../BaseComponents/WixComponent';

import {stylable} from 'wix-react-tools';
import styles from './MessageBoxFunctionalLayout.st.css';

@stylable(styles)
export default class MessageBoxFunctionalLayout extends WixComponent {

  static propTypes = {
    hideFooter: PropTypes.bool,
    confirmText: PropTypes.string,
    cancelText: PropTypes.string,
    theme: PropTypes.string,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
    onClose: PropTypes.func,
    width: PropTypes.string,
    title: PropTypes.node,
    children: PropTypes.any,
    buttonsHeight: PropTypes.string,
    closeButton: PropTypes.bool,
    disableCancel: PropTypes.bool,
    disableConfirmation: PropTypes.bool
  };

  static defaultProps = {
    buttonsHeight: 'small',
    disableCancel: false,
    disableConfirmation: false,
    width: '600px'
  };

  render() {
    const {
      title,
      onCancel,
      onOk,
      onClose,
      confirmText,
      cancelText,
      children,
      buttonsHeight,
      hideFooter,
      theme,
      closeButton,
      disableConfirmation,
      disableCancel,
      width
    } = this.props;

    return (
      <div style={{width}}>
        <HeaderLayout title={title} onCancel={onClose ? onClose : onCancel} theme={theme} closeButton={closeButton}/>
        <div className="body">
          {children}
        </div>
        {
          !hideFooter ?
            <FooterLayout enableCancel={!disableCancel} enableOk={!disableConfirmation} buttonsHeight={buttonsHeight} confirmText={confirmText} cancelText={cancelText} onCancel={onCancel} onOk={onOk} theme={theme}/> : null
        }
      </div>
    );
  }
}
