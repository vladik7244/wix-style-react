import React from 'react';
import PropTypes from 'prop-types';
import WixComponent from '../BaseComponents/WixComponent';
import SmallX from '../Icons/dist/components/SmallX';

import {stylable} from 'wix-react-tools';
import styles from './Tag.st.css';

@stylable(styles)
export default class Tag extends WixComponent {
  static propTypes = {
    children: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    thumb: PropTypes.element,
    onRemove: PropTypes.func,
    removable: PropTypes.bool,
    size: PropTypes.oneOf(['small', 'large']),
    wrap: PropTypes.bool,
    disabled: PropTypes.bool,
    theme: PropTypes.oneOf(['standard', 'error', 'warning'])
  };

  static defaultProps = {
    onRemove: () => {},
    size: 'small',
    removable: true,
    theme: 'standard'
  };

  render() {
    const {id, children, thumb, removable, onRemove, size, wrap, disabled, theme} = this.props;

    const title = wrap ? children : '';

    return (
      <span
        style-state={{disabled, large: size === 'large', tagWrap: wrap}}
        className={`${theme}-theme`}
        disabled={disabled}
        id={id}
        title={title}
        >
        {thumb && <span className="thumb">{thumb}</span>}
        <span style-state={{innerTagWrap: wrap}} className="innerChildren">{children}</span>
        {removable && !disabled && <a className="tagRemoveButton" onClick={() => onRemove(id)}><SmallX/></a>}
      </span>
    );
  }
}
