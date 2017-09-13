import React from 'react';
import PropTypes from 'prop-types';

import {stylable} from 'wix-react-tools';
import styles from './EndorseContentLayout.st.css';

const EndorseContentLayout = ({head, content, primaryCta, secondaryCta}) =>
  <div className="rootElement">
    { head && <div className="head">{head}</div> }
    { content && <div className="content">{content}</div> }
    { primaryCta && <div className="primaryCta">{primaryCta}</div> }
    { secondaryCta && <div className="secondaryCta">{secondaryCta}</div> }
  </div>;

EndorseContentLayout.propTypes = {
  head: PropTypes.node,
  content: PropTypes.node,
  primaryCta: PropTypes.node,
  secondaryCta: PropTypes.node
};

const StylableEndorseContentLayout = stylable(styles)(EndorseContentLayout);
StylableEndorseContentLayout.propTypes = EndorseContentLayout.propTypes;

export default StylableEndorseContentLayout;

