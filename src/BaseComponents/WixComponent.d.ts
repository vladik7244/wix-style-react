import * as React from 'react';

interface IWixComponentProps {
  dataHook?: string;
}

interface IWixComponentState {

}
declare class WixComponent<P extends IWixComponentProps, S extends IWixComponentState> extends React.Component <P, S> {
}