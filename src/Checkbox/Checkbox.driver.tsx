import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactTestUtils from 'react-dom/test-utils';
import * as $ from 'jquery';
import {ICheckboxProps} from './Checkbox';

const checkboxDriverFactory = ({element, wrapper, component}: {element: any, wrapper: any, component: any}) => {

  const checkbox = $(element).find('input')[0];
  const isClassExists = (element: any, className: string) => !!(element.className.match(new RegExp('\\b' + className + '\\b')));

  return {
    exists: () => !!element,
    click: () => ReactTestUtils.Simulate.change(checkbox),
    isChecked: () => isClassExists(element, 'checked'),
    isDisabled: () => isClassExists(element, 'disabled'),
    isIndeterminate: () => $(element).find('.indeterminate').length === 1,
    getLabel: () => element.textContent,
    setProps: (props: ICheckboxProps) => {
      const ClonedWithProps = React.cloneElement(component, Object.assign({}, component.props, props), ...(component.props.children || []));
      ReactDOM.render(<div ref={r => element = r}>{ClonedWithProps}</div>, wrapper);
    }
  };
};

export default checkboxDriverFactory;
