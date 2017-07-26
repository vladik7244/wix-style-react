
import React from 'react';
import css from './DataTable.scss';
import classNames from 'classnames';
import WixComponent from '../BaseComponents/WixComponent';
import InfiniteScroll from 'react-infinite-scroller';
import PropTypes from 'prop-types';
import {ArrowVertical} from '../Icons';

const headerHeight = 36;

class DataTable extends WixComponent {
  constructor(props) {
    super(props);

    if (props.infiniteScroll) {
      this.state = this.createInitialScrollingState(props);
    }
  }

  createInitialScrollingState(props) {
    return {currentPage: 0, lastPage: this.calcLastPage(props)};
  }

  calcLastPage = ({data, itemsPerPage}) => Math.ceil(data.length / itemsPerPage) - 1;

  componentWillReceiveProps(nextProps) {
    let isLoadingMore = false;
    if (this.props.infiniteScroll && nextProps.data !== this.props.data) {
      if (nextProps.data instanceof Array && this.props.data instanceof Array) {
        if (this.props.data.every((elem, index) => {
          return nextProps.data.length > index && nextProps.data[index] === elem;
        })) {
          isLoadingMore = true;
          this.setState({lastPage: this.calcLastPage(nextProps)});
        }
      }

      if (!isLoadingMore) {
        this.setState(this.createInitialScrollingState(nextProps));
      }
    }
  }

  loadMore = () => {
    if (this.state.currentPage < this.state.lastPage) {
      this.setState({currentPage: this.state.currentPage + 1});
    } else {
      this.props.loadMore && this.props.loadMore();
    }
  }

  wrapWithInfiniteScroll = content => {
    return (
      <InfiniteScroll
        pageStart={0}
        loadMore={this.loadMore}
        hasMore={this.state.currentPage < this.state.lastPage || (this.props.hasMore)}
        loader={this.props.loader}
        useWindow={false}
        >
        {content}
      </InfiniteScroll>
    );
  };

  renderSortableColumn = (column, index) => {
    return (
      <div className={css.sortableColumn} onClick={() => this.props.onSort && this.props.onSort(index)}>
        {column}
        {this.props.onSort && this.props.columnToSortBy === index ? this.renderSortArrow() : null}
      </div>
    );
  }

  renderSortArrow = () => {
    return (
      <div className={classNames(css.sortArrow, {[css.descent]: this.props.sortDirection === 'descent'})} >
        <ArrowVertical width="7px" height="7px"/>
      </div>);
  };

  renderHeaderColumn = column => <span className={css.headerTitle}>{column.title}</span>;

  renderHeader() {
    return (
      <div className={css.headerRow}>
        {this.props.columns.map((column, index) => {
          let renderedColumn = this.renderHeaderColumn(column);
          if (column.sortable) {
            renderedColumn = this.renderSortableColumn(renderedColumn, column.sortKey);
          }
          return <div key={index} className={css.headerCell} style={{width: column.width}}>{renderedColumn}</div>;
        })}
      </div>
    );
  }

  renderRow = (rowData, rowIndex) => {
    return (
      <div key={rowIndex} className={classNames(css.bodyRow, {[css.clickable]: !!this.props.onRowClick})} onClick={() => this.props.onRowClick && this.props.onRowClick(rowData, rowIndex)}>
        {this.props.columns.map((column, index) => <div key={index} className={css.cell} style={{width: column.width}}>{column.render(rowData, rowIndex)}</div>)}
      </div>
    );
  }

  renderContent = () => {
    let tableContent = (
      <div className={css.tableContent}>
        {
          this.props.data.map((rowData, index) => this.renderRow(rowData, index))
        }
      </div>);
    if (this.props.infiniteScroll) {
      tableContent = this.wrapWithInfiniteScroll(tableContent);
    }
    return (
      <div className={css.scrollable} style={{height: this.props.height - headerHeight, paddingRight: this.props.scrollBarOffset}}>
        {tableContent}
      </div>

    );
  }

  render() {
    return (
      <div className={css.dataTable}>
        {this.props.header}
        {this.renderHeader()}
        {this.renderContent()}
        {this.props.footer}
      </div>
    );
  }
}

DataTable.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    render: PropTypes.func.isRequired,
    width: PropTypes.string,
    sortable: PropTypes.bool
  })).isRequired,
  data: PropTypes.array.isRequired,
  height: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number, // Why the fuck do we need this thing?
  onRowClick: PropTypes.func,
  header: PropTypes.node,
  footer: PropTypes.node,
  infiniteScroll: PropTypes.bool,
  loader: PropTypes.node,
  hasMore: PropTypes.bool,
  loadMore: PropTypes.func,
  isPage: PropTypes.bool,
  sortDirection: PropTypes.oneOf(['ascent', 'descent']),
  columnToSortBy: PropTypes.string,
  onSort: PropTypes.func
};

DataTable.defaultProps = {
  loader: <div className={css.loader}>Loading ...</div>,
  isPage: false,
  header: null,
  footer: null,
  infiniteScroll: false,
  columnToSortBy: 0
};

export default DataTable;
