import React from 'react';
import PropTypes from 'prop-types';
import WixComponent from '../BaseComponents/WixComponent';
import Checkbox from '../Checkbox/Checkbox';
import Image from './Image';
import Text from '../Text';
import styles from './Selector.scss';

const checkBoxStyle = {
  display: 'inline-block',
}

const imageStyle = {
  marginLeft: '2px',
  marginRight: '10px',
  display: 'flex'
}

class Selector extends WixComponent {
  static propTypes = {
    onToggle: PropTypes.func,
    isSelected: PropTypes.bool,
    title: PropTypes.string.isRequired,
    image: PropTypes.string,
    subTitle: PropTypes.string,
    extraText: PropTypes.string,
  };

  static defaultProps = {
  };

  state = {
    checked: false
  }

  toggle = () => {
    const newCheckedState = !this.state.checked;
    this.setState({checked: newCheckedState});
    this.props.onToggle && this.props.onToggle(newCheckedState);
  }

  render() {
    const {
      imageSize,
      imageSrc,
      title,
      subTitle,
      extra
    } = this.props;
    return (
      <div className={styles.selector}
           onClick={this.toggle}>
        <Checkbox style={checkBoxStyle} checked={this.state.checked}/>
        {imageSrc ? <div style={imageStyle}><Image imageSrc={imageSrc} imageSize={imageSize}/></div> : ''}
        <span>
          <div><Text appearance="T1">{title}</Text></div>
          {subTitle ? <div><Text appearance="T3">{subTitle}</Text></div> : ''}
        </span>
        {extra || ''}
      </div>
    );
  }
}

export default Selector;
