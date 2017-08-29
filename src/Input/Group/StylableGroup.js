import React from 'react';
import PropTypes from 'prop-types';

import {SBStateless as sbstateless} from 'stylable-react-component';
import styles from './Group.st.css';

const Group = ({children}) =>
  <div>
    {children}
  </div>;

Group.displayName = 'Input.Group';
Group.propTypes = {
  children: PropTypes.node
};

const StylableGroup = sbstateless(Group, styles);
StylableGroup.displayName = Group.displayName;
StylableGroup.propTypes = Group.propTypes;

export default StylableGroup;
