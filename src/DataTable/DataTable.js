
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


  loadMore = () => {
    this.props.loadMore && this.props.loadMore();
  }

  render() {
    if (this.props.isPage) {
      return <PageTable {...this.props} />
    } else {
      return <RegularTable {...this.props}/>;
    }
  }
}

const TableContent = (props) => {
  const renderRow = (rowData, rowIndex) => {
    return (
      <div
        data-hook={props.rowDataHook} key={rowIndex}
        className={classNames(css.bodyRow, { [css.clickable]: !!props.onRowClick }, props.rowClass)}
        onClick={() => props.onRowClick && props.onRowClick(rowData, rowIndex)}
      >
        {props.columns.map((column, index) => <div key={index} className={css.cell} style={{ width: column.width }}>{column.render(rowData, rowIndex)}</div>)}
      </div>
    );
  }

  return (
    <div className={css.tableContent} style={{ height: props.height }}>
      {
        props.data.map((rowData, index) => renderRow(rowData, index))
      }
    </div>);
};

const TableHeader = (props) => {
  const renderSortArrow = () => {
    return (
      <div className={classNames(css.sortArrow, { [css.descent]: props.sortDirection === 'descent' })} >
        <ArrowVertical width="7px" height="7px" />
      </div>);
  };
  const renderHeaderColumn = column => <span className={css.headerTitle}>{column.title}</span>;
  const renderSortableColumn = (column, index) => {
    return (
      <div className={css.sortableColumn} onClick={() => props.onSort && props.onSort(index)}>
        {column}
        {props.onSort && props.columnToSortBy === index ? renderSortArrow() : null}
      </div>
    );
  };

  return (
    <div className={css.headerRowContainer} style={{ paddingRight: props.headerPaddingRight }}>
      <div
        className={css.headerRow}
        style={{ height: props.headerHeight, fontSize: props.headerFontSize }}
      >
        {props.columns.map((column, index) => {
          let renderedColumn = renderHeaderColumn(column);
          if (column.sortable) {
            renderedColumn = renderSortableColumn(renderedColumn, column.sortKey);
          }
          return <div key={index} className={css.headerCell} style={{ width: column.width }}>{renderedColumn}</div>;
        })}
      </div>
    </div >
  );
};

const RegularTable = (props) => {
  return (<div id={props.id} className={css.dataTable} style={{ width: props.width }}>
      <TableHeader {...props}/>
      <TableContent {...props}/>
    </div>);
};

class PageTable extends WixComponent {
  constructor(props) {
    super(props);
    window.addEventListener('resize', this.onWindowResize);
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
    const topHeight = this.topSection && this.topSection.getBoundingClientRect().height;
    const tableWidth = this.table && this.table.getBoundingClientRect().width;
    this.setState({ topHeight, tableWidth });
  }
  headerPaddingWithScrollWidth = () => {
    let currPadding = this.state.headerPaddingRight;
    currPadding = Number(currPadding.substr(0, currPadding.indexOf('px')));
    return currPadding + Number(this.state.scrollBarWidth);
  }
  wrapWithContainer = (node, style) => (<div style={style} className={css.container}>{node}</div>);


  renderPageTableContent = () => {
    return (
      <div style={{ paddingTop: this.state.topHeight }}>
        <TableContent {...this.props} />
        <ScrollbarSize
          onLoad={this.setScrollBarWidth}
          onChange={this.setScrollBarWidth}
        />
      </div>

    );
  }
  render() {
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
        <TableHeader
          {...this.props}
          ref={node => this.tableHeader = node}
          headerPaddingRight={this.state.headerPaddingRight && this.headerPaddingWithScrollWidth()}>
        </TableHeader>
      </div>, style
    );

    let table = this.wrapWithContainer(
      <div>
        <div ref={node => this.table = node} className={css.dataTable}>
          {this.renderPageTableContent()}
        </div>
      </div>
    );

    // if (this.props.infiniteScroll) {
    //   table = this.wrapWithInfiniteScroll(table);
    // }
    return (
      <div id={this.props.id} data-hook="page-container" className={css.pageContainer}>
        {topSection}
        <div className={css.scrollContainer}>
          {table}
        </div>
      </div>);
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
