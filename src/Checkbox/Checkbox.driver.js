import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import $ from 'jquery';

const checkboxDriverFactory = ({element, wrapper, component}) => {

  const checkbox = $(element).find('[data-automation-id="CHECKBOX_ROOT"]')[0];

  return {
    exists: () => !!element,
    click: () => ReactTestUtils.Simulate.click(checkbox),
    isChecked: () => $(element).find('.inner').length > 0,
    isDisabled: () => $(element).find('[data-automation-id="NATIVE_CHECKBOX"]').is(':disabled'),
    isIndeterminate: () => $(element).find('.indeterminate').length === 1,
    getLabel: () => element.textContent,
    setProps: props => {
      const ClonedWithProps = React.cloneElement(component, Object.assign({}, component.props, props), ...(component.props.children || []));
      ReactDOM.render(<div ref={r => element = r}>{ClonedWithProps}</div>, wrapper);
    }
  };
};

export default checkboxDriverFactory;
