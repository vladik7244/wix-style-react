
import React from 'react';
import css from './DataTable.scss';
import InfiniteScroll from 'react-infinite-scroller';
import {TableContent} from './TableContent';
import {TableHeader} from './TableHeader';

export const RegularTable = (props) => {
  return (<div id={props.id} className={css.dataTable} style={{ width: props.width }}>
      <TableHeader {...props}/>
      <TableContent {...props}/>
    </div>);
};
