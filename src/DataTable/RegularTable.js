
import React from 'react';
import css from './DataTable.scss';
import { TableContent } from './TableContent';
import { TableHeader } from './TableHeader';
import getScrollbarWidth from 'scrollbar-width';
import InfiniteScroll from 'react-infinite-scroller';

export const RegularTable = (props) => {
  const wrapWithInfiniteScroll = content => {
    return (
      <InfiniteScroll
        pageStart={0}
        loadMore={props.loadMore}
        hasMore={props.hasMore}
        loader={props.loader}
        useWindow={false}
      >
        {content}
      </InfiniteScroll>
    );
  };

  let tableContent = <TableContent {...props} />;
  if (props.infiniteScroll) {
    tableContent = wrapWithInfiniteScroll(tableContent);
  }
  return (<div id={props.id} className={css.dataTable} style={{ width: props.width }}>
    <TableHeader headerPaddingRight={getScrollbarWidth() || 0} {...props} />
    {tableContent}
  </div>);
};
