import React from 'react';
import DataTable from 'wix-style-react/DataTable';
import s from './Example.scss';

const style = {
  width: '50%',
};

const data = [
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
      { name: 'Brian Vaughn2', description: 'Software engineer2', another: 'wat' } ];

  const columns = [
    {title: 'Name', render: (rowData, rowIndex) => rowData.name + rowIndex, width: 100},
    {title: 'Description', render: (rowData) => rowData.description , width: 100},
    {title: 'Another', render: (rowData) => rowData.another , width: 100},
];

const onRowClick = (row, index) => console.log(row, index); 

class DataTableExample extends React.Component {

  render() {
    return (
      <div style={style}>
        <DataTable
          columns={columns}
          data={data}
          onRowClick={onRowClick} 
        />
      </div>
    );
  }
}

export default DataTableExample;
