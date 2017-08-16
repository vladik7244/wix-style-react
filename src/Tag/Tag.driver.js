import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import ReactDOM from 'react-dom';
import $ from 'jquery';

const tagDriverFactory = ({element, wrapper, component}) => {

  const isClassExists = (element, className) => (element && element.className.indexOf(className) !== -1);
  const removeButton = $(element).find('a')[0];
  const thumb = $(element).find('span')[0];
  const contentWithoutThumb = $(element).find('span')[0];

  return {
    exists: () => !!element,
    isLarge: () => isClassExists(element, 'large'),
    isStandardTheme: () => isClassExists(element, 'standard'),
    isWarningTheme: () => isClassExists(element, 'warning'),
    isErrorTheme: () => isClassExists(element, 'error'),
    isRemovable: () => isClassExists(removeButton, 'tagRemoveButton'),
    removeTag: () => ReactTestUtils.Simulate.click(removeButton),
    isThumbExists: () => isClassExists(thumb, 'thumb'),
    isWrapped: () => isClassExists(element, 'tagWrap') && isClassExists(contentWithoutThumb, 'innerTagWrap'),
    isDisabled: () => isClassExists(element, 'disabled'),
    getLabel: () => element.textContent,
    getTitle: () => element.title,
    setProps: props => {
      const ClonedWithProps = React.cloneElement(component, Object.assign({}, component.props, props), ...(component.props.children || []));
      ReactDOM.render(<div ref={r => element = r}>{ClonedWithProps}</div>, wrapper);
    }
  };
};

export default tagDriverFactory;
