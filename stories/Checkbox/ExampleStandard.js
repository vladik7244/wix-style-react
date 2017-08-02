import React from 'react';
import Checkbox from 'wix-style-react/Checkbox';

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
  </div>;
