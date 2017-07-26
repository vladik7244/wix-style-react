
import React from 'react';
import css from './DataTable.scss';
import classNames from 'classnames';
import WixComponent from '../BaseComponents/WixComponent';
import InfiniteScroll from 'react-infinite-scroller';
import PropTypes from 'prop-types';
import {ArrowVertical} from '../Icons';
import {Container} from '../Grid';

const headerHeight = 36;

class DataTable extends WixComponent {
  constructor(props) {
    super(props);

    this.state = {topHeight: 0, tableWidth: 0};
    //window resize listener

    if (props.infiniteScroll) {
      this.state = this.createInitialScrollingState(props);
    }
  }

  componentDidMount() {
    if (this.props.isPage) {
      const height = this.topSection && this.topSection.getBoundingClientRect().height;
      const width = this.table && this.table.getBoundingClientRect().width;
      this.setState({topHeight: height, tableWidth: width});
    }
  }

  createInitialScrollingState(props) {
    return {currentPage: 0, lastPage: this.calcLastPage(props), topHeight: 0, tableWidth: 0};
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
    if (this.props.infiniteScroll && !this.props.isPage) {
      tableContent = this.wrapWithInfiniteScroll(tableContent);
    }
    return (
      <div className={classNames({[css.scrollable]: !this.props.isPage})} style={this.props.isPage ? {paddingTop: this.state.topHeight} : {height: this.props.height - headerHeight}}>
        {tableContent}
      </div>

    );
  }

  renderPage(table, topSection) {
    const pageContent = (
      <Container>
        {table}
      </Container>
    );
    const style = {
      position: 'absolute',
      top: 0,
      left: 0,
      width: this.state.tableWidth,
      margin: '0 auto',
      right: 0,
      zIndex: 9999,
    };
    if (this.props.infiniteScroll) {
      //pageContent = this.wrapWithInfiniteScroll(pageContent);
    }
    return (
      <div data-hook="page-container" className={css.pageContainer}>
        <div style={style}>
          {topSection}
        </div>
        <div className={css.scrollContainer}>
          {pageContent}
        </div>
      </div>);
  }

  render() {
    const style = {
      width: this.state.tableWidth
    };
    let topSection = [
      this.props.header,
      this.renderHeader()
    ];
    if (this.props.isPage) {
      topSection = (
        <div data-hook="top-section" ref={node => this.topSection = node} style={style}>
          {topSection}
        </div>
      );
    }

    let table = (
      <div className={css.dataTable}>
        {topSection}
        {this.renderContent()}
        {this.props.footer}
      </div>
    );

    if (this.props.isPage) {
      table = this.renderPage(
        <div>
          <div ref={node => this.table = node} className={css.dataTable}>
            {this.renderContent()}
            {this.props.footer}
          </div>
        </div>,
        topSection
      );
    }

    return table;
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
