
import React from 'react';
import style from './DataTable.scss';
import classNames from 'classnames';
import WixComponent from '../BaseComponents/WixComponent';
//import InfiniteScroll from './InfiniteScroll';
import PropTypes from 'prop-types';
import {ArrowVertical} from '../Icons';

class DataTable extends WixComponent {
  // constructor(props) {
  //   super(props);

  //   if (props.infiniteScroll) {
  //     this.state = this.createInitialScrollingState(props);
  //   }
  // }

  // componentWillReceiveProps(nextProps) {
  //   let isLoadingMore = false;
  //   if (this.props.infiniteScroll && nextProps.data !== this.props.data) {
  //     if (nextProps.data instanceof Array && this.props.data instanceof Array) {
  //       if (this.props.data.every((elem, index) => {
  //         return nextProps.data.length > index && nextProps.data[index] === elem;
  //       })) {
  //         isLoadingMore = true;
  //         this.setState({lastPage: this.calcLastPage(nextProps)});
  //       }
  //     }

  //     if (!isLoadingMore) {
  //       this.setState(this.createInitialScrollingState(nextProps));
  //     }
  //   }
  // }

  // calcLastPage = ({data, itemsPerPage}) => Math.ceil(data.length / itemsPerPage) - 1;

  // loadMore = () => {
  //   if (this.state.currentPage < this.state.lastPage) {
  //     this.setState({currentPage: this.state.currentPage + 1});
  //   } else {
  //     this.props.loadMore && this.props.loadMore();
  //   }
  // }

  // createInitialScrollingState(props) {
  //   return {currentPage: 0, lastPage: this.calcLastPage(props)};
  // }

  // componentDidMount() {
  //   this.scrollContainer = document.getElementsByClassName('ReactVirtualized__Grid ReactVirtualized__Table__Grid');
  //   if (this.scrollContainer.length) {
  //     this.scrollContainer = this.scrollContainer[this.scrollContainer.length - 1];
  //   }
  // }

  // wrapWithInfiniteScroll = table => {
  //   return (
  //     <InfiniteScroll
  //       pageStart={0}
  //       loadMore={this.loadMore}
  //       hasMore={this.state.currentPage < this.state.lastPage || (this.props.hasMore)}
  //       loader={this.props.loader}
  //       scrollElement={this.scrollContainer}
  //       >
  //       {table}
  //     </InfiniteScroll>
  //   );
  // };


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
      <div className={classNames(style.sortArrow, {[style.descent]: this.props.sortDirection === 'descent'})} >
        <ArrowVertical width={7} height={7}/>
      </div>);
  };

  renderHeaderColumn = column => <span className={style.headerTitle}>{column.title}</span>;

  renderHeader() {
    return (
      <div className={style.headerRow}>
        {this.props.columns.map((column, index) => {
          let renderedColumn = this.renderHeaderColumn(column);
          if (column.sortable) {
            renderedColumn = this.renderSortableColumn(renderedColumn, column.sortKey);
          }
          return <div key={index} style={{width: column.width}}>{renderedColumn}</div>;
        })}
      </div>
    );
  }

  renderRow = (rowData, rowIndex) => {
    return (
      <li className={classNames(style.bodyRow, {[style.clickable]: !!this.props.onRowClick})} onClick={() => this.props.onRowClick && this.props.onRowClick(rowData, rowIndex)}>
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

  render() {
    return (
      <div>
        {this.renderHeader()}
        {this.renderContent()}
      </div>
    );
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
  columnToSortBy: PropTypes.string,
  onSort: PropTypes.func
};

DataTable.defaultProps = {
  loader: <div className="loader">Loading ...</div>,
  columnToSortBy: 0
};

export default DataTable;
