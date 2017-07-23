import React from 'react';
import DataTable from 'wix-style-react/DataTable';
import s from './Example.scss';

const style = {
  width: '50%',
};

const baseData = [
    {firstName: 'Meghan', lastName: 'Bishop'},
    {firstName: 'Sara', lastName: 'Porter'},
    {firstName: 'Deborah', lastName: 'Rhodes'},
    {firstName: 'Walter', lastName: 'Jenning'}
];

const generateData = () => {
  let data = [];
  for (let i = 0; i < 10; i++) {
    data = data.concat(baseData);
  }
  return data;
};

class DataTableExample extends React.Component {

  render() {
    return (
      <div style={style}>
        <DataTable/>
      </div>
    );
  }
}

export default DataTableExample;
