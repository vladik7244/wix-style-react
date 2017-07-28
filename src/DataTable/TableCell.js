import React from 'react';
import css from './DataTable.scss';
import PropTypes from 'prop-types';

export const TableCell = props => {
  return (
    <div style={{padding: props.padding}}>
      { props.children }
    </div>);
};

TableCell.propTypes = {
  padding: PropTypes.number
};

TableCell.defaultProps = {
  padding: 15
};
