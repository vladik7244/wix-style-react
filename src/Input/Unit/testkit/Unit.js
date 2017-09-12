import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import Unit from '../index';

const unitDriverFactory = ({element}) => {
  return {
    isEmpty: () => element.children.length === 0,
    hasChild: style => !!element.querySelector(style)
  };
};


const componentFactory = (props = {}) => {
  let element;
  const wrapperDiv = document.createElement('div');
  ReactDOM.render(<div ref={r => element = r}><Unit {...props}/></div>, wrapperDiv);
  return {element: element.childNodes[0], wrapper: wrapperDiv};
};

const unitTestkitFactory = ({wrapper, dataHook}) => {
  const element = $(wrapper).find(`[data-hook='${dataHook}']`);
  return unitDriverFactory({element, wrapper});
};

export {unitTestkitFactory, componentFactory, unitDriverFactory};
