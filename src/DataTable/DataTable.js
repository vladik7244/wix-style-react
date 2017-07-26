
import React from 'react';
import css from './DataTable.scss';
import classNames from 'classnames';
import WixComponent from '../BaseComponents/WixComponent';
import InfiniteScroll from 'react-infinite-scroller';
import PropTypes from 'prop-types';
import {ArrowVertical} from '../Icons';
import ScrollbarSize from 'react-scrollbar-size';

const headerHeight = 36;

class DataTable extends WixComponent {
  constructor(props) {
    super(props);

    if (this.props.isPage) {
      window.addEventListener('resize', this.onWindowResize);
    }

    this.state = {topHeight: 0, tableWidth: 0, headerPaddingRight: null, scrollBarWidth: 0};
  }

  onWindowResize = () => {
    const width = this.table && this.table.getBoundingClientRect().width;
    this.setState({tableWidth: width});
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize);
  }

  componentDidMount() {
    if (this.props.isPage) {
      const topHeight = this.topSection && this.topSection.getBoundingClientRect().height;
      const tableWidth = this.table && this.table.getBoundingClientRect().width;
      this.setState({topHeight, tableWidth});
    } else {
      const headerPaddingRight = this.tableHeader && window.getComputedStyle(this.tableHeader)['padding-right'];
      this.setState({headerPaddingRight: headerPaddingRight || this.state.headerPaddingRight});
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
      <div className={classNames(css.sortArrow, {[css.descent]: this.props.sortDirection === 'descent'})} >
        <ArrowVertical width="7px" height="7px"/>
      </div>);
  };

  renderHeaderColumn = column => <span className={css.headerTitle}>{column.title}</span>;

  headerPaddingWithScrollWidth = () => {
    let currPadding = this.state.headerPaddingRight;
    currPadding = Number(currPadding.substr(0, currPadding.indexOf('px')));
    return currPadding + Number(this.state.scrollBarWidth);
  }

  renderHeader() {
    const style = this.state.headerPaddingRight ? {paddingRight: this.headerPaddingWithScrollWidth()} : {};
    return (
      <div className={css.headerRow} style={style} ref={node => this.tableHeader = node}>
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

  setScrollBarWidth = ({scrollbarWidth}) => {
    this.setState({scrollBarWidth: scrollbarWidth});
  }

  scrollbarSizeLoad = measurements => {
    this.setScrollBarWidth(measurements);
  }

  scrollbarSizeChange = measurements => {
    this.setScrollBarWidth(measurements);
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
        <ScrollbarSize
          onLoad={this.scrollbarSizeLoad}
          onChange={this.scrollbarSizeChange}
          />
      </div>

    );
  }

  renderPage(table, topSection) {
    const wrapWithContainer = (node, style) => (<div style={style} className={css.container}>
      {node}
    </div>);
    const style = {
      position: 'absolute',
      top: 0,
      left: 0,
      width: this.state.tableWidth,
      right: this.state.scrollBarWidth,
      zIndex: 9999,
    };
    let tableContent = wrapWithContainer(table);
    if (this.props.infiniteScroll) {
      tableContent = this.wrapWithInfiniteScroll(tableContent);
    }
    return (
      <div id={this.props.id} data-hook="page-container" className={css.pageContainer}>
        {wrapWithContainer(topSection, style)}
        <div className={css.scrollContainer}>
          {tableContent}
        </div>
      </div>);
  }

  render() {
    let topSection = [
      this.props.pageHeading,
      this.renderHeader()
    ];
    if (this.props.isPage) {
      topSection = (
        <div data-hook="top-section" ref={node => this.topSection = node}>
          {topSection}
        </div>
      );
    }

    let table = (
      <div id={this.props.id} className={css.dataTable}>
        {topSection}
        {this.renderContent()}
      </div>
    );

    if (this.props.isPage) {
      table = this.renderPage(
        <div>
          <div ref={node => this.table = node} className={css.dataTable}>
            {this.renderContent()}
          </div>
        </div>,
        topSection
      );
    }

    return table;
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
  rowClass: PropTypes.string,
  dynamicRowClass: PropTypes.string,
  onRowClick: PropTypes.func,
  infiniteScroll: PropTypes.bool,
  height: PropTypes.number,
  width: PropTypes.string,
  hasMore: PropTypes.bool,
  loadMore: PropTypes.func,
  loader: PropTypes.node,
  onSort: PropTypes.func,
  sortDirection: PropTypes.oneOf(['ascent', 'descent']),
  pageHeading: PropTypes.node,
  isPage: PropTypes.bool,
  columnToSortBy: PropTypes.string,
  thPadding: PropTypes.string,
  thHeight: PropTypes.string,
  thFontSize: PropTypes.string
};

DataTable.defaultProps = {
  loader: <div className={css.loader}>Loading ...</div>,
  isPage: false,
  pageHeading: null,
  infiniteScroll: false,
  columnToSortBy: 0,
  width: '100%'
};

export default DataTable;
