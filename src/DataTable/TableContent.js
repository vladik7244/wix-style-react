import React from 'react';
import css from './DataTable.scss';
import classNames from 'classnames';


export const TableContent = (props) => {
  const renderRow = (rowData, rowIndex) => {
    return (
      <div
        data-hook={props.rowDataHook} key={rowIndex}
        className={classNames(css.bodyRow, { [css.clickable]: !!props.onRowClick }, props.rowClass)}
        onClick={() => props.onRowClick && props.onRowClick(rowData, rowIndex)}
      >
        {props.columns.map((column, index) => <div key={index} className={css.cell} style={{ width: column.width }}>{column.render(rowData, rowIndex)}</div>)}
      </div>
    );
  }

  return (
    <div className={css.tableContent} style={{ height: props.height }}>
      {
        props.data.map((rowData, index) => renderRow(rowData, index))
      }
    </div>);
};
