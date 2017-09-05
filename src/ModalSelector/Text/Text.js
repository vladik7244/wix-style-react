import React from 'react';
import PropTypes from 'prop-types';
import WixComponent from '../../BaseComponents/WixComponent';

class Text extends WixComponent {
  static propTypes = {
    text: PropTypes.string.isRequired,
  };

  render() {
    return (
      <Text appearance="T1.1">{this.props.text}</Text>
    );
  }
}

export default Text;
