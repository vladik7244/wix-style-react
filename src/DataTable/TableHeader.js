import React from 'react';
import css from './DataTable.scss';
import classNames from 'classnames';
import { ArrowVertical } from '../Icons';

export const TableHeader = (props) => {
  const renderSortArrow = () => {
    return (
      <div className={classNames(css.sortArrow, { [css.descent]: props.sortDirection === 'descent' })} >
        <ArrowVertical width="7px" height="7px" />
      </div>);
  };
  const renderHeaderColumn = column => <span className={css.headerTitle}>{column.title}</span>;
  const renderSortableColumn = (column, index) => {
    return (
      <div className={css.sortableColumn} onClick={() => props.onSort && props.onSort(index)}>
        {column}
        {props.onSort && props.columnToSortBy === index ? renderSortArrow() : null}
      </div>
    );
  };

  return (
    <div className={css.headerRowContainer} style={{ paddingRight: props.headerPaddingRight }}>
      <div
        className={css.headerRow}
        style={{ height: props.headerHeight, fontSize: props.headerFontSize }}
      >
        {props.columns.map((column, index) => {
          let renderedColumn = renderHeaderColumn(column);
          if (column.sortable) {
            renderedColumn = renderSortableColumn(renderedColumn, column.sortKey);
          }
          return <div key={index} className={css.headerCell} style={{ width: column.width }}>{renderedColumn}</div>;
        })}
      </div>
    </div >
  );
};