import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from '../Tooltip';
import Trash3 from '../Icons/dist/components/Trash3';
import Replace from '../Icons/dist/components/Replace';
import Plus2 from '../Icons/dist/components/Plus2';
import WixComponent from '../BaseComponents/WixComponent';

import {stylable} from 'wix-react-tools';
import styles from './ImageViewer.st.css';

@stylable(styles)
export default class ImageViewer extends WixComponent {

  static propTypes = {
    imageUrl: PropTypes.string,
    onAddImage: PropTypes.func,
    onUpdateImage: PropTypes.func,
    onRemoveImage: PropTypes.func
  };

  render() {
    const {
      imageUrl,
      onAddImage,
      onUpdateImage,
      onRemoveImage
    } = this.props;

    const tooltipCommonProps = {
      showDelay: 0,
      hideDelay: 0,
      align: 'center',
      placement: 'top',
      moveBy: {x: 2, y: 0}
    };

    return (
      <div style-state={{hasLogo: !!imageUrl}}>
        <div data-hook="add-image" className="addLogo" onClick={onAddImage}>
          <div className="dashedBorder"/>
          <div className="plusIcon"><Plus2 size="47px"/></div>
        </div>
        {!!imageUrl &&
        <div className="changeLogoContainer">
          <div className="imageLayout">
            <img data-hook="image-viewer-image" className="image" src={imageUrl}/>
          </div>
          <div className="imageBackground">
            <div className="buttons">
              <Tooltip content="Replace" {...tooltipCommonProps}>
                <div data-hook="update-image" className="button" onClick={onUpdateImage}>
                  <Replace size="1.2em"/>
                </div>
              </Tooltip>
              <Tooltip content="Remove" {...tooltipCommonProps}>
                <div data-hook="remove-image" className="button" onClick={onRemoveImage}>
                  <Trash3 size="1.2em"/>
                </div>
              </Tooltip>
            </div>
          </div>
        </div>
        }
      </div>
    );
  }
}
