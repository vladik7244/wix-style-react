import dataTableDriverFactory from './DataTable.driver';
import React from 'react';
import DataTable from './DataTable';
import ReactTestUtils from 'react-dom/test-utils';
import {createDriverFactory} from '../test-common';
import {dataTableTestkitFactory} from '../../testkit';
import {dataTableTestkitFactory as enzymeDataTableTestkitFactory} from '../../testkit/enzyme';
import {mount} from 'enzyme';

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
    const driver = createDriver(<DataTable {...defaultProps}/>);
    expect(driver.hasChildWithId(defaultProps.id)).toBeTruthy();
  });

  it('should display nothing when data is empty', () => {
    const props = {
      ...defaultProps,
      data: []
    };

    const driver = createDriver(<DataTable {...props}/>);
    expect(driver.isDisplayingNothing()).toBeTruthy();
  });

  it('should display header only when data is empty and showHeaderWhenEmpty is true', () => {
    const props = {
      ...defaultProps,
      data: [],
      showHeaderWhenEmpty: true
    };

    const driver = createDriver(<DataTable {...props}/>);
    expect(driver.isDisplayingHeaderOnly()).toBeTruthy();
  });

  it('should render column titles', () => {
    const driver = createDriver(<DataTable {...defaultProps}/>);
    expect(driver.getTitles()).toEqual(defaultProps.columns.map(col => col.title));
  });

  it('should display correct amount of rows', () => {
    const driver = createDriver(<DataTable {...defaultProps}/>);
    expect(driver.getRowsCount()).toBe(defaultProps.data.length);
  });

  it('should render rows', () => {
    const driver = createDriver(<DataTable {...defaultProps}/>);
    expect(driver.getRowText(0)).toEqual(['0', 'value 1', 'value 2']);
    expect(driver.getRowText(1)).toEqual(['1', 'value 3', 'value 4']);
  });

  it('should assign class to rows', () => {
    const driver = createDriver(<DataTable {...defaultProps}/>);
    expect(driver.getRowsWithClassCount(defaultProps.rowClass)).toBe(defaultProps.data.length);
  });

  it('should assign a dynamic class to rows', () => {
    const getClass = rowData => rowData.a.replace(/[\s]+/g, '-');
    const driver = createDriver(<DataTable {...defaultProps} dynamicRowClass={getClass}/>);
    expect(driver.getRowsWithClassCount('value-1')).toBe(1);
    expect(driver.getRowsWithClassCount('value-3')).toBe(1);
    expect(driver.getRowsWithClassCount(defaultProps.rowClass)).toBe(defaultProps.data.length);
  });

  it('should get a row classes', () => {
    const getDynamicClass = (rowData, rowNum) => rowNum === 1 ? 'rowNum1' : '';
    const driver = createDriver(<DataTable {...defaultProps} dynamicRowClass={getDynamicClass}/>);
    expect(driver.getRowClasses(1).sort()).toEqual(['class-name', 'rowNum1']);
  });

  it('should hide table header', () => {
    const driver = createDriver(<DataTable {...defaultProps} hideHeader/>);
    expect(driver.isDisplayingHeader()).toBe(false);
  });

  describe('clickableDataRow class', () => {
    it('should not assign the class to rows by default', () => {
      const props = {...defaultProps};

      const driver = createDriver(<DataTable {...props}/>);

      expect(driver.isRowClickable(0)).toBe(false);
    });

    it('should assign the class to rows when onRowClick prop is provided', () => {
      const props = {
        ...defaultProps,
        onRowClick: jest.fn()
      };

      const driver = createDriver(<DataTable {...props}/>);
      expect(driver.isRowClickable(0)).toBe(true);
    });
  });

  describe('Row event handlers', () => {
    const tests = [
      {handler: 'onRowClick', driverMethod: 'clickRow'},
      {handler: 'onMouseEnterRow', driverMethod: 'mouseEnterRow'},
      {handler: 'onMouseLeaveRow', driverMethod: 'mouseLeaveRow'}
    ];

    tests.forEach(({handler, driverMethod}) => {
      it(`should call ${handler} with row data and index`, () => {
        const props = {
          ...defaultProps,
          [handler]: jest.fn()
        };

        const driver = createDriver(<DataTable {...props}/>);

        driver[driverMethod](0);
        expect(props[handler]).toBeCalledWith(props.data[0], 0);

        driver[driverMethod](1);
        expect(props[handler]).toHaveBeenLastCalledWith(props.data[1], 1);
      });
    });

    it('should expand with correct content and collapse', () => {
      const animationSpeed = 500;

      const props = {
        ...defaultProps,
        rowDetails: row => <span>{row.a}</span>,
      };

      const driver = createDriver(<DataTable {...props}/>);
      expect(driver.hasRowDetails(0)).toBe(true);
      expect(driver.getRowDetailsText(0)).toBe('');
      driver.clickRow(0);

      // After clicking content will appear at once
      expect(driver.getRowDetailsText(0)).toBe(defaultProps.data[0].a);
      driver.clickRow(0);
      expect(driver.hasRowDetails(0)).toBe(true);

      // When we clicking second time to collapse content will disappear after a while (based on animation speed)
      expect(driver.getRowDetailsText(0)).not.toBe('');

      return new Promise(resolve => {
        setTimeout(() => {
          expect(driver.getRowDetailsText(0)).toBe('');
        }, animationSpeed);
        resolve();
      });
    });

    it('should assign the class to rows when rowDetails prop is provided', () => {
      const props = {
        ...defaultProps,
        rowDetails: jest.fn()
      };

      const driver = createDriver(<DataTable {...props}/>);
      expect(driver.isRowClickable(0)).toBe(true);
    });

    it('should have correct row count when row details enabled', () => {
      const props = {
        ...defaultProps,
        rowDetails: jest.fn()
      };

      const driver = createDriver(<DataTable {...props}/>);
      expect(driver.getRowsCount()).toBe(2);
      driver.clickRow(0);
      expect(driver.getRowsCount()).toBe(2);
    });
  });

  describe('Sortable column titles', () => {
    const props = {
      ...defaultProps,
      columns: [
        {title: 'Row Num', render: (row, rowNum) => rowNum},
        {title: 'A', sortable: true, sortDescending: false, render: row => row.a},
        {title: 'B', render: row => row.b}
      ]
    };
    it('should display sortable title', () => {
      const _props = Object.assign({}, props, {onSortClick: jest.fn()});
      const driver = createDriver(<DataTable {..._props}/>);
      expect(driver.hasSortableTitle(0)).toBe(false);
      expect(driver.hasSortableTitle(1)).toBe(true);
    });

    it('should call on sort callback', () => {
      const _props = Object.assign({}, props, {onSortClick: jest.fn()});
      const driver = createDriver(<DataTable {..._props}/>);
      driver.clickSort(1);
      expect(_props.onSortClick).toBeCalledWith(props.columns[1], 1);
    });

    it('should call on sort callback', () => {
      const _props = Object.assign({}, props, {onSortClick: jest.fn()});
      const driver = createDriver(<DataTable {..._props}/>);
      driver.clickSort(2);
      expect(_props.onSortClick).not.toHaveBeenCalled();
    });
  });
  describe('testkit', () => {
    it('should exist', () => {
      const div = document.createElement('div');
      const dataHook = 'myDataHook';
      const wrapper = div.appendChild(ReactTestUtils.renderIntoDocument(<div><DataTable dataHook={dataHook} {...defaultProps}/></div>));
      const dataTableTestkit = dataTableTestkitFactory({wrapper, dataHook});
      expect(dataTableTestkit.hasChildWithId(defaultProps.id)).toBeTruthy();
    });
  });

  describe('enzyme testkit', () => {
    it('should exist', () => {
      const dataHook = 'myDataHook';
      const wrapper = mount(<DataTable {...defaultProps} dataHook={dataHook}/>);
      const dataTableTestkit = enzymeDataTableTestkitFactory({wrapper, dataHook});
      expect(dataTableTestkit.hasChildWithId(defaultProps.id)).toBeTruthy();
    });
  });
});
