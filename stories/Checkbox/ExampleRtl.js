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
    <div className="rtl" style={style}>Standard<br/><Checkbox rtl>טקסט בעברית</Checkbox></div>
    <div className="rtl" style={style}>Checked<br/><Checkbox rtl checked>טקסט בעברית</Checkbox></div>
    <div className="rtl" style={style}>Disabled<br/><Checkbox rtl disabled>טקסט בעברית</Checkbox></div>
    <div className="rtl" style={style}>Disabled and checked<br/><Checkbox rtl disabled checked>טקסט בעברית</Checkbox></div>
  </div>;
