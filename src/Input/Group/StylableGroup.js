import React from 'react';
import PropTypes from 'prop-types';

import {stylable} from 'wix-react-tools';
import styles from './Group.st.css';

const Group = ({children}) =>
  <div>
    {children}
  </div>;

Group.displayName = 'Input.Group';
Group.propTypes = {
  children: PropTypes.node
};

const StylableGroup = stylable(styles)(Group);
StylableGroup.displayName = Group.displayName;
StylableGroup.propTypes = Group.propTypes;

export default StylableGroup;
