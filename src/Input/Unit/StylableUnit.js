import React from 'react';
import PropTypes from 'prop-types';

import {stylable} from 'wix-react-tools';
import styles from './Unit.st.css';
import inputStyles from '../Input.st.css';

const Unit = ({children, value}) =>
  <div
    className={inputStyles.unit}
    data-hook="unit"
    >
    {value || children}
  </div>;

Unit.displayName = 'Input.Unit';
Unit.propTypes = {
  children: PropTypes.node,
  value: PropTypes.string
};

const StylableUnit = stylable(styles)(Unit);
StylableUnit.displayName = Unit.displayName;
StylableUnit.propTypes = Unit.propTypes;

export default StylableUnit;
