import React from 'react';
import css from './DataTable.scss';
import {headerHeight} from './constants';
import classNames from 'classnames';
import {ArrowVertical} from '../Icons';
import {TableCell} from './TableCell';

export const TableHeader = props => {
  const renderSortArrow = () => {
    return (
      <div className={classNames(css.sortArrow, {[css.descent]: props.sortDirection === 'descent'})} >
        <ArrowVertical width="7px" height="7px"/>
      </div>);
  };
  const renderHeaderColumn = column => {
    return (
      <span data-hook="headerTitle" className={css.headerTitle}>
        {typeof column.title === 'function' ? column.title() : <TableCell>{column.title}</TableCell>}
      </span>
    );
  };
  const renderSortableColumn = (column, index) => {
    return (
      <div className={css.sortableColumn} data-hook="sortableColumn" onClick={() => props.onSort && props.onSort(index)}>
        {column}
        {props.onSort && props.columnToSortBy === index ? renderSortArrow() : null}
      </div>
    );
  };

  return (
    <div
      className={css.headerRow} ref={props.refHeader} data-hook="header"
      style={{height: headerHeight, paddingRight: props.headerPaddingRight}}
      >
      {props.columns.map((column, index) => {
        let renderedColumn = renderHeaderColumn(column);
        if (column.sortable) {
          renderedColumn = renderSortableColumn(renderedColumn, column.sortKey);
        }
        return <div data-hook="headerColumn" key={index} style={{width: column.width}}>{renderedColumn}</div>;
      })}
    </div>
  );
};
