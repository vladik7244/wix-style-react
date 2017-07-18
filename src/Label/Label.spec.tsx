import * as React from 'react';
//import * as ReactTestUtils from 'react-dom/test-utils';
import Label from './Label';
import labelDriverFactory from './Label.driver';
import {createDriverFactory} from '../test-common';
//import {labelTestkitFactory} from '../../testkit';
import {labelTestkitFactory as enzymeLabelTestkitFactory} from '../../testkit/enzyme';
import {mount} from 'enzyme';
import {expect} from 'chai';

describe('Label', () => {

  const createDriver = createDriverFactory(labelDriverFactory);

  it('should contain native label', () => {
    const driver = createDriver(<Label appearance="T1"/>);
    expect(driver.getTagName()).to.be('label');
  });

  it('should render children', () => {
    const children = 'inner text';

    const driver = createDriver(<Label appearance="T1">{children}</Label>);
    expect(driver.getLabelText()).to.be(children);
  });

  it('should support `for` attribute', () => {
    const forAttr = 'some_id';

    const driver = createDriver(<Label appearance="T1" for={forAttr}/>);
    expect(driver.getAttr('for')).to.be(forAttr);
  });

  it('should apply class by appearance', () => {
    const appearance = 'T1.1';

    const driver = createDriver(<Label appearance={appearance}/>);
    expect(driver.getClassList()).to.contain('t1_1');
  });
});

// describe('testkit', () => {
//   it('should create new driver', () => {
//     const div = document.createElement('div');
//     const dataHook = 'myDataHook';
//     const wrapper = div.appendChild(ReactTestUtils.renderIntoDocument(<div><Label dataHook={dataHook} appearance="T1">label</Label></div>));
//     const labelTestkit = labelTestkitFactory({wrapper, dataHook});
//     expect(labelTestkit.exists()).to.be.true;
//     expect(labelTestkit.getLabelText()).to.be('label');
//   });
// });

describe('enzyme testkit', () => {
  it('should create new driver', () => {
    const dataHook = 'myDataHook';
    const wrapper = mount(<Label dataHook={dataHook} appearance="T1">label2</Label>);
    const labelTestkit = enzymeLabelTestkitFactory({wrapper, dataHook});
    expect(labelTestkit.exists()).to.be.true;
    expect(labelTestkit.getLabelText()).to.be('label2');
  });
});
