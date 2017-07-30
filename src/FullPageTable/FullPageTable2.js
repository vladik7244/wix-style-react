
import React from 'react';
import WixComponent from '../BaseComponents/WixComponent';
import PropTypes from 'prop-types';
import Table from './Table';
import {FullPageTable} from './FullPageTable';

export class FullPageTable2 extends WixComponent {
  render() {
    const props = React.Children.only(this.props.children).props;
    return (<FullPage pageHeading={this.props.pageHeading} {...props}/>);
  }
}

FullPageTable.propTypes = {
  pageHeading: PropTypes.node,
  children: props => {
    const err = new Error('FullPageTable only accepts a single child of type Table');
    const count = React.Children.count(props.children);
    if (count !== 1) {
      return err;
    }
    const childType = React.Children.only(props.children).type;
    const isNotTable = childType !== Table && !(childType.prototype instanceof Table);
    if (isNotTable) {
      return err;
    }
  }
};

FullPageTable.defaultProps = {
  pageHeading: null
};
