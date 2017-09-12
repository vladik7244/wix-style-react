import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Backoffice/Button';

import {SBStateless as sbstateless} from 'stylable-react-component';
import styles from './FooterLayout.st.css';

const FooterLayout = ({children, theme, cancelText, onCancel, onOk, confirmText, buttonsHeight, enableOk, enableCancel}) => {

  return (
    <div data-hook="message-box-footer">
      {children}
      <div className="footerbuttons">
        {cancelText ?
          <Button disabled={!enableCancel} height={buttonsHeight} theme={'empty' + theme} onClick={onCancel} dataHook="cancellation-button" >
            {cancelText}
          </Button> : null
        }
        <Button disabled={!enableOk} height={buttonsHeight} theme={'full' + theme} onClick={onOk} dataHook="confirmation-button">
          {confirmText}
        </Button>
      </div>
    </div>
  );
};

FooterLayout.propTypes = {
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  onCancel: PropTypes.func,
  onOk: PropTypes.func,
  enableOk: PropTypes.bool,
  enableCancel: PropTypes.bool,
  theme: PropTypes.string,
  buttonsHeight: PropTypes.string,
  children: PropTypes.any
};

FooterLayout.defaultProps = {
  theme: 'blue',
  buttonsHeight: 'small',
  enableOk: true,
  enableCancel: true
};

const StylableFooterLayout = sbstateless(FooterLayout, styles);
StylableFooterLayout.propTypes = FooterLayout.propTypes;
StylableFooterLayout.defaultProps = FooterLayout.defaultProps;
export default StylableFooterLayout;
