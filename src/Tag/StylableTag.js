import React from 'react';
import PropTypes from 'prop-types';
import WixComponent from '../BaseComponents/WixComponent';
import SmallX from '../Icons/dist/components/SmallX';

import {SBComponent as sbcomponent} from 'stylable-react-component';
import styles from './Tag.st.css';

class Tag extends WixComponent {
  render() {
    const {id, children, thumb, removable, onRemove, size, wrap, disabled, theme} = this.props;

    const title = wrap ? children : '';

    return (
      <span
        cssStates={{disabled, large: size === 'large', tagWrap: wrap}}
        className={`${theme}-theme`}
        disabled={disabled}
        id={id}
        title={title}
        >
        {thumb && <span className="thumb">{thumb}</span>}
        <span cssStates={{innerTagWrap: wrap}} className="innerChildren">{children}</span>
        {removable && !disabled && <a className="tagRemoveButton" onClick={() => onRemove(id)}><SmallX/></a>}
      </span>
    );
  }
}

Tag.propTypes = {
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

Tag.defaultProps = {
  onRemove: () => {},
  size: 'small',
  removable: true,
  theme: 'standard'
};

export default sbcomponent(Tag, styles);
