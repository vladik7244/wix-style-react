import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ILabelProps } from './label';

const labelDriverFactory = ({element, wrapper, component}: {element:any, wrapper:any, component:any}) => {
  return {
    exists: () => !!element,
    getTagName: () => element.tagName.toLowerCase(),
    getLabelText: () => element.textContent,
    getClassList: () => element.className,
    getAttr: (attrName: string) => element.getAttribute(attrName),
    setProps: (props: ILabelProps) => {
      const ClonedWithProps = React.cloneElement(component, Object.assign({}, component.props, props), ...(component.props.children || []));
      ReactDOM.render(<div ref={r => element = r}>{ClonedWithProps}</div>, wrapper);
    }
  };
};

export default labelDriverFactory;
