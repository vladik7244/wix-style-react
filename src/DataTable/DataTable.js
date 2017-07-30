
import React from 'react';
import css from './DataTable.scss';
import WixComponent from '../BaseComponents/WixComponent';
import PropTypes from 'prop-types';
import {FullPage} from './FullPage';
import {RegularTable} from './RegularTable';

class DataTable extends WixComponent {
  render() {
    if (this.props.isPage) {
      return <FullPage {...this.props}/>;
    } else {
      return <RegularTable {...this.props}/>;
    }
  }
}

DataTable.propTypes = {
  id: PropTypes.string,
  data: PropTypes.array.isRequired,
  columns: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    render: PropTypes.func.isRequired,
    width: PropTypes.string,
    sortable: PropTypes.bool
  })).isRequired,
  showHeaderWhenEmpty: PropTypes.bool,
  rowDataHook: PropTypes.string,
  rowClass: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  dynamicRowClass: PropTypes.func,
  onRowClick: PropTypes.func,
  height: PropTypes.number,
  width: PropTypes.string,
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
  columnToSortBy: '',
  isPage: false,
  pageHeading: null,
  hideHeader: false,
  height: '100%',
  width: '100%'
};

export default DataTable;
