import React from 'react';
import PropTypes from 'prop-types';

import {SBStateless as sbstateless} from 'stylable-react-component';
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

const StylableUnit = sbstateless(Unit, styles);
StylableUnit.displayName = Unit.displayName;
StylableUnit.propTypes = Unit.propTypes;

export default StylableUnit;
