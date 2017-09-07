import React from 'react';
import PropTypes from 'prop-types';
import WixComponent from '../BaseComponents/WixComponent';
import Modal from '../Modal/Modal';
import Search from './Search';
import FooterStatus from './FooterStatus';
import MessageBoxFixedHeaderFooter from '../MessageBox/MessageBoxFixedHeaderFooter';
import InfiniteScroll from '../DataTable/InfiniteScroll';

class ModalSelector extends WixComponent {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onOk: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    loadMore: PropTypes.func.isRequired,
    hasMore: PropTypes.bool,
    isSearchEnabled: PropTypes.bool,
    onSearch: PropTypes.func,
    delayTime: PropTypes.number,
    minimumChars: PropTypes.number,
    modalHeight: PropTypes.string,
    onCheckBoxFooterClick: PropTypes.func,
    footerText: PropTypes.string,
    footerChecked: PropTypes.bool
  }

  static defaultProps = {
    isOpen: false,
    onOk: () => {},
    onClose: () => {},
    onCancel: () => {},
    loadMore: () => {},
    hasMore: false,
    isSearchEnabled: true,
    delayTime: 0,
    minimumChars: 1,
    onSearch: () => {},
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
      isSearchEnabled,
      delayTime,
      minimumChars,
      onSearch,
      onCheckBoxFooterClick,
      footerText,
      footerChecked
    } = this.props;

    const search = isSearchEnabled ? (
      <Search
        onChange={onSearch}
        minimumChars={minimumChars}
        delayTime={delayTime}
        />
    ) : null;

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
          theme="blue"
          paddingStyle="wide"
          title="Choose Your Items"
          confirmText="OK"
          cancelText="Cancel"
          onOk={onOk}
          onCancel={onCancel}
          onClose={onClose}
          prefixContent={search}
          footerStatus={<FooterStatus checked={footerChecked} text={footerText} onCheckBoxClick={onCheckBoxFooterClick}/>}
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

ModalSelector.Search = Search;

export default ModalSelector;
