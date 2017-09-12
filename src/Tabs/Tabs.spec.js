import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import {mount} from 'enzyme';
import {createDriverFactory} from '../test-common';
import tabsDriverFactory from './Tabs.driver';
import Tabs from './index';
import {tabsTestkitFactory} from '../../testkit';
import {tabsTestkitFactory as enzymeTabsTestkitFactory} from '../../testkit/enzyme';

describe('Tabs component', () => {
  let items;
  beforeEach(() => {
    items = [{id: 0, title: 'Tab 0'}, {id: 1, title: 'Tab 1'}, {id: 2, title: 'Tab 2'}];
  });

  it('should render tabs with correct titles', () => {
    const driver = createComponent({items});
    const expected = items.map(item => item.title);

    expect(driver.getTitles()).toEqual(expected);
  });

  it('should call onClick when tab is clicked', () => {
    const onClick = jest.fn();
    const driver = createComponent({items, onClick});

    driver.clickTabAt(1);
    expect(onClick).toHaveBeenCalledWith(items[1]);
  });

  it('should mark tab as active', () => {
    const driver = createComponent({items, activeId: 2});
    expect(driver.getActiveTabIndex()).toBe(2);
  });

  it('should change active tab', () => {
    const driver = createComponent({items, activeId: 2});
    driver.setProps({items, activeId: 1});
    expect(driver.getActiveTabIndex()).toBe(1);
  });

  it('should have default type when not specified', () => {
    const driver = createComponent({items});
    expect(driver.isDefaultType()).toBeTruthy();
  });

  it('should get custom style', () => {
    const type = 'compact';
    const driver = createComponent({items, type});
    expect(driver.isOfType('compact')).toBeTruthy();
  });

  it('should have divider by default', () => {
    const driver = createComponent({items});
    expect(driver.hasDivider()).toBeTruthy();
  });

  it('should not have divider if props.divider is falsy', () => {
    const driver = createComponent({items, hasDivider: false});
    expect(driver.hasDivider()).toBeFalsy();
  });

  it('should set tab widt, when selected type is Uniform Side', () => {
    const width = '100px';
    const driver = createComponent({items, width, type: 'uniformSide'});
    expect(driver.getTabsWidth().size).toBe(1);
    expect(driver.getTabsWidth().has(width)).toBeTruthy();
  });

  const createDriver = createDriverFactory(tabsDriverFactory);
  function createComponent(props) {
    return createDriver(<Tabs {...props}/>);
  }

  describe('testkit', () => {
    it('should exist', () => {
      const div = document.createElement('div');
      const dataHook = 'myDataHook';
      const wrapper = div.appendChild(ReactTestUtils.renderIntoDocument(
        <div><Tabs items={[]} dataHook={dataHook}/></div>)
      );
      const breadcrumbsTestkit = tabsTestkitFactory({wrapper, dataHook});
      expect(breadcrumbsTestkit.exists()).toBeTruthy();
    });
  });

  describe('enzyme testkit', () => {
    it('should exist', () => {
      const dataHook = 'myDataHook';
      const wrapper = mount(<Tabs items={[]} dataHook={dataHook}/>);
      const breadcrumbsTestkit = enzymeTabsTestkitFactory({wrapper, dataHook});
      expect(breadcrumbsTestkit.exists()).toBeTruthy();
    });
  });
});
