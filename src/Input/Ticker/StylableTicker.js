import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import {SBStateless as sbstateless} from 'stylable-react-component';
import styles from './Ticker.st.css';

const ArrowUp = () =>
  <svg width="10" height="4" viewBox="0 0 10 4" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 4L5 0 1 4" stroke="#3899EC" fill="none" fillRule="evenodd"/>
  </svg>;

const Ticker = ({onUp, onDown, upDisabled, downDisabled}) => {
  return (
    <div data-hook="ticker">
      <div cssStates={{disabled: upDisabled}} className="up" onClick={upDisabled ? null : onUp}><ArrowUp/></div>
      <div cssStates={{disabled: downDisabled}} className="down" onClick={downDisabled ? null : onDown}><ArrowUp/></div>
    </div>
  );
};

Ticker.displayName = 'Input.Ticker';

Ticker.propTypes = {
  onUp: PropTypes.func,
  onDown: PropTypes.func,
  upDisabled: PropTypes.bool,
  downDisabled: PropTypes.bool
};

const StylableTicker = sbstateless(Ticker, styles);
StylableTicker.displayName = Ticker.displayName;
StylableTicker.propTypes = Ticker.propTypes;

export default StylableTicker;
