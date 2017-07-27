
import React from 'react';
import css from './DataTable.scss';
import WixComponent from '../BaseComponents/WixComponent';
import PropTypes from 'prop-types';
import { FullPageTable } from './FullPageTable';
import { RegularTable } from './RegularTable';

class DataTable extends WixComponent {
  render() {
    return (
      <div id={this.props.id}>
        {this.props.isPage ? <FullPageTable {...this.props}/> : <RegularTable {...this.props} />}
      </div>
    );
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
  rowDataHook: PropTypes.string,
  rowClass: PropTypes.oneOf(PropTypes.string, PropTypes.func),
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
  pageHeading: PropTypes.node,
  hideHeader: PropTypes.bool
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
