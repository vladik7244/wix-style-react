import * as React from 'react';
import * as ReactDOM from 'react-dom';

const MOUSE_EVENTS_SUPPORTED = ['click'];

export interface IWixComponentProps {
  dataHook?: string;
  styles?: string
}

export interface IWixComponentState {

}

class WixComponent<P extends IWixComponentProps, S extends IWixComponentState> extends React.Component <P, S> {
  private _boundEvents: string[];
  protected onClickOutside: Function;

  constructor(params: P) {
    super(params);
    this._addDataHook = this._addDataHook.bind(this);
    this._supportOnClickOutside = this._supportOnClickOutside.bind(this);
    this._onMouseEventsHandler = this._onMouseEventsHandler.bind(this);
  }

  checkIfEventOnElements(e: Event, elem: Element[]) {
    let current = e.target as any;
    while (current.parentNode) {
      if (elem.indexOf(current) > -1) {
        return true;
      }
      current = current.parentNode;
    }

    return current !== document;
  }

  componentElements(): Element[] {
    return [ReactDOM.findDOMNode(this)];
  }

  setStyles(styles, typography = {}) {
    if (this.props.styles) {
      this.styles = this.props.styles;
    } else {
      this.styles = styles;
    }
    this.typography = this.props.styles || typography;
  }

  _onMouseEventsHandler(e: Event) {
    if (!this.checkIfEventOnElements(e, this.componentElements())) {
      this.onClickOutside(e);
    }
  }

  _addDataHook(dataHook: string) {
    const domNode = ReactDOM.findDOMNode(this);
    if (domNode) {
      domNode.setAttribute('data-hook', dataHook);
    }
  }

  _supportOnClickOutside() {
    MOUSE_EVENTS_SUPPORTED.forEach(eventName => {
      document.addEventListener(eventName, this._onMouseEventsHandler, true);
    });

    this._boundEvents = MOUSE_EVENTS_SUPPORTED;
  }

  componentDidMount() {
    const {dataHook} = this.props;
    if (dataHook) {
      this._addDataHook(dataHook);
    }

    if (typeof this.onClickOutside === 'function') {
      this._supportOnClickOutside();
    }
  }

  componentWillUnmount() {
    if (this._boundEvents) {
      this._boundEvents.forEach(eventName => {
        document.removeEventListener(eventName, this._onMouseEventsHandler, true);
      });
    }
  }
}

export default WixComponent;
