
import React from 'react';
import WixComponent from '../BaseComponents/WixComponent';
import {TopFixedTable} from './TopFixedTable';
import {FixedTable} from './FixedTable';

export class Table extends WixComponent {
  render() {
    if (this.props.stickToTop) {
      return <TopFixedTable {...this.props}/>;
    } else {
      return <FixedTable {...this.props}/>;
    }
  }
}
