
import React from 'react';
import css from './DataTable.scss';
import PropTypes from 'prop-types';
import WixComponent from '../BaseComponents/WixComponent';
import InfiniteScroll from 'react-infinite-scroller';
import ScrollbarSize from 'react-scrollbar-size';
import {TableContent} from './TableContent';
import {TableHeader} from './TableHeader';

export class FullPage extends WixComponent {
  constructor(props) {
    super(props);
    window.addEventListener('resize', this.onWindowResize);
    this.state = {topHeight: 0, tableWidth: 0, headerPaddingRight: null, scrollBarWidth: 0, scrollBarExists: false};
  }

  setScrollBarWidth = ({scrollbarWidth}) => {
    this.setState({scrollBarWidth: scrollbarWidth});
  }

  onWindowResize = () => {
    const width = this.table && this.table.getBoundingClientRect().width;
    this.setState({tableWidth: width});
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize);
  }

  componentDidMount() {
    const topHeight = this.topSection && this.topSection.getBoundingClientRect().height;
    const tableWidth = this.table && this.table.getBoundingClientRect().width;
    const scrollBarExists = this.scrollContainer && this.scrollContainer.scrollHeight > this.scrollContainer.getBoundingClientRect().height;
    this.setState({topHeight, tableWidth, scrollBarExists});
  }
  wrapWithContainer = (node, style) => (<div style={style} className={css.container}>{node}</div>);

  wrapWithInfiniteScroll = content => {
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

  render() {
    const style = {
      position: 'absolute',
      top: 0,
      left: 0,
      width: this.state.tableWidth,
      right: this.state.scrollBarExists ? this.state.scrollBarWidth : 0,
      zIndex: 9999,
    };
    const topSection = this.wrapWithContainer(
      <div data-hook="top-section" ref={node => this.topSection = node}>
        {this.props.pageHeading}
        {this.props.hideHeader ? null :
        <TableHeader
          {...this.props}
          ref={node => this.tableHeader = node}
          />}
      </div>, style
    );

    let table = this.wrapWithContainer(
      <div>
        <div ref={node => this.table = node} className={css.dataTable}>
          <div style={{paddingTop: this.state.topHeight}}>
            <TableContent {...this.props}/>
          </div>
        </div>
      </div>
    );

    if (this.props.infiniteScroll) {
      table = this.wrapWithInfiniteScroll(table);
    }

    return (
      <div id={this.props.id} data-hook="page-container" className={css.pageContainer}>
        {topSection}
        <div data-hook="page-scroller" ref={node => this.scrollContainer = node} className={css.scrollContainer}>
          {table}
        </div>
        <ScrollbarSize onLoad={this.setScrollBarWidth} onChange={this.setScrollBarWidth}/>
      </div>);
  }
}
