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
  for (let i = 0; i < 2; i++) {
    data = data.concat(baseData);
  }
  return data;
};

const MyRowDetailsComponent = props => {
  return (
    <div style={{padding: '9px'}}>
      <h2>User Details</h2>
      <p>First name: {props.firstName}</p>
      <p>Last name: {props.lastName}</p>
    </div>
  );
};

class ExampleWithRowDetails extends React.Component {
  render() {
    return (
      <div style={style}>
        <DataTable
          dataHook="story-data-table"
          data={generateData()}
          rowDetails={(row, rowNum) => <MyRowDetailsComponent {...row}/>}
          allowMultiDetailsExpansion
          columns={[
            {title: 'Row Number', render: (row, rowNum) => '#' + (rowNum + 1), width: '20%', minWidth: '75px', important: true},
            {title: 'First Name', render: row => <span>{row.firstName}</span>, width: '40%', minWidth: '100px'},
            {title: 'Last Name', render: row => <span>{row.lastName}</span>, width: '40%', minWidth: '100px'}
          ]}
          />
      </div>
    );
  }
}

export default ExampleWithRowDetails;
