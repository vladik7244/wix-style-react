import React from 'react';
import ImageViewer from './index';
import ImageViewerDriverFactory from './ImageViewer.driver';
import {createDriverFactory} from '../test-common';
import {imageViewerTestkitFactory} from '../../testkit';
import {imageViewerTestkitFactory as enzymeImageViewerTestkitFactory} from '../../testkit/enzyme';
import {mount} from 'enzyme';
import ReactTestUtils from 'react-dom/test-utils';

describe('ImageViewer', () => {

  const createDriver = createDriverFactory(ImageViewerDriverFactory);
  let props, driver;
  const IMAGE_URL = 'some-image-url.png';
  const addImage = jest.fn();
  const updateImage = jest.fn();
  const removeImage = jest.fn();

  describe('when default scenario', () => {
    beforeEach(() => {
      props = {
        imageUrl: IMAGE_URL,
        onAddImage: addImage,
        onUpdateImage: updateImage,
        onRemoveImage: removeImage
      };
      driver = createDriver(<ImageViewer {...props}/>);
    });

    it('should display image url', () => {
      expect(driver.getImageUrl()).toBe(IMAGE_URL);
    });

    it('should trigger add image', () => {
      driver.clickAdd();
      expect(addImage).toBeCalled();
    });

    it('should trigger update image', () => {
      driver.clickUpdate();
      expect(updateImage).toBeCalled();
    });

    it('should trigger remove image', () => {
      driver.clickRemove();
      expect(removeImage).toBeCalled();
    });

  });

  it('should not display image if not exists', () => {
    props = {
      imageUrl: ''
    };
    driver = createDriver(<ImageViewer {...props}/>);
    expect(driver.isImageVisible()).toBeFalsy();
  });

  describe('testkit', () => {
    it('should exist', () => {
      const div = document.createElement('div');
      const dataHook = 'myDataHook';
      const wrapper = div.appendChild(ReactTestUtils.renderIntoDocument(<div><ImageViewer dataHook={dataHook}/></div>));
      const imageViewerTestkit = imageViewerTestkitFactory({wrapper, dataHook});
      expect(imageViewerTestkit.exists()).toBeTruthy();
    });
  });

  describe('enzyme testkit', () => {
    it('should exist', () => {
      const dataHook = 'myDataHook';
      const wrapper = mount(<ImageViewer dataHook={dataHook}/>);
      const imageViewerTestkit = enzymeImageViewerTestkitFactory({wrapper, dataHook});
      expect(imageViewerTestkit.exists()).toBeTruthy();
    });
  });

});
