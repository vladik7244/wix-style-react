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
          onOk={close}
          onCancel={close}
          onClose={close}
          >
            <Selector
            title="TITLE TEXT"
            subTitle="SUBTITLE TEXT"
            imageSrc="http://media.istockphoto.com/photos/orange-picture-id185284489?k=6&m=185284489&s=612x612&w=0&h=x_w4oMnanMTQ5KtSNjSNDdiVaSrlxM4om-3PQTIzFaY="
            imageSize="Cinema View"
            onToggle={(state) => {console.log(`toggle state is ${state}`)}}
            />
            <Selector
            title="TITLE TEXT"
            subTitle="SUBTITLE TEXT"
            imageSrc="http://media.istockphoto.com/photos/orange-picture-id185284489?k=6&m=185284489&s=612x612&w=0&h=x_w4oMnanMTQ5KtSNjSNDdiVaSrlxM4om-3PQTIzFaY="
            imageSize="Cinema View"
            onToggle={(state) => {console.log(`toggle state is ${state}`)}}
            />
            <Selector
            title="TITLE TEXT"
            subTitle="SUBTITLE TEXT"
            imageSrc="http://media.istockphoto.com/photos/orange-picture-id185284489?k=6&m=185284489&s=612x612&w=0&h=x_w4oMnanMTQ5KtSNjSNDdiVaSrlxM4om-3PQTIzFaY="
            imageSize="Cinema View"
            onToggle={(state) => {console.log(`toggle state is ${state}`)}}
            />
            <Selector
            title="TITLE TEXT"
            subTitle="SUBTITLE TEXT"
            imageSrc="http://media.istockphoto.com/photos/orange-picture-id185284489?k=6&m=185284489&s=612x612&w=0&h=x_w4oMnanMTQ5KtSNjSNDdiVaSrlxM4om-3PQTIzFaY="
            imageSize="Cinema View"
            onToggle={(state) => {console.log(`toggle state is ${state}`)}}
            />
            <Selector
            title="TITLE TEXT"
            subTitle="SUBTITLE TEXT"
            imageSrc="http://media.istockphoto.com/photos/orange-picture-id185284489?k=6&m=185284489&s=612x612&w=0&h=x_w4oMnanMTQ5KtSNjSNDdiVaSrlxM4om-3PQTIzFaY="
            imageSize="Cinema View"
            onToggle={(state) => {console.log(`toggle state is ${state}`)}}
            />
            <Selector
            title="TITLE TEXT"
            subTitle="SUBTITLE TEXT"
            imageSrc="http://media.istockphoto.com/photos/orange-picture-id185284489?k=6&m=185284489&s=612x612&w=0&h=x_w4oMnanMTQ5KtSNjSNDdiVaSrlxM4om-3PQTIzFaY="
            imageSize="Cinema View"
            onToggle={(state) => {console.log(`toggle state is ${state}`)}}
            />
            <Selector
            title="TITLE TEXT"
            subTitle="SUBTITLE TEXT"
            imageSrc="http://media.istockphoto.com/photos/orange-picture-id185284489?k=6&m=185284489&s=612x612&w=0&h=x_w4oMnanMTQ5KtSNjSNDdiVaSrlxM4om-3PQTIzFaY="
            imageSize="Cinema View"
            onToggle={(state) => {console.log(`toggle state is ${state}`)}}
            />
            <Selector
            title="TITLE TEXT"
            subTitle="SUBTITLE TEXT"
            imageSrc="http://media.istockphoto.com/photos/orange-picture-id185284489?k=6&m=185284489&s=612x612&w=0&h=x_w4oMnanMTQ5KtSNjSNDdiVaSrlxM4om-3PQTIzFaY="
            imageSize="Cinema View"
            onToggle={(state) => {console.log(`toggle state is ${state}`)}}
            />
            <Selector
            title="TITLE TEXT"
            subTitle="SUBTITLE TEXT"
            imageSrc="http://media.istockphoto.com/photos/orange-picture-id185284489?k=6&m=185284489&s=612x612&w=0&h=x_w4oMnanMTQ5KtSNjSNDdiVaSrlxM4om-3PQTIzFaY="
            imageSize="Cinema View"
            onToggle={(state) => {console.log(`toggle state is ${state}`)}}
            />
        </ModalSelector>
      </div>
    );
  }
}

export default () =>
  <div>
    <ControlledModalSelector/>
  </div>;
