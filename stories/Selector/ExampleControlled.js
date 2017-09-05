import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ModalSelector from 'wix-style-react/ModalSelector';
import Selector from 'wix-style-react/Selector';
import {Button} from 'wix-style-react/Backoffice';

class ControlledModalSelector extends Component {
  static propTypes = {
    isOpen: PropTypes.bool
  };

  constructor({isOpen = false}) {
    super();
    this.state = {isOpen};
  }

  render() {
    const setState = state => () => this.setState(state);

    const close = setState({isOpen: false});
    const open = setState({isOpen: true});

    return (
      <div>
        <Button onClick={open} >Open Modal Selector</Button>
        <ModalSelector
          isOpen={this.state.isOpen}
          onRequestClose={close}
          onOk={close}
          onCancel={close}
          >
          <Selector title="TITLE"/>
        </ModalSelector>
      </div>
    );
  }
}

export default () =>
  <div>
    <ControlledModalSelector/>
  </div>;
