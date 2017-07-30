
import React from 'react';
import css from './Table.scss';
import {TableContent} from './TableContent';
import WixComponent from '../BaseComponents/WixComponent';
import {TableHeader} from './TableHeader';
import {headerHeight} from './constants';
import ScrollbarSize from 'react-scrollbar-size';
import InfiniteScroll from 'react-infinite-scroller';

export class Table extends WixComponent {
  constructor(props) {
    super(props);
    this.state = {headerPaddingRight: null, scrollBarWidth: 0, scrollBarExists: false};
  }

  componentDidMount() {
    const headerPaddingRight = this.tableHeader && window.getComputedStyle(this.tableHeader)['padding-right'];
    const scrollBarExists = this.scrollable && this.scrollable.scrollHeight > this.scrollable.getBoundingClientRect().height;
    this.setState({headerPaddingRight, scrollBarExists});
  }

  setScrollBarExists = () => {
    if (this.scrollable) {
      const scrollBarExists = this.scrollable.scrollHeight > this.scrollable.getBoundingClientRect().height;
      if (scrollBarExists !== this.state.scrollBarExists) {
        this.setState({scrollBarExists});
      }
    }
  }

  scrollableRefHandler = ref => {
    this.scrollContainer = ref;
  }

  setScrollBarWidth = ({scrollbarWidth}) => {
    this.setState({scrollBarWidth: scrollbarWidth});
  }

  headerPaddingWithScrollWidth = () => {
    let currPadding = this.state.headerPaddingRight;
    currPadding = Number(currPadding.substr(0, currPadding.indexOf('px')));
    return currPadding + Number(this.state.scrollBarWidth);
  }

  setHeaderRef = node => this.tableHeader = node;

  render() {
    const wrapWithInfiniteScroll = content => {
      return (
        <InfiniteScroll
          pageStart={0}
          loadMore={this.props.loadMore}
          hasMore={this.props.hasMore}
          loader={this.props.loader}
          useWindow={false}
          >
          {content}
        </InfiniteScroll>
      );
    };

    const headerPaddingRight = this.state.headerPaddingRight && this.state.scrollBarExists ? this.headerPaddingWithScrollWidth() : null;
    let tableContent = <TableContent onContentUpdated={this.setScrollBarExists} {...this.props}/>;
    if (this.props.infiniteScroll) {
      tableContent = wrapWithInfiniteScroll(tableContent);
    }
    return (<div id={this.props.id} className={css.dataTable} style={{width: this.props.width}}>
      {this.props.hideHeader ? null : <TableHeader headerPaddingRight={headerPaddingRight} {...this.props} refHeader={this.setHeaderRef}/>}
      <div className={css.scrollable} ref={this.scrollableRefHandler} style={{height: this.props.height - headerHeight}}>
        {tableContent}
      </div>
      <ScrollbarSize onLoad={this.setScrollBarWidth} onChange={this.setScrollBarWidth}/>
    </div>);
  }
}
