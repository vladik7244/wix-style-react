import * as React from 'react';
import typography, {convertFromUxLangToCss} from '../Typography';
import WixComponent, {IWixComponentProps} from '../BaseComponents/WixComponent';
export interface ILabelProps extends IWixComponentProps {
  for?: string;
  appearance?: TypographyAppearances;
  children?: any;
  id?: string;
}

/**
  * a regular html `<label>` element but in wix style
  */
class Label extends WixComponent<ILabelProps, {}> {
  public static defaultProps: Partial<ILabelProps> = {
        appearance: "T1"
  };
  
  render() {
    const {appearance, id, children, for: forAttr} = this.props;
    const className = typography[convertFromUxLangToCss(appearance)];
    return (
      <label className={className} id={id} htmlFor={forAttr}>
        {children}
      </label>
    );
  }
}

type TypographyAppearances = 'T1' | 'T1.1' | 'T1.2' | 'T1.3' | 'T1.4' |
    'T2' | 'T2.1' | 'T2.2' | 'T2.3' |
    'T3' | 'T3.1' | 'T3.2' | 'T3.3' | 'T3.4' |
    'T4' | 'T4.1' | 'T4.2' | 'T4.3' |
    'T5' | 'T5.1';

export default Label
