import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ModalSelector from '../../src/ModalSelector';
import Selector from '../../src/Selector';
import Checkbox from '../../src/Checkbox';
import {Button} from 'wix-style-react/Backoffice';

const optionsList = [
  {
    selected: false
  },
  {
    selected: false
  },
  {
    selected: false
  },
  {
    selected: false
  },
];

class ControlledModalSelector extends Component {
  static propTypes = {
    isOpen: PropTypes.bool
  };

  constructor({isOpen = false}) {
    super();
    this.state = {
      isOpen,
      numOfSelected: 0
    };
  }

  render() {
    const setState = state => () => this.setState(state);

    const close = setState({isOpen: false});
    const open = setState({isOpen: true});
    const listToggle = id => {
      const newToggleState = !optionsList[id].selected;
      optionsList[id].selected = newToggleState;
      if (newToggleState) {
        this.setState({numOfSelected: this.state.numOfSelected + 1});
      } else {
        this.setState({numOfSelected: this.state.numOfSelected - 1});
      }
    };

    const toggleFooterStatus = () => {
      if (this.state.numOfSelected) {
        optionsList.forEach(x => x.selected = false);
        this.setState({numOfSelected: 0});
      } else {
        optionsList.forEach(x => x.selected = true);
        this.setState({numOfSelected: 4});
      }
    };

    return (
      <div>
        <Button onClick={open} >Open Modal Selector</Button>
        <ModalSelector
          isOpen={this.state.isOpen}
          onOk={close}
          onCancel={close}
          onClose={close}
          modalHeight="540px"
          footerStatus={<div style={{paddingLeft: '32px'}}>
            <Checkbox checked={!!this.state.numOfSelected} indeterminate onChange={toggleFooterStatus}/> {this.state.numOfSelected ? `Deselect (${this.state.numOfSelected})` : `Select All (${4})`}
          </div>}
          >
          {optionsList.map((x, i) => <Selector
            title="TITLE TEXT"
            id={i}
            key={i}
            subTitle="SUBTITLE TEXT"
            imageSrc="http://media.istockphoto.com/photos/orange-picture-id185284489?k=6&m=185284489&s=612x612&w=0&h=x_w4oMnanMTQ5KtSNjSNDdiVaSrlxM4om-3PQTIzFaY="
            imageSize="Cinema View"
            onToggle={listToggle}
            isSelected={x.selected}
            />)}
        </ModalSelector>
      </div>
    );
  }
}

export default () =>
  <div>
    <ControlledModalSelector/>
  </div>;
