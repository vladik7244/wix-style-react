import React from 'react';
import css from './Table.scss';
import WixComponent from '../BaseComponents/WixComponent';
import classNames from 'classnames';
import {defaultPdding} from './constants';

export class TableContent extends WixComponent {
  componentDidUpdate() {
    this.props.onContentUpdated && this.props.onContentUpdated();
  }

  renderRow = (rowData, rowIndex) => {
    let rowClass;
    if (typeof this.props.rowClass === 'function') {
      rowClass = this.props.rowClass(rowData, rowIndex);
    } else {
      rowClass = this.props.rowClass;
    }

    return (
      <div
        data-hook={this.props.rowDataHook} key={rowIndex}
        className={classNames(css.bodyRow, {[css.clickable]: !!this.props.onRowClick}, rowClass)}
        onClick={event => this.props.onRowClick && !event.isDefaultPrevented() && this.props.onRowClick(rowData, rowIndex)}
        >
        {this.props.columns.map((column, index) => {
          const columnStyle = {
            width: column.width,
            padding: column.padding === undefined? defaultPdding : column.padding,
            flexShrink: column.width.indexOf('px') !== -1 ? 0 : undefined
          };
          return (<div key={index} className={css.cellContainer} style={columnStyle}>{column.render(rowData, rowIndex)}</div>);
        })}
      </div>
    );
  };

  render() {
    return (
      <div className={css.tableContent}>
        {
          this.props.data.map((rowData, index) => this.renderRow(rowData, index))
        }
      </div>
    );
  }
}
