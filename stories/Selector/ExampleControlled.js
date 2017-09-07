import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ModalSelector from '../../src/ModalSelector';
import Selector from '../../src/Selector';
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
      footerChecked: false
    };
  }

  generateSetState = state => () => this.setState(state);

  close = this.generateSetState({isOpen: false});
  open = this.generateSetState({isOpen: true});

  selectorToggle = id => {
    const newToggleState = !optionsList[id].selected;
    optionsList[id].selected = newToggleState;

    this.setFooterText();
  };

  setFooterText = () => {
    const numOfSelected = optionsList.filter(x => x.selected).length;
    this.setState({
      footerText:
        numOfSelected ?
          `Deselect (${numOfSelected})` :
          `Select All(${optionsList.length})`,
      footerChecked: !!numOfSelected
    });
  }

  toggleFooterStatus = () => {
    const numOfSelected = optionsList.filter(x => x.selected).length;
    if (numOfSelected) {
      optionsList.forEach(x => x.selected = false);
    } else {
      optionsList.forEach(x => x.selected = true);
    }

    this.setFooterText();
  };

  componentWillMount() {
    this.setFooterText();
  }

  render() {
    return (
      <div>
        <Button onClick={this.open} >Open Modal Selector</Button>
        <ModalSelector
          isOpen={this.state.isOpen}
          onOk={this.close}
          onCancel={this.close}
          onClose={this.close}
          modalHeight="540px"
          prefixContent={
            <ModalSelector.Search
              onChange={() => {}}
              minimumChars={2}
              delayTime={1000}
              />
          }
          footerStatus={<ModalSelector.FooterStatus checked={this.state.footerChecked} text={this.state.footerText} onCheckBoxClick={this.toggleFooterStatus}/>}
          >
          {optionsList.map((x, i) => <Selector
            title="TITLE TEXT"
            id={i}
            key={i}
            subTitle="SUBTITLE TEXT"
            imageSrc="http://media.istockphoto.com/photos/orange-picture-id185284489?k=6&m=185284489&s=612x612&w=0&h=x_w4oMnanMTQ5KtSNjSNDdiVaSrlxM4om-3PQTIzFaY="
            imageSize="Cinema View"
            onToggle={this.selectorToggle}
            isSelected={x.selected}
            >
            {/* <Selector.ExtraText text="Extra Text"/> */}
            {/* <Selector.ExtraIcon name="add"/> */}
            <Selector.ProgressBar progress={83}/>
          </Selector>)}
        </ModalSelector>
      </div>
    );
  }
}

export default () =>
  <div>
    <ControlledModalSelector/>
  </div>;
