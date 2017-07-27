
import React from 'react';
import css from './DataTable.scss';
import { TableContent } from './TableContent';
import { TableHeader } from './TableHeader';
import getScrollbarWidth from 'scrollbar-width';

export const RegularTable = (props) => {
  return (<div id={props.id} className={css.dataTable} style={{ width: props.width }}>
    <TableHeader headerPaddingRight={getScrollbarWidth() || 0} {...props} />
    <TableContent {...props} />
  </div>);
};
