
import React from 'react';
import css from './DataTable.scss';
import WixComponent from '../BaseComponents/WixComponent';
import InfiniteScroll from 'react-infinite-scroller';
import PropTypes from 'prop-types';
import {FullPageTable} from './FullPageTable';
import {RegularTable} from './RegularTable';

class DataTable extends WixComponent {
  constructor(props) {
    super(props);
    this.state = { topHeight: 0, tableWidth: 0, headerPaddingRight: null, scrollBarWidth: 0 };
  }


  loadMore = () => {
    this.props.loadMore && this.props.loadMore();
  }

  render() {
    if (this.props.isPage) {
      return <FullPageTable {...this.props} />
    } else {
      return <RegularTable {...this.props}/>;
    }
  }
}



DataTable.propTypes = {
  id: PropTypes.string,
  data: PropTypes.array.isRequired,
  columns: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    render: PropTypes.func.isRequired,
    width: PropTypes.string,
    sortable: PropTypes.bool
  })).isRequired,
  showHeaderWhenEmpty: PropTypes.bool,
  emptyState: PropTypes.node,
  rowDataHook: PropTypes.string,
  rowClass: PropTypes.string,
  dynamicRowClass: PropTypes.func,
  onRowClick: PropTypes.func,
  height: PropTypes.number,
  width: PropTypes.string,
  thPadding: PropTypes.string, // who the hell will use this?
  headerHeight: PropTypes.string,  // not sure we need this
  headerFontSize: PropTypes.string, // not sure we need this
  infiniteScroll: PropTypes.bool,
  hasMore: PropTypes.bool,
  loadMore: PropTypes.func,
  loader: PropTypes.node,
  onSort: PropTypes.func,
  sortDirection: PropTypes.oneOf(['ascent', 'descent']),
  columnToSortBy: PropTypes.string,
  isPage: PropTypes.bool,
  pageHeading: PropTypes.node
};

DataTable.defaultProps = {
  infiniteScroll: false,
  loader: <div className={css.loader}>Loading ...</div>,
  columnToSortBy: 0,
  isPage: false,
  pageHeading: null,
  headerHeight: 36,
  headerFontSize: 10,
  height: '100%',
  width: '100%'
};

export default DataTable;
