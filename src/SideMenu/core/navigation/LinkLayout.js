import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './styles.scss';

const LinkLayout = ({children, isDiminishedHover, isActive, ...rest}) => {
  const {className, ...additionals} = rest;
  return (
      <span
        className={classnames(
          className,
        {
          [styles.linkLayout]: true,
          [styles.linkActive]: isActive,
          [styles.linkDiminishedHover]: isDiminishedHover,
        })}
        data-hook="menu-navigation-link-wrapper"
        {...additionals}
        >
        {children}
      </span>;
  );
}

LinkLayout.propTypes = {
  children: PropTypes.node,
  isActive: PropTypes.bool,
  isDiminishedHover: PropTypes.bool
};

export default LinkLayout;
