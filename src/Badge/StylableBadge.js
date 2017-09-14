import React from 'react';
import WixComponent from '../BaseComponents/WixComponent';
import {node, oneOf, string} from 'prop-types';

import {convertFromUxLangToCss} from '../Typography';

import {stylable} from 'wix-react-tools';
import styles from './Badge.st.css';

/**
 * General purpose badge component to indicate important (or not so) things
 */
@stylable(styles)
export default class Badge extends WixComponent {
  static propTypes = {
    /** node to render into badge */
    children: node.isRequired,

    /** define purpose of a badge, different color for each type */
    type: oneOf(['default', 'primary', 'success', 'info', 'warning', 'danger', 'businessManagerCounter']),

    /** set `vertical-align` */
    alignment: oneOf(['top', 'bottom', 'middle']),

    /** choose appearance of typography. For Typography examples see storybook **Common** -> **Typography** */
    appearance: oneOf([
      'H0', 'H1', 'H2', 'H2.1', 'H3', 'H4',
      'T1', 'T1.1', 'T1.2', 'T1.3', 'T1.4',
      'T2', 'T2.1', 'T2.2', 'T2.3',
      'T3', 'T3.1', 'T3.2', 'T3.3', 'T3.4',
      'T4', 'T4.1', 'T4.2', 'T4.3',
      'T5', 'T5.1'
    ]),

    /** set the shape */
    shape: oneOf(['ellipse', 'rectangle']),

    /** set one to find component in testing environment */
    dataHook: string
  };

  static defaultProps = {
    type: 'default',
    appearance: 'H4',
    alignment: 'middle',
    shape: 'ellipse'
  };

  static displayName = 'Badge';

  render() {
    const {children, type, appearance, alignment, shape, dataHook} = this.props;

    return (
      <span className={`${type} ${alignment} ${shape} ${convertFromUxLangToCss(appearance)} badge`} data-hook={dataHook}>
        {children}
      </span>
    );
  }
}
