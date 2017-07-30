import React from 'react';
import Checkbox from 'wix-style-react/Checkbox';
import {StylableCheckbox} from 'wix-style-react/Checkbox';

const style = {
  display: 'inline-block',
  padding: '0 5px',
  width: '150px',
  lineHeight: '22px'
};

export default () =>
  <div>
    <div className="ltr" style={style}>Standard<br/><Checkbox>Some text</Checkbox></div>
    <div className="ltr" style={style}>Checked<br/><Checkbox checked>Some text</Checkbox></div>
    <div className="ltr" style={style}>Disabled<br/><Checkbox disabled>Some text</Checkbox></div>
    <div className="ltr" style={style}>Disabled and checked<br/><Checkbox disabled checked>Some text</Checkbox></div>

    <div></div>

    <div className="ltr" style={style}>Standard<br/><StylableCheckbox>Some text</StylableCheckbox></div>
    <div className="ltr" style={style}>Checked<br/><StylableCheckbox checked>Some text</StylableCheckbox></div>
    <div className="ltr" style={style}>Disabled<br/><StylableCheckbox disabled>Some text</StylableCheckbox></div>
    <div className="ltr" style={style}>Disabled and checked<br/><StylableCheckbox disabled checked>Some text</StylableCheckbox></div>
  </div>;
