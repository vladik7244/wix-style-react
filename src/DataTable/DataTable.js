
import React from 'react';
import style from './DataTable.scss';
import classNames from 'classnames';
import WixComponent from '../BaseComponents/WixComponent';
import { Table, Column } from 'react-virtualized';

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

  render() {
    const list = [
      { name: 'Brian Vaughn', description: 'Software engineer', another: 'wut' },
      { name: 'Brian Vaughn2', description: 'Software engineer2', another: 'wat' },
      { name: 'Brian Vaughn2', description: 'Software engineer2', another: 'wat' },
      { name: 'Brian Vaughn2', description: 'Software engineer2', another: 'wat' },
      { name: 'Brian Vaughn2', description: 'Software engineer2', another: 'wat' },
      { name: 'Brian Vaughn2', description: 'Software engineer2', another: 'wat' },
      { name: 'Brian Vaughn2', description: 'Software engineer2', another: 'wat' },
      { name: 'Brian Vaughn2', description: 'Software engineer2', another: 'wat' },
      { name: 'Brian Vaughn2', description: 'Software engineer2', another: 'wat' },
      { name: 'Brian Vaughn2', description: 'Software engineer2', another: 'wat' },
      { name: 'Brian Vaughn2', description: 'Software engineer2', another: 'wat' },
      { name: 'Brian Vaughn2', description: 'Software engineer2', another: 'wat' },
      { name: 'Brian Vaughn2', description: 'Software engineer2', another: 'wat' },
      { name: 'Brian Vaughn2', description: 'Software engineer2', another: 'wat' },
      { name: 'Brian Vaughn2', description: 'Software engineer2', another: 'wat' },
      { name: 'Brian Vaughn2', description: 'Software engineer2', another: 'wat' }
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

    ];
    return (
        <Table
          width={1000}
          height={300}
          headerHeight={14}
          rowHeight={30}
          rowCount={list.length}
          rowClassName={this.rowClassName}
          headerClassName={style.headerColumn}
          rowGetter={({ index }) => list[index]}
          tabIndex={null}
        >
          <Column
            label='Name'
            dataKey='name'
            width={100}
            className={style.rowColumn}
          />
          <Column
            width={200}
            label='Description'
            dataKey='description'
            className={style.rowColumn}
          />
          <Column
            width={200}
            label='Another one'
            dataKey='another'
            className={style.rowColumn}
          />
        </Table>
    );
  }

}

export default DataTable;
