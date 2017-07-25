
import React from 'react';
import style from './DataTable.scss';
import classNames from 'classnames';
import WixComponent from '../BaseComponents/WixComponent';
import { Table, Column } from 'react-virtualized';
import InfiniteScroll from './InfiniteScroll';
import PropTypes from 'prop-types';
import { ArrowVertical } from '../Icons';

class DataTable extends WixComponent {
  constructor(props) {
    super(props);

    if (props.infiniteScroll) {
      this.state = this.createInitialScrollingState(props);
    }
  }

  renderSortableColumn = (column, index) => {
    return (
      <div className={style.sortableColumn} onClick={() => this.props.onSort && this.props.onSort(index)}>
        {column}
        {this.props.onSort && this.props.columnToSortBy === index ? this.renderSortArrow() : null}
      </div>
    );
  }

  renderSortArrow = () => {
    return (
      <div className={classNames(style.sortArrow, { [style.descent]: this.props.sortDirection === 'descent' })} >
        <ArrowVertical width={7} height={7} />
      </div>);
  };


  componentWillReceiveProps(nextProps) {
    let isLoadingMore = false;
    if (this.props.infiniteScroll && nextProps.data !== this.props.data) {
      if (nextProps.data instanceof Array && this.props.data instanceof Array) {
        if (this.props.data.every((elem, index) => {
          return nextProps.data.length > index && nextProps.data[index] === elem;
        })) {
          isLoadingMore = true;
          this.setState({ lastPage: this.calcLastPage(nextProps) });
        }
      }

      if (!isLoadingMore) {
        this.setState(this.createInitialScrollingState(nextProps));
      }
    }
  }

  calcLastPage = ({ data, itemsPerPage }) => Math.ceil(data.length / itemsPerPage) - 1;

  loadMore = () => {
    if (this.state.currentPage < this.state.lastPage) {
      this.setState({ currentPage: this.state.currentPage + 1 });
    } else {
      this.props.loadMore && this.props.loadMore();
    }
  }

  createInitialScrollingState(props) {
    return { currentPage: 0, lastPage: this.calcLastPage(props) };
  }

  componentDidMount() {
    this.scrollContainer = document.getElementsByClassName('ReactVirtualized__Grid ReactVirtualized__Table__Grid');
    if (this.scrollContainer.length) {
      this.scrollContainer = this.scrollContainer[this.scrollContainer.length - 1];
    }
  }

  wrapWithInfiniteScroll = table => {
    return (
      <InfiniteScroll
        pageStart={0}
        loadMore={this.loadMore}
        hasMore={this.state.currentPage < this.state.lastPage || (this.props.hasMore)}
        loader={this.props.loader}
        scrollElement={this.scrollContainer}
      >
        {table}
      </InfiniteScroll>
    );
  };

  renderHeaderColumn = column => <span className={style.headerTitle}>{column.title}</span>;

  renderHeader() {
    return (
      <div className={style.headerRow}>
        {this.props.columns.map((column, index) => {
          let renderedColumn = this.renderHeaderColumn(column);
          if (column.sortable) {
            renderedColumn = this.renderSortableColumn(renderedColumn, index);
          }
          return <div style={{width: column.width}}>{renderedColumn}</div>;
        })}
      </div>
    );
  }

  onRowClick = ({ index, rowData }) => this.props.onRowClick && this.props.onRowClick(rowData, index);

  renderRow = (rowData, rowIndex) => {
    return (
      <li className={style.bodyRow} >
        {this.props.columns.map(column => <div style={{width: column.width}}>{column.render(rowData, rowIndex)}</div>)}
      </li>
    );
  }


  renderContent = () => {
    return (
      <ul className={style.tableContent}>
        {
          this.props.data.map((rowData, index) => this.renderRow(rowData, index))
        }

      </ul>
    );
  }

  renderTable(data) {
    return (
      <Table
        className={style.wixStyleDataTable}
        width={1000}
        height={300}
        headerRowRenderer={this.headerRowRenderer}
        headerHeight={14}
        rowHeight={30}
        rowCount={data.length}
        rowClassName={this.rowClassName}
        headerClassName={style.headerColumn}
        rowGetter={({ index }) => data[index]}
        tabIndex={null}
        onRowClick={this.onRowClick}
      >
        {this.props.columns.map((column, idx) => {
          return <Column
            label={column.title}
            dataKey=''
            key={idx}
            cellRenderer={this.cellRenderer}
            width={column.width}
            className={style.rowColumn}
          />;
        })}
      </Table>
    );
  }

  render() {
    return (
      <div>
        {this.renderHeader()}
        {this.renderContent()}
      </div>
    );
  }

  render2() {

    // And so on...

    /* suggested API :
    
      columns - array of column objects
      columnObj = {
        title - header text,
        render - render function for the column,
        width
        sortable?
        onSort
      }

      when iterating on the columns prop
      use the headerRenderer inside Column with a component that has/hasnt the sort functionality
    
      if theres onRowClick, add cursor pointer on cell hover

      we might be able to use the existing InfiniteScroller thing..
     */
    const { data, infiniteScroll } = this.props;

    const table = this.renderTable(data);

    if (infiniteScroll) {
      return this.wrapWithInfiniteScroll(table);
    }

    return table;
  }

}

DataTable.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    render: PropTypes.func.isRequired,
    width: PropTypes.number,
    sortable: PropTypes.bool
  })),
  data: PropTypes.array.isRequired,
  loader: PropTypes.node,
  itemsPerPage: PropTypes.number,
  onRowClick: PropTypes.func,
  sortDirection: PropTypes.oneOf(['ascent', 'descent']),
  columnToSortBy: PropTypes.number,
  onSort: PropTypes.func
};

DataTable.defaultProps = {
  loader: <div className="loader">Loading ...</div>,
  columnToSortBy: 0
};

export default DataTable;
