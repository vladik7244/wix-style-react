import React from 'react';
import PropTypes from 'prop-types';
import WixComponent from '../BaseComponents/WixComponent';

import typography, {convertFromUxLangToCss} from '../Typography';

import styles from './styles.scss';

export default class extends WixComponent {
  static propTypes = {
    appearance: PropTypes.oneOf([
      'H0', 'H1', 'H2', 'H2.1', 'H3', 'H4',
      'T1', 'T1.1', 'T1.2', 'T1.3', 'T1.4',
      'T2', 'T2.1', 'T2.2', 'T2.3',
      'T3', 'T3.1', 'T3.2', 'T3.3', 'T3.4',
      'T4', 'T4.1', 'T4.2', 'T4.3',
      'T5', 'T5.1']),
    children: PropTypes.node
  }

  static defaultProps = {
    appearance: 'T1.1'
  }

  getType = appearance =>
    [
      {type: 'h1', candidates: ['H0']},
      {type: 'h2', candidates: ['H1']},
      {type: 'h3', candidates: ['H2', 'H2.1']},
      {type: 'h4', candidates: ['H3']},
      {type: 'h5', candidates: ['H4']}
    ]
      .filter(({candidates}) => candidates.indexOf(appearance) !== -1)
      .reduceRight((acc, {type}) => type, 'span');

  getClassNames = appearance =>
    [
      {className: styles.headingDefaults, candidates: ['H0', 'H1', 'H2', 'H2.1', 'H3', 'H4']}
    ]
      .filter(({candidates}) => candidates.indexOf(appearance) !== -1)
      .reduce((acc, {className}) =>
        acc.concat(className),
        [typography[convertFromUxLangToCss(appearance)]])
      .join(' ');

  render() {
    const {appearance, children} = this.props;

    return React.createElement(
      this.getType(appearance),
      {className: this.getClassNames(appearance)},
      children
    );
  }
}

