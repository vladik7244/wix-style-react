import React from 'react';
import css from './DataTable.scss';
import classNames from 'classnames';

export const TableContent = props => {
  const renderRow = (rowData, rowIndex) => {
    let rowClass;
    if (typeof props.rowClass === 'function') {
      rowClass = props.rowClass(rowData, rowIndex);
    } else {
      rowClass = props.rowClass;
    }
    return (
      <div
        data-hook={props.rowDataHook} key={rowIndex} data-hook="bodyRow"
        className={classNames(css.bodyRow, {[css.clickable]: !!props.onRowClick}, props.rowClass)}
        onClick={event => props.onRowClick && !event.isDefaultPrevented() && props.onRowClick(rowData, rowIndex)}
        >
        {props.columns.map((column, index) => <div key={index} className={css.cellContainer} style={{width: column.width}}>{column.render(rowData, rowIndex)}</div>)}
      </div>
    );
  };

  return (
    <div className={css.tableContent}>
      {
        props.data.map((rowData, index) => renderRow(rowData, index))
      }
    </div>);
};
