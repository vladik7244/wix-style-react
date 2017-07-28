import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

const dataTableDriverFactory = ({element, wrapper, component}) => {

  const getHeader = () => element.querySelector('[data-hook="header"]');
  const hasHeader = () => !!getHeader();
  const getHeaderColumn = index => getHeader().querySelectorAll('[data-hook="headerColumn"]')[index];
  const getRows = () => element.querySelectorAll('[data-hook="bodyRow"]');
  const getRowsCount = () => getRows().length;
  const getRow = rowIndex => getRows()[rowIndex];
  const clickOnHeaderColumn = index => ReactTestUtils.Simulate.click(getHeaderColumn(index));
  const getAllSortableColumns = () => getHeader().querySelectorAll('[data-hook="sortableColumn"]');

  return {
    getRowsCount,
    clickOnHeaderColumn,
    getAllSortableColumns,
    getRowsWithClassCount: className => Object.values(getRows()).filter(elem => elem.classList.contains(className)).length,
    getRowText: index => Object.values(getRows()[index].querySelectorAll('[data-hook="cell"]')).map(td => td.textContent),
    isRowClickable: index => getRows()[index].classList.contains('clickableDataRow'),
    getTitles: () => Object.values(getHeader().querySelectorAll('[data-hook="headerTitle"]')).map(th => th.textContent),
    isDisplayingNothing: () => !!element,
    isDisplayingHeaderOnly: () => hasHeader() && getRowsCount() === 0,
    hasChildWithId: id => !!element.querySelector(`#${id}`),
    clickRow: (index, eventData) => ReactTestUtils.Simulate.click(getRow(index), eventData),
    setProps: props => {
      const ClonedWithProps = React.cloneElement(component, Object.assign({}, component.props, props), ...(component.props.children || []));
      ReactDOM.render(<div ref={r => element = r}>{ClonedWithProps}</div>, wrapper);
    }
  };
};

export default dataTableDriverFactory;
