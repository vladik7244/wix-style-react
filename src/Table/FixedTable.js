
import React from 'react';
import css from './Table.scss';
import {TableContent} from './TableContent';
import WixComponent from '../BaseComponents/WixComponent';
import {TableHeader} from './TableHeader';
import {headerHeight} from './constants';
import ScrollbarSize from 'react-scrollbar-size';
import InfiniteScroll from 'react-infinite-scroller';
import PropTypes from 'prop-types';

export class FixedTable extends WixComponent {
  constructor(props) {
    super(props);
    this.state = {headerPaddingRight: null, scrollBarWidth: 0, scrollBarExists: false};
  }

  componentDidMount() {
    const headerPaddingRight = this.tableHeader && window.getComputedStyle(this.tableHeader)['padding-right'];
    const scrollBarExists = this.scrollable && this.scrollable.scrollHeight > this.scrollable.getBoundingClientRect().height;
    this.setState({headerPaddingRight, scrollBarExists});
  }

  componentDidUpdate() {
    this.setScrollBarExists();
  }

  setScrollBarExists = () => {
    if (this.scrollable) {
      const scrollBarExists = this.scrollable.scrollHeight > this.scrollable.getBoundingClientRect().height;
      if (scrollBarExists !== this.state.scrollBarExists) {
        this.setState({scrollBarExists});
      }
    }
  }

  setHeaderRef = node => this.tableHeader = node;

  scrollableRefHandler = ref => {
    this.scrollable = ref;
  }

  setScrollBarWidth = ({scrollbarWidth}) => {
    this.setState({scrollBarWidth: scrollbarWidth});
  }

  headerPaddingWithScrollWidth = () => {
    let currPadding = this.state.headerPaddingRight;
    currPadding = Number(currPadding.substr(0, currPadding.indexOf('px')));
    return currPadding + Number(this.state.scrollBarWidth);
  }

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
    let tableContent = <TableContent {...this.props}/>;
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

FixedTable.propTypes = {
  id: PropTypes.string,
  data: PropTypes.array.isRequired,
  columns: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    render: PropTypes.func.isRequired,
    width: PropTypes.string,
    sortable: PropTypes.bool,
    padding: PropTypes.number
  })).isRequired,
  showHeaderWhenEmpty: PropTypes.bool,
  rowDataHook: PropTypes.string,
  rowClass: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  dynamicRowClass: PropTypes.func,
  onRowClick: PropTypes.func,
  height: PropTypes.number,
  width: PropTypes.string,
  infiniteScroll: PropTypes.bool,
  hasMore: PropTypes.bool,
  loadMore: PropTypes.func,
  loader: PropTypes.node,
  onSort: PropTypes.func,
  sortDirection: PropTypes.oneOf(['ascent', 'descent']),
  columnToSortBy: PropTypes.string,
  isPage: PropTypes.bool,
  fixedHeading: PropTypes.node,
  hideHeader: PropTypes.bool
};

FixedTable.defaultProps = {
  infiniteScroll: false,
  loader: <div className={css.loader}>Loading ...</div>,
  columnToSortBy: '',
  isPage: false,
  fixedHeading: null,
  hideHeader: false,
  height: '100%',
  width: '100%'
};
