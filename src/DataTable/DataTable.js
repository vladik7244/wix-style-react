
import React from 'react';
import style from './DataTable.scss';
import WixComponent from '../BaseComponents/WixComponent';
import { Table, Column } from 'react-virtualized';



class DataTable extends WixComponent {
  headerRenderer() {
    return (
      <div>Full Name</div>
    );
  }

  render() {
    const list = [
      { name: 'Brian Vaughn', description: 'Software engineer' }, { name: 'Brian Vaughn2', description: 'Software engineer2' }
      // And so on...
    ];
    return (
        <Table
          width={1000}
          height={300}
          headerHeight={100}
          rowHeight={30}
          rowCount={list.length}
          rowGetter={({ index }) => list[index]}
        >
          <Column
            label='Name'
            dataKey='name'
            width={100}
          />
          <Column
            width={200}
            label='Description'
            dataKey='description'
          />
        </Table>
    );
  }

}

export default DataTable;
