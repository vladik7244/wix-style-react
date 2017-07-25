
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

  renderSortArrow = () => {
    return (
    <div className={classNames(style.sortArrow, { [style.descent]: this.props.sortDirection === 'descent' })} >
      <ArrowVertical width={7} height={7} />
    </div>);
  };

  headerRowRenderer = ({ className, columns, ...rest }) => {
    delete rest.style.paddingRight;
    return (
      <div className={className} role="row" style={rest.style}>
        {columns.map((column, index) => {
          return (
            <div className={style.headerCell} onClick={() => this.props.onSort(index)}>
              {column}
              {this.props.columnToSortBy === index ? this.renderSortArrow() : null}
            </div>
          );
        })}
      </div>
    );
  }

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

  calcLastPage = ({data, itemsPerPage}) => Math.ceil(data.length / itemsPerPage) - 1;

  loadMore = () => {
    if (this.state.currentPage < this.state.lastPage) {
      this.setState({currentPage: this.state.currentPage + 1});
    } else {
      this.props.loadMore && this.props.loadMore();
    }
  }

  createInitialScrollingState(props) {
    return {currentPage: 0, lastPage: this.calcLastPage(props)};
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

  headerRenderer() {
    return (
      <div>Full Name</div>
    );
  }

  rowClassName = ({index}) => {
    if (index < 0) {
      return style.headerRow;
    } else {
      return classNames(style.bodyRow, {[style.clickable]: !!this.props.onRowClick}, this.props.rowClassName);
    }
  }

  cellRenderer = ({rowData, columnIndex, rowIndex}) => this.props.columns[columnIndex].render(rowData, rowIndex);
  onRowClick = ({index, rowData}) => this.props.onRowClick && this.props.onRowClick(rowData, index);

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
    const {data, infiniteScroll} = this.props;

    const table = this.renderTable(data);

    if (infiniteScroll) {
      return this.wrapWithInfiniteScroll(table);
    }

    return table;
  }

}
DataTable.defaultProps = {
  columnToSortBy: 0
};

DataTable.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    render: PropTypes.func.isRequired,
    width: PropTypes.number
  })),
  data: PropTypes.array.isRequired,
  loader: PropTypes.node,
  itemsPerPage: PropTypes.number,
  onRowClick: PropTypes.func,
  dataHook: PropTypes.string,
  sortDirection: PropTypes.oneOf(['ascent', 'descent']),
  columnToSortBy: PropTypes.number,
  onSort: PropTypes.func
};

DataTable.defaultProps = {
  loader: <div className="loader">Loading ...</div>
};

export default DataTable;
