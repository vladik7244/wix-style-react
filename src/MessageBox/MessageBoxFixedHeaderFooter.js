import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import * as styles from './MessageBoxFixedHeaderFooter.scss';
import HeaderLayout from './HeaderLayout';
import FooterLayout from './FooterLayout';
import WixComponent from '../BaseComponents/WixComponent';
import Scrollable from '../Scrollable';

class MessageBoxFixedHeaderFooter extends WixComponent {

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
      width,
      paddingStyle
    } = this.props;

    return (
      <div className={styles.content} style={{width}}>

        <HeaderLayout className={styles.header} title={title} onCancel={onClose ? onClose : onCancel} theme={theme} closeButton={closeButton}/>
        <div className={classNames(styles.body ,styles[`body-${paddingStyle}`])}>
          <Scrollable>
            {children}
          </Scrollable>
        </div>
        {
          !hideFooter ?
            <FooterLayout className={styles.footer} enableCancel={!disableCancel} enableOk={!disableConfirmation} buttonsHeight={buttonsHeight} confirmText={confirmText} cancelText={cancelText} onCancel={onCancel} onOk={onOk} theme={theme}/>
            : null
        }
      </div>
    );
  }
}

MessageBoxFixedHeaderFooter.propTypes = {
  hideFooter: PropTypes.bool,
  fixedHeaderFooter: PropTypes.bool,
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
  paddingStyle: PropTypes.oneOf(['default', 'wide']),
  closeButton: PropTypes.bool,
  disableCancel: PropTypes.bool,
  disableConfirmation: PropTypes.bool
};

MessageBoxFixedHeaderFooter.defaultProps = {
  buttonsHeight: 'small',
  disableCancel: false,
  fixedHeaderFooter: false,
  disableConfirmation: false,
  width: '600px',
  paddingStyle: 'default'
};

export default MessageBoxFixedHeaderFooter;
