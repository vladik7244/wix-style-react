import React from 'react';
import {FullPageTable, TableCell} from 'wix-style-react';
import s from './Example.scss';

const style = {
  width: '100%',
  height: 600
};

const header = <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'red', height: 40}}>Pizdez</div>;

const data = [
      {name: 'Brian Vaughn', description: 'Software engineer', another: 'wut'},
      {name: 'Brian Vaughn', description: 'Software engineer', another: 'wat'},
      {name: 'Brian Vaughn', description: 'Software engineer', another: 'wat'},
      {name: 'Brian Vaughn', description: 'Software engineer', another: 'wat'},
      {name: 'Brian Vaughn', description: 'Software engineer', another: 'wat'},
      {name: 'Brian Vaughn', description: 'Software engineer', another: 'wat'},
      {name: 'Brian Vaughn', description: 'Software engineer', another: 'wat'},
      {name: 'Brian Vaughn', description: 'Software engineer', another: 'wat'},
      {name: 'Brian Vaughn', description: 'Software engineer', another: 'wat'},
      {name: 'Brian Vaughn', description: 'Software engineer', another: 'wat'}];

const columns = [
    {title: 'Name', render: (rowData, rowIndex) => <TableCell>{rowData.name + rowIndex}</TableCell>, width: '20%', sortable: true, sortKey: 'name'},
    {title: 'Description', render: rowData => <TableCell padding={0}><div style={{display: 'flex', height: '100%', alignItems:'center', backgroundColor: 'goldenrod', hegith:'100%', color: 'blue', fontSize: 18}}>{rowData.description}</div></TableCell>, width: '40%'},
    {title: () => <div>Another<span style={{marginLeft: 5, color: 'red'}}>(!)</span></div>, render: rowData => <TableCell>{rowData.another}</TableCell>, width: '20%', sortable: true, sortKey: 'author'},
];

const onRowClick = (row, index) => console.log(row, index);

class TableExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {sortDirection: 'ascent', sortByCol: 'name'};
  }
  switchSortDirection = () => {
    this.setState({sortDirection: this.state.sortDirection === 'ascent' ? 'descent' : 'ascent'});
  }

  onSort = sortKey => {
    this.setState({sortByCol: sortKey});
    if (sortKey === this.state.sortByCol) {
      this.switchSortDirection();
    }
  }
  render() {
    return (
      <div style={style}>
        <FullPageTable
          id="kek"
          pageHeading={header}
          columns={columns}
          data={data}
          hideHeader={false}
          onRowClick={onRowClick}
          sortDirection={this.state.sortDirection}
          columnToSortBy={this.state.sortByCol}
          onSort={this.onSort}
          />
      </div>
    );
  }
}

export default TableExample;
