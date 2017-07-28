import React from 'react';
import css from './DataTable.scss';

export const TableCell = props => {
  return (
    <div className={css.tableCell}>
      { props.children }
    </div>);
};

