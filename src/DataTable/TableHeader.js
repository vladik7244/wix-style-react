import React from 'react';
import css from './DataTable.scss';
import { headerHeight } from './constants';
import classNames from 'classnames';
import { ArrowVertical } from '../Icons';
import { TableCell } from './TableCell';

export const TableHeader = props => {
  const getPaddingOfFirstRowInColumn = column => column.render(props.data[0], 0).props && column.render(props.data[0], 0).props.padding;
  const renderSortArrow = () => {
    return (
      <div className={classNames(css.sortArrow, { [css.descent]: props.sortDirection === 'descent' })} >
        <ArrowVertical width="7px" height="7px" />
      </div>);
  };
  const renderHeaderTitle = column => {
    return (
      <span data-hook="headerTitle" className={css.headerTitle}>
        {typeof column.title === 'function' ? column.title() : column.title}
      </span>
    );
  };
  const wrapWithSort = (column, index) => {
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
      style={{ height: headerHeight, paddingRight: props.headerPaddingRight }}
    >
      {props.columns.map((column, index) => {
        let renderedTitle = renderHeaderTitle(column);
        if (column.sortable) {
          renderedTitle = wrapWithSort(renderedTitle, column.sortKey);
        }
        const padding = getPaddingOfFirstRowInColumn(column);
        return (
          <div data-hook="headerColumn" key={index} style={{ width: column.width}}>
            <div style={{ paddingLeft: padding, paddingRight: padding }}>
              {renderedTitle}
            </div>
          </div>);
      })}
    </div>
  );
};
