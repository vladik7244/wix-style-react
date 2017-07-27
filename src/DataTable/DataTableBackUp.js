import React from 'react';
import PropTypes from 'prop-types';
import s from './DataTable.scss';
import classNames from 'classnames';
import InfiniteScroll from './InfiniteScroll';
import WixComponent from '../BaseComponents/WixComponent';

class DataTable extends WixComponent {
  constructor(props) {
    super(props);

    if (props.infiniteScroll) {
      this.state = this.createInitialScrollingState(props);
    }
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

  createInitialScrollingState(props) {
    return {currentPage: 0, lastPage: this.calcLastPage(props)};
  }

  render() {
    const {data, showHeaderWhenEmpty, infiniteScroll, itemsPerPage} = this.props;

    if (!data.length && !showHeaderWhenEmpty) {
      return null;
    }

    const rowsToRender = infiniteScroll ?
      data.slice(0, ((this.state.currentPage + 1) * itemsPerPage)) :
      data;

    const table = this.renderTable(rowsToRender);

    if (infiniteScroll) {
      return this.wrapWithInfiniteScroll(table);
    }

    return table;
  }

  wrapWithInfiniteScroll = table => {
    return (
      <InfiniteScroll
        pageStart={0}
        loadMore={this.loadMore}
        hasMore={this.state.currentPage < this.state.lastPage || (this.props.hasMore)}
        loader={this.props.loader}
        useWindow={this.props.useWindow}
        scrollElement={this.props.scrollElement}
        >
        {table}
      </InfiniteScroll>
    );
  };

  renderTable = rowsToRender => {
    const style = {width: this.props.width};
    return (
      <div>
        <table id={this.props.id} style={style} className={s.table}>
          <thead>
            <tr>
              {this.props.columns.map(this.renderHeaderCell)}
            </tr>
          </thead>
          {this.renderBody(rowsToRender)}
        </table>
      </div>);
  };

  renderBody = rows => (
    <tbody>
      {rows.map(this.renderRow)}
    </tbody>
  );

  renderRow = (rowData, rowNum) => {
    const {onRowClick, rowDataHook, dynamicRowClass} = this.props;
    const rowClasses = [this.props.rowClass];
    const optionalRowProps = {};

    if (onRowClick) {
      optionalRowProps.onClick = event => {
        if (event.isDefaultPrevented()) {
          return;
        }

        onRowClick(rowData, rowNum);
      };
      rowClasses.push(s.clickableDataRow);
    }

    if (rowDataHook) {
      optionalRowProps['data-hook'] = rowDataHook;
    }

    if (dynamicRowClass) {
      rowClasses.push(dynamicRowClass(rowData, rowNum));
    }

    optionalRowProps.className = classNames(rowClasses);

    return (
      <tr
        key={rowNum}
        {...optionalRowProps}
        >
        {this.props.columns.map((column, colNum) => this.renderCell(rowData, column, rowNum, colNum))}
      </tr>
    );
  };

  renderCell = (rowData, column, rowNum, colNum) => {
    const classes = classNames({[s.important]: column.important});
    return <td className={classes} key={colNum}>{column.render && column.render(rowData, rowNum)}</td>;
  };

  renderHeaderCell = (column, colNum) => {
    const style = {
      width: column.width,
    };
    return <th style={style} key={colNum}>{column.title}</th>;
  };

  calcLastPage = ({data, itemsPerPage}) => Math.ceil(data.length / itemsPerPage) - 1;

  loadMore = () => {
    if (this.state.currentPage < this.state.lastPage) {
      this.setState({currentPage: this.state.currentPage + 1});
    } else {
      this.props.loadMore && this.props.loadMore();
    }
  }
}

function validateData(props, propName) {
  if (props[propName]) {
    if (props[propName].constructor && props[propName].constructor.name && props[propName].constructor.name.toLowerCase().indexOf('array') > -1) {
      return null;
    } else {
      return Error('Data element must be an array type');
    }
  }
  return null;
}

DataTable.defaultProps = {
  data: [],
  columns: [],
  showHeaderWhenEmpty: false,
  infiniteScroll: false,
  itemsPerPage: 20,
  width: '100%',
  loadMore: null,
  hasMore: false,
  loader: <div className="loader">Loading ...</div>,
  scrollElement: null,
  useWindow: true,
  thPadding: '5px',
  thHeight: '36px',
  thFontSize: '12px'
};

DataTable.propTypes = {
  id: PropTypes.string,
  data: validateData,
  columns: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.string
    ]).isRequired,
    render: PropTypes.func.isRequired
  })),
  showHeaderWhenEmpty: PropTypes.bool,
  rowDataHook: PropTypes.string,
  rowClass: PropTypes.string,
  dynamicRowClass: PropTypes.func,
  onRowClick: PropTypes.func,
  infiniteScroll: PropTypes.bool,
  itemsPerPage: PropTypes.number,
  width: PropTypes.string,
  loadMore: PropTypes.func,
  hasMore: PropTypes.bool,
  loader: PropTypes.node,
  useWindow: PropTypes.bool,
  scrollElement: PropTypes.object,
  thPadding: PropTypes.string,
  thHeight: PropTypes.string,
  thFontSize: PropTypes.string
};

DataTable.displayName = 'DataTable';

export default DataTable;
