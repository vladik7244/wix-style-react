
import React from 'react';
import css from './DataTable.scss';
import classNames from 'classnames';
import WixComponent from '../BaseComponents/WixComponent';
import InfiniteScroll from 'react-infinite-scroller';
import PropTypes from 'prop-types';
import { ArrowVertical } from '../Icons';
import ScrollbarSize from 'react-scrollbar-size';

class DataTable extends WixComponent {
  constructor(props) {
    super(props);

    if (this.props.isPage) {
      window.addEventListener('resize', this.onWindowResize);
    }

    this.state = { topHeight: 0, tableWidth: 0, headerPaddingRight: null, scrollBarWidth: 0 };
  }

  onWindowResize = () => {
    const width = this.table && this.table.getBoundingClientRect().width;
    this.setState({ tableWidth: width });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize);
  }

  componentDidMount() {
    if (this.props.isPage) {
      const topHeight = this.topSection && this.topSection.getBoundingClientRect().height;
      const tableWidth = this.table && this.table.getBoundingClientRect().width;
      this.setState({ topHeight, tableWidth });
    } else {
      // the padding right thing can be changed to inline style instead of css, and then we wont need this calculation
      const headerPaddingRight = this.tableHeader && window.getComputedStyle(this.tableHeader)['padding-right'];
      this.setState({ headerPaddingRight: headerPaddingRight || this.state.headerPaddingRight });
    }
  }

  loadMore = () => {
    this.props.loadMore && this.props.loadMore();
  }

  wrapWithInfiniteScroll = content => {
    return (
      <InfiniteScroll
        pageStart={0}
        loadMore={this.loadMore}
        hasMore={this.props.hasMore}
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
      <div className={classNames(css.sortArrow, { [css.descent]: this.props.sortDirection === 'descent' })} >
        <ArrowVertical width="7px" height="7px" />
      </div>);
  };

  renderHeaderColumn = column => <span className={css.headerTitle}>{column.title}</span>;

  headerPaddingWithScrollWidth = () => {
    let currPadding = this.state.headerPaddingRight;
    currPadding = Number(currPadding.substr(0, currPadding.indexOf('px')));
    return currPadding + Number(this.state.scrollBarWidth);
  }

  renderHeader = () => {
    return (
      <div className={css.headerRowContainer} style={{ paddingRight: this.state.headerPaddingRight && this.headerPaddingWithScrollWidth() }}>
        <div
          className={css.headerRow} ref={node => this.tableHeader = node}
          style={{ height: this.props.headerHeight, fontSize: this.props.headerFontSize }}
        >
          {this.props.columns.map((column, index) => {
            let renderedColumn = this.renderHeaderColumn(column);
            if (column.sortable) {
              renderedColumn = this.renderSortableColumn(renderedColumn, column.sortKey);
            }
            return <div key={index} className={css.headerCell} style={{ width: column.width }}>{renderedColumn}</div>;
          })}
        </div>
      </div>
    );
  }

  renderRow = (rowData, rowIndex) => {
    return (
      <div
        data-hook={this.props.rowDataHook} key={rowIndex}
        className={classNames(css.bodyRow, { [css.clickable]: !!this.props.onRowClick }, this.props.rowClass)}
        onClick={() => this.props.onRowClick && this.props.onRowClick(rowData, rowIndex)}
      >
        {this.props.columns.map((column, index) => <div key={index} className={css.cell} style={{ width: column.width }}>{column.render(rowData, rowIndex)}</div>)}
      </div>
    );
  }

  setScrollBarWidth = ({ scrollbarWidth }) => {
    this.setState({ scrollBarWidth: scrollbarWidth });
  }

  renderPageTableContent = () => {
    return (
      <div style={{ paddingTop: this.state.topHeight }}>
        {this.renderTableContent()}
        <ScrollbarSize
          onLoad={this.setScrollBarWidth}
          onChange={this.setScrollBarWidth}
        />
      </div>

    );
  }

  renderTableContent = () => {
    return (
      <div className={css.tableContent} style={{ height: this.props.height }}>
        {
          this.props.data.map((rowData, index) => this.renderRow(rowData, index))
        }
      </div>);
  }

  renderRegularTable() {
    return (<div id={this.props.id} className={css.dataTable} style={{ width: this.props.width }}>
      {this.renderHeader()}
      {this.renderTableContent()}
    </div>);
  }

  wrapWithContainer = (node, style) => (<div style={style} className={css.container}>{node}</div>);

  renderPageTable() {
    const style = {
      position: 'absolute',
      top: 0,
      left: 0,
      width: this.state.tableWidth,
      right: this.state.scrollBarWidth,
      zIndex: 9999,
    };
    const topSection = this.wrapWithContainer(
      <div data-hook="top-section" ref={node => this.topSection = node}>
        {this.props.pageHeading}
        {this.renderHeader()}
      </div>, style
    );

    let table = this.wrapWithContainer(
      <div>
        <div ref={node => this.table = node} className={css.dataTable}>
          {this.renderPageTableContent()}
        </div>
      </div>
    );

    if (this.props.infiniteScroll) {
      table = this.wrapWithInfiniteScroll(table);
    }
    return (
      <div id={this.props.id} data-hook="page-container" className={css.pageContainer}>
        {topSection}
        <div className={css.scrollContainer}>
          {table}
        </div>
      </div>);
  }

  render() {
    if (this.props.isPage) {
      return this.renderPageTable();
    } else {
      return this.renderRegularTable();
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
