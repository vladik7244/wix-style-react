
import React from 'react';
import style from './DataTable.scss';
import classNames from 'classnames';
import WixComponent from '../BaseComponents/WixComponent';
import { Table, Column } from 'react-virtualized';
import PropTypes from 'prop-types';

class DataTable extends WixComponent {
  headerRenderer() {
    return (
      <div>Full Name</div>
    );
  }

  rowClassName = ({index}) => {
    if (index < 0) {
      return style.headerRow;
    } else {
      return classNames(style.bodyRow, this.props.rowClassName);
    }
  }

  cellRenderer = ({rowData, columnIndex, rowIndex}) => this.props.columns[columnIndex].render(rowData, rowIndex);

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


    return (
        <Table
          className={style.wixStyleDataTable}
          width={1000}
          height={300}
          headerHeight={14}
          rowHeight={30}
          rowCount={this.props.data.length}
          rowClassName={this.rowClassName}
          headerClassName={style.headerColumn}
          rowGetter={({ index }) => this.props.data[index]}
          tabIndex={null}
        >
          {this.props.columns.map(column => {
            return <Column
              label={column.title}
              dataKey=''
              cellRenderer={this.cellRenderer}
              width={100}
              className={style.rowColumn}
          />;
          })}
        </Table>
    );
  }

}

DataTable.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string
  })),
  render: PropTypes.func,
  data: PropTypes.array
};

export default DataTable;
