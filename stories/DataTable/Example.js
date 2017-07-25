import React from 'react';
import DataTable from 'wix-style-react/DataTable';
import s from './Example.scss';

const style = {
  width: '50%',
};

const data = [
      { name: 'Brian Vaughn', description: 'Software engineer', another: 'wut' },
      { name: 'Brian Vaughn', description: 'Software engineer', another: 'wat' },
      { name: 'Brian Vaughn', description: 'Software engineer', another: 'wat' },
      { name: 'Brian Vaughn', description: 'Software engineer', another: 'wat' },
      { name: 'Brian Vaughn', description: 'Software engineer', another: 'wat' },
      { name: 'Brian Vaughn', description: 'Software engineer', another: 'wat' },
      { name: 'Brian Vaughn', description: 'Software engineer', another: 'wat' },
      { name: 'Brian Vaughn', description: 'Software engineer', another: 'wat' },
      { name: 'Brian Vaughn', description: 'Software engineer', another: 'wat' },
      { name: 'Brian Vaughn', description: 'Software engineer', another: 'wat' },
      { name: 'Brian Vaughn', description: 'Software engineer', another: 'wat' },
      { name: 'Brian Vaughn', description: 'Software engineer', another: 'wat' },
      { name: 'Brian Vaughn', description: 'Software engineer', another: 'wat' },
      { name: 'Brian Vaughn', description: 'Software engineer', another: 'wat' },
      { name: 'Brian Vaughn', description: 'Software engineer', another: 'wat' },
      { name: 'Brian Vaughn', description: 'Software engineer', another: 'wat' } ];

  const columns = [
    {title: 'Name', render: (rowData, rowIndex) => rowData.name + rowIndex, width: 100},
    {title: 'Description', render: (rowData) => rowData.description , width: 100},
    {title: 'Another', render: (rowData) => rowData.another , width: 100},
];

const onRowClick = (row, index) => console.log(row, index); 

class DataTableExample extends React.Component {
  constructor(props){
    super(props);
    this.state = {sortDirection: 'ascent', sortByCol: 0};
  }
  switchSortDirection = () => {
      this.setState({sortDirection: this.state.sortDirection === 'ascent'? 'descent': 'ascent'});
  }

  onSort = (columnIndex) => {
    this.setState({sortByCol: columnIndex});
    if (columnIndex === this.state.sortByCol) {
      this.switchSortDirection();
    }
  }
  render() {
    return (
      <div style={style}>
        <DataTable
          columns={columns}
          data={data}
          onRowClick={onRowClick} 
          sortDirection={this.state.sortDirection}
          columnToSortBy={this.state.sortByCol}
          onSort={this.onSort}
        />
      </div>
    );
  }
}

export default DataTableExample;
