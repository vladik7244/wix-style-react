import React from 'react';
import PropTypes from 'prop-types';
import WixComponent from '../BaseComponents/WixComponent';
import Modal from '../Modal/Modal';
import FooterStatus from './FooterStatus';
import Footer from './Footer';
import Header from './Header';
import MessageBoxFixedHeaderFooter from '../MessageBox/MessageBoxFixedHeaderFooter';
import InfiniteScroll from '../DataTable/InfiniteScroll';
import Search from './Search';

class ModalSelector extends WixComponent {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onOk: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    loadMore: PropTypes.func.isRequired,
    hasMore: PropTypes.bool,
    isSearchEnabled: PropTypes.bool,
    modalHeight: PropTypes.string,
    onCheckBoxFooterClick: PropTypes.func,
    footerText: PropTypes.string,
    footerChecked: PropTypes.bool,
    prefixContent: PropTypes.node,
  }

  static defaultProps = {
    isOpen: false,
    onOk: () => {},
    onClose: () => {},
    onCancel: () => {},
    loadMore: () => {},
    hasMore: false,
  }

  render() {
    const {
      isOpen,
      modalHeight,
      onOk,
      onClose,
      onCancel,
      children,
      loadMore,
      hasMore,
      footerStatus,
      prefixContent
    } = this.props;

    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        contentLabel="Items Selection Modal"
        scrollableContent={false}
        scrollable={false}
        height={modalHeight}
        >
        <MessageBoxFixedHeaderFooter
          prefixContent={prefixContent}
          footer={<Footer onOk={onOk} onCancel={onCancel}>{footerStatus}</Footer>}
          header={<Header title="Choose Your Items" onCancel={onCancel} onClose={onClose}/>}
          >
          <InfiniteScroll
            loadMore={loadMore}
            hasMore={hasMore}
            >
            {children}
          </InfiniteScroll>
        </MessageBoxFixedHeaderFooter>
      </Modal>
    );
  }
}

ModalSelector.FooterStatus = FooterStatus;
ModalSelector.Search = Search;

export default ModalSelector;
