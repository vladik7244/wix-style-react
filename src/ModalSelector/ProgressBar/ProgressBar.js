import React from 'react';
import PropTypes from 'prop-types';
import WixComponent from '../../BaseComponents/WixComponent';

class ProgressBar extends WixComponent {
  static propTypes = {
    progress: PropTypes.number.isRequired,
  };

  render() {
    return (
      <div className="progress-bar">
        <Text appearance="T4.3">{`${this.props.number}%`}</Text>
        <span className="bar">
          <span className="bar-value" style={{width: this.props.progress + '%'}}/>
          <span className="bar-leftover" style={{width: (100 - this.props.progress) + '%'}}/>
        </span>
      </div>
    );
  }
}

export default ProgressBar;
