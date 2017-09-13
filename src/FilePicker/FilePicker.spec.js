import React from 'react';
import FilePicker from './index';
import filePickerDriverFactory from './FilePicker.driver';
import {createDriverFactory} from '../test-common';
import {filePickerTestkitFactory} from '../../testkit';
import {filePickerTestkitFactory as enzymeFilePickerTestkitFactory} from '../../testkit/enzyme';
import {isTestkitExists, isEnzymeTestkitExists} from '../../testkit/test-common';

describe('FilePicker', () => {
  const createDriver = createDriverFactory(filePickerDriverFactory);

  describe('error property', () => {

    it('should not have error by defaullt', () => {
      const driver = createDriver(<FilePicker/>);
      expect(driver.hasError()).toEqual(false);
    });

    it('should have error', () => {
      const driver = createDriver(<FilePicker error errorMessage="error!!!"/>);
      expect(driver.hasError()).toEqual(true);
      expect(driver.errorMessage()).toEqual('error!!!');
    });
  });

  describe('testkit', () => {
    it('should exist', () => {
      expect(isTestkitExists(<FilePicker/>, filePickerTestkitFactory)).toBe(true);
    });
  });

  describe('enzyme testkit', () => {
    it('should exist', () => {
      expect(isEnzymeTestkitExists(<FilePicker/>, enzymeFilePickerTestkitFactory)).toBe(true);
    });
  });
});
