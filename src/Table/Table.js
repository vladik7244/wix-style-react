
import React from 'react';
import WixComponent from '../BaseComponents/WixComponent';
import {TopFixedTable} from './TopFixedTable';
import {FixedTable} from './FixedTable';

export class Table extends WixComponent {
  render() {
    return (
      <div id={this.props.id}>
        {this.props.stickToTop ? <TopFixedTable {...this.props} /> :
          <FixedTable {...this.props} />}
      </div>
    );
  }
}
