import React from 'react';
import css from './Table.scss';
import {headerHeight, defaultPadding} from './constants';
import classNames from 'classnames';
import {ArrowVertical} from '../Icons';

export const TableHeader = props => {
  const renderSortArrow = () => {
    return (
      <div className={classNames(css.sortArrow, {[css.descent]: props.sortDirection === 'descent'})} >
        <ArrowVertical width="7px" height="7px"/>
      </div>);
  };
  const renderHeaderColumnTitle = column => {
    return (
      <span data-hook="headerTitle" className={css.headerTitle}>
        {typeof column.title === 'function' ? column.title() : column.title}
      </span>
    );
  };
  const wrapWithSort = (column, index) => {
    return (
      <div className={css.sortableColumn} onClick={() => props.onSort && props.onSort(index)}>
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
        let renderedColumn = renderHeaderColumnTitle(column);
        if (column.sortable) {
          renderedColumn = wrapWithSort(renderedColumn, column.sortKey);
        }

        const paddingLeft = column.padding === undefined ? defaultPadding : column.padding;
        const paddingRight = column.padding === undefined ? defaultPadding : column.padding;
        return <div key={index} className={css.headerCell} style={{width: column.width, paddingLeft, paddingRight}}>{renderedColumn}</div>;
      })}
    </div>
  );
};
