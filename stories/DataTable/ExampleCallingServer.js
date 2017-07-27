import React from 'react';
import DataTable from 'wix-style-react/DataTable';

const style = {
  width: '100%',
  height: 600
};

const baseData = [
    {firstName: 'Meghan', lastName: 'Bishop'},
    {firstName: 'Sara', lastName: 'Porter'},
    {firstName: 'Deborah', lastName: 'Rhodes'},
    {firstName: 'Walter', lastName: 'Jenning'}
];

const header = <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'red', height: 40}}>Pizdez</div>;
const footer = <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'green', height: 20}}>Dayum</div>;

const generateData = count => {
  let data = [];
  for (let i = 0; i < count; i++) {
    data = data.concat(baseData);
  }
  return data;
};

class DataTableExample extends React.Component {

  constructor(props) {
    super(props);
    this.state = {hasMore: true, count: 5};
    this.loadMore = this.loadMore.bind(this);

  }

  loadMore() {
    const loadMoreData = () => {
      this.setState({count: this.state.count + 5});
      if (this.state.count > 20) {
        this.setState({hasMore: false});
      }
    };
    setTimeout(loadMoreData, 3000);
  }

  render() {
    return (
      <div style={style}>
        <DataTable
          data={generateData(this.state.count)}
          onRowClick={(row, rowNum) => {
            /*eslint-disable no-alert*/
            window.alert(`You clicked "${row.firstName} ${row.lastName}", row number ${rowNum + 1}`);
            /*eslint-enable no-alert*/
          }}
          pageHeading={header}
          isPage={false}
          height={400}
          scrollBarOffset={30}
          infiniteScroll
          columns={[
              {title: 'Row Number', render: (row, rowNum) => '#' + (rowNum + 1), width: '20%', minWidth: '75px', important: true},
              {title: 'First Name', render: row => <span>{row.firstName}</span>, width: '40%', minWidth: '100px'},
              {title: 'Last Name', render: row => <span>{row.lastName}</span>, width: '40%', minWidth: '100px'}
          ]}
          hasMore={this.state.hasMore}
          loadMore={this.loadMore}
          />
      </div>
    );
  }
}

export default DataTableExample;
