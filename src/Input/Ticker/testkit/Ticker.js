import React from 'react';
import {Simulate, renderIntoDocument} from 'react-dom/test-utils';

import Ticker from '../index';

import styles from '../Ticker.st.css';
import {hasCssState} from '../../../stylable-has-css-state';

export const tickerDriverFactory = component => {
  const handlers = {
    getUp: () => component.querySelector(`.${styles.up}`),
    getDown: () => component.querySelector(`.${styles.down}`),
    clickUp: () => Simulate.click(handlers.getUp()),
    clickDown: () => Simulate.click(handlers.getDown()),
    isUpDisabled: () => hasCssState(handlers.getUp(), styles, {disabled: true}),
    isDownDisabled: () => hasCssState(handlers.getDown(), styles, {disabled: true}),
    exists: () => !!component
  };
  return handlers;
};

export const componentFactory = (props = {}) =>
  renderIntoDocument(<div><Ticker {...props}/></div>).childNodes[0];

export const tickerTestkitFactory = ({wrapper}) =>
  tickerDriverFactory(wrapper.querySelector('[data-hook=ticker]'));
