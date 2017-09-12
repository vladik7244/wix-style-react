import React from 'react';
import PropTypes from 'prop-types';
import SvgX from '../svg/X.js';

import {stylable} from 'wix-react-tools';
import styles from './HeaderLayout.st.css';

const HeaderLayout = ({title, onCancel, theme, closeButton}) => {

  return (
    <div className={`${theme}`} data-hook="header-layout">
      <span className="titleLabel" data-hook="header-layout-title">
        {title}
      </span>
      {closeButton &&
        <button className="close" data-hook="header-close-button" onClick={onCancel}>
          <SvgX width={9} height={9} thickness={1} color={'white'}/>
        </button>
      }
    </div>
  );
};

HeaderLayout.defaultProps = {
  theme: 'blue',
  closeButton: true
};

HeaderLayout.propTypes = {
  title: PropTypes.node,
  onCancel: PropTypes.func,
  closeButton: PropTypes.bool,
  theme: PropTypes.oneOf(['red', 'green', 'blue', 'lightGreen'])
};

const StylableHeaderLayout = stylable(styles)(HeaderLayout);
StylableHeaderLayout.defaultProps = HeaderLayout.defaultProps;
StylableHeaderLayout.propTypes = HeaderLayout.propTypes;
export default StylableHeaderLayout;
