import dataTableDriverFactory from './Table.driver';
import React from 'react';
import Table from './Table';
import ReactTestUtils from 'react-dom/test-utils';
import {createDriverFactory} from '../test-common';
import {dataTableTestkitFactory} from '../../testkit';
import {dataTableTestkitFactory as enzymeTableTestkitFactory} from '../../testkit/enzyme';
import {mount} from 'enzyme';
import * as Sinon from 'sinon';

describe('Table', () => {
  const createDriver = createDriverFactory(dataTableDriverFactory);

  const defaultProps = {
    id: 'id',
    data: [{a: 'value 1', b: 'value 2'}, {a: 'value 3', b: 'value 4'}],
    columns: [
        {title: 'Row Num', render: (row, rowNum) => rowNum},
        {title: 'A', render: row => row.a},
        {title: 'B', render: row => row.b}
    ],
    rowClass: 'class-name'
  };

  it('should pass id prop to child', () => {
    const driver = createDriver(<Table {...defaultProps}/>);
    expect(driver.hasChildWithId(defaultProps.id)).toBeTruthy();
  });

  it('should display nothing when data is empty', () => {
    const props = {
      ...defaultProps,
      data: []
    };

    const driver = createDriver(<Table {...props}/>);
    expect(driver.isDisplayingNothing()).toBeTruthy();
  });

  it('should display header only when data is empty', () => {
    const props = {
      ...defaultProps,
      data: [],
      showHeaderWhenEmpty: true
    };

    const driver = createDriver(<Table {...props}/>);
    expect(driver.isDisplayingHeaderOnly()).toBeTruthy();
  });

  it('should render column titles', () => {
    const driver = createDriver(<Table {...defaultProps}/>);
    expect(driver.getTitles()).toEqual(defaultProps.columns.map(col => col.title));
  });

  it('should display correct amount of rows', () => {
    const driver = createDriver(<Table {...defaultProps}/>);
    expect(driver.getRowsCount()).toBe(defaultProps.data.length);
  });

  it('should render rows', () => {
    const driver = createDriver(<Table {...defaultProps}/>);
    expect(driver.getRowText(0)).toEqual(['0', 'value 1', 'value 2']);
    expect(driver.getRowText(1)).toEqual(['1', 'value 3', 'value 4']);
  });

  it('should assign class to rows', () => {
    const driver = createDriver(<Table {...defaultProps}/>);
    expect(driver.getRowsWithClassCount(defaultProps.rowClass)).toBe(defaultProps.data.length);
  });

  it('should allow specifying row class as func', () => {
    const getClass = (rowData, rowIndex) => rowData.a.replace(/[\s]+/g, '-') +`-rowIndex-${rowIndex}`;
    const driver = createDriver(<Table {...defaultProps} rowClass={getClass}/>);
    expect(driver.getRowsWithClassCount('value-1-rowIndex-0')).toBe(1);
    expect(driver.getRowsWithClassCount('value-3-rowIndex-1')).toBe(1);
  });

  it('should allow specifying row class as string', () => {
    const driver = createDriver(<Table {...defaultProps} rowClass={'staticRowClass'}/>);
    expect(driver.getRowsWithClassCount('staticRowClass')).toBe(defaultProps.data.length);
  });

  it('should allow specifying sortable columns', () => {
    const columns = [ {title: 'Name', render: () => null, width: '20%', sortable: true, sortKey: 'name'},
                      {title: 'Description', render: () => null, width: '20%', sortable: false}
                    ];
    const driver = createDriver(<Table {...defaultProps} columns={columns}/>);
    expect(driver.getAllSortableColumns().length).toBe(1);
  });

  it('should call onSort callback when clicking on a sortable column', () => {
    const onSort = Sinon.spy();
    const columns = [ {title: 'Name', render: () => null, width: '20%', sortable: true, sortKey: 'name'}];
    const driver = createDriver(<Table {...defaultProps} columns={columns} onSort={onSort}/>);
    ReactTestUtils.Simulate.click(driver.getAllSortableColumns()[0]);
    expect(onSort.getCall(0).args[0]).toBe('name');
  });

  it('should call onRowClick callback with row data and index', () => {
    const props = {
      ...defaultProps,
      onRowClick: jest.fn()
    };

    const driver = createDriver(<Table {...props}/>);
    driver.clickRow(0);
    expect(props.onRowClick).toBeCalledWith(props.data[0], 0);
    driver.clickRow(1);
    expect(props.onRowClick).toHaveBeenLastCalledWith(props.data[1], 1);
  });

  it('should not have a row on click handler by default', () => {
    const props = {
      ...defaultProps
    };

    const driver = createDriver(<Table {...props}/>);

    driver.clickRow(0); // should do nothing
    expect(driver.isRowClickable(0)).toBe(false);
  });

  it('should not trigger click handler if default was prevented', () => {
    const props = {
      ...defaultProps,
      onRowClick: jest.fn()
    };

    const driver = createDriver(<Table {...props}/>);
    driver.clickRow(0, {isDefaultPrevented: () => true});
    expect(props.onRowClick).not.toBeCalled();
  });

  describe('testkit', () => {
    it('should exist', () => {
      const div = document.createElement('div');
      const dataHook = 'myDataHook';
      const wrapper = div.appendChild(ReactTestUtils.renderIntoDocument(<div><Table dataHook={dataHook} {...defaultProps}/></div>));
      const dataTableTestkit = dataTableTestkitFactory({wrapper, dataHook});
      expect(dataTableTestkit.hasChildWithId(defaultProps.id)).toBeTruthy();
    });
  });

  describe('enzyme testkit', () => {
    it('should exist', () => {
      const dataHook = 'myDataHook';
      const wrapper = mount(<Table {...defaultProps} dataHook={dataHook}/>);
      const dataTableTestkit = enzymeTableTestkitFactory({wrapper, dataHook});
      expect(dataTableTestkit.hasChildWithId(defaultProps.id)).toBeTruthy();
    });
  });
});
