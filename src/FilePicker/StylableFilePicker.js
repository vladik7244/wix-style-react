import React from 'react';
import PropTypes from 'prop-types';
import WixComponent from '../BaseComponents/WixComponent';
import Add from '../Icons/dist/components/Add';
import uniqueId from 'lodash/uniqueId';

import {stylable} from 'wix-react-tools';
import styles from './FilePicker.st.css';

@stylable(styles)
export default class FilePicker extends WixComponent {
  static defaultProps = {
    mainLabel: 'Choose File',
    subLabel: 'No file chosen (Max size 5 MB)',
    onChange: () => {},
    supportedFormats: '*',
    errorMessage: '',
    maxSize: 5000000  //5MB
  };

  static propTypes = {
    header: PropTypes.string,
    onChange: PropTypes.func,
    mainLabel: PropTypes.string,
    subLabel: PropTypes.string,
    supportedFormats: PropTypes.string,
    maxSize: PropTypes.number,
    error: PropTypes.bool,
    errorMessage: PropTypes.string,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedFileName: props.subLabel
    };
    this.id = props.id || uniqueId('file_picker_input_');
  }

  onChooseFile(file) {
    const {maxSize, onChange} = this.props;

    if (file) {
      onChange(file);
      if (file.size <= maxSize) {
        this.setState({selectedFileName: file.name});
      }
    }
  }

  render() {
    const {header, mainLabel, supportedFormats, error, errorMessage} = this.props;

    return (
      <div>
        {header && (<span className="header">{header}</span>)}
        <label className="label" htmlFor={this.id}>
          <div className="icon"><Add width="42" height="42"/></div>
          <div className="content">
            <span className="cta" data-hook="main-label">{mainLabel}</span>
            <span className="info" data-hook="sub-label">{this.state.selectedFileName}</span>
            {error && <span className="error" data-hook="filePicker-error">{errorMessage}</span>}
          </div>
        </label>
        <input id={this.id} className="input" type="file" accept={supportedFormats} onChange={e => this.onChooseFile(e.target.files[0])}/>
      </div>
    );
  }
}
