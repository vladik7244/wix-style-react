import React from 'react';
import PropTypes from 'prop-types';
import WixComponent from '../BaseComponents/WixComponent';

import Button from '../Backoffice/Button';
import SvgX from '../svg/X.js';

import {SBComponent as sbcomponent} from 'stylable-react-component';
import styles from './MessageBoxMarketerialLayout.st.css';

class MessageBoxMarketerialLayout extends WixComponent {

  render() {
    const {title, content, primaryButtonLabel, secondaryButtonLabel, onPrimaryButtonClick, onSecondaryButtonClick, imageUrl, onClose, theme, imageComponent} = this.props;

    return (
      <div>
        <div className={`header header-${theme}`}>
          <button className="close" onClick={onClose} data-hook="close-button">
            <SvgX width={9} height={9} thickness={1} color={'white'}/>
          </button>
          { imageComponent ?
            <div className="headerImageComponent">{imageComponent}</div> :
            <div className="headerImage">
              <img src={imageUrl} data-hook="header-image"/>
            </div>
          }
        </div>
        <div className="title" data-hook="message-box-title">
          {title}
        </div>
        <div className="content">
          {content}
        </div>
        <div className="buttonsContainer">
          { primaryButtonLabel ?
            <div className="primaryButtonContainer">
              <Button theme={`full${theme}`} onClick={onPrimaryButtonClick} dataHook="primary-button">{primaryButtonLabel}</Button>
            </div> : null
          }
          { secondaryButtonLabel ?
            <div className="secondaryButtonContainer">
              <span onClick={onSecondaryButtonClick} data-hook="secondary-button">
                {secondaryButtonLabel}
              </span>
            </div> : null
          }
        </div>
      </div>
    );
  }
}

MessageBoxMarketerialLayout.propTypes = {
  title: PropTypes.node.isRequired,
  content: PropTypes.node.isRequired,
  primaryButtonLabel: PropTypes.string.isRequired,
  secondaryButtonLabel: PropTypes.string,
  onPrimaryButtonClick: PropTypes.func,
  onSecondaryButtonClick: PropTypes.func,
  imageUrl: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  imageComponent: PropTypes.node,
  theme: PropTypes.oneOf([
    'blue',
    'purple'
  ])
};

MessageBoxMarketerialLayout.defaultProps = {
  theme: 'blue'
};

export default sbcomponent(MessageBoxMarketerialLayout, styles);
