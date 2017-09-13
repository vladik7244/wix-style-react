import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import values from 'lodash/values';

const dataTableDriverFactory = ({element, wrapper, component}) => {

  const getHeader = () => element.querySelector('thead');
  const hasHeader = () => !!getHeader();

  const getRows = () => element.querySelectorAll('tbody tr[data-hook="dataTableRow"]');
  const getRowsCount = () => getRows().length;
  const getRow = rowIndex => getRows()[rowIndex];
  const getRowDetails = index => element.querySelector(`tbody tr td[data-hook="${index}_details"]`);
  const getHeaderTitleByIndex = index => getHeader().querySelectorAll('th')[index];
  return {
    getRowsCount,
    getRowsWithClassCount: className => values(getRows()).filter(elem => elem.classList.contains(className)).length,
    getRowText: index => values(getRows()[index].querySelectorAll('td')).map(td => td.textContent),
    getRowClasses: index => values(getRows()[index].classList),
    isRowClickable: index => getRows()[index].classList.contains('clickableDataRow'),
    getTitles: () => values(getHeader().querySelectorAll('th')).map(th => th.textContent),
    isDisplayingNothing: () => !!element,
    isDisplayingHeaderOnly: () => hasHeader() && getRowsCount() === 0,
    isDisplayingHeader: () => hasHeader(),
    hasChildWithId: id => !!element.querySelector(`#${id}`),
    clickRow: (index, eventData) => ReactTestUtils.Simulate.click(getRow(index), eventData),
    mouseEnterRow: (index, eventData) => ReactTestUtils.Simulate.mouseEnter(getRow(index), eventData),
    mouseLeaveRow: (index, eventData) => ReactTestUtils.Simulate.mouseLeave(getRow(index), eventData),
    setProps: props => {
      const ClonedWithProps = React.cloneElement(component, Object.assign({}, component.props, props), ...(component.props.children || []));
      ReactDOM.render(<div ref={r => element = r}>{ClonedWithProps}</div>, wrapper);
    },
    hasRowDetails: index => !!getRowDetails(index),
    getRowDetailsText: index => getRowDetails(index).textContent,
    hasSortableTitle: index => !!element.querySelector(`th [data-hook="${index}_title"]`),
    clickSort: (index, eventData) => ReactTestUtils.Simulate.click(getHeaderTitleByIndex(index), eventData),
    getRowDetails: index => getRowDetails(index)
  };
};

export default dataTableDriverFactory;
