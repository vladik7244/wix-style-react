import React from 'react';
import PropTypes from 'prop-types';
import WixComponent from '../BaseComponents/WixComponent';
import Modal from '../Modal/Modal';
import Search from './Search';
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
      onOk,
      onClose,
      onCancel,
      children,
      loadMore,
      hasMore,
    } = this.props;

    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        contentLabel="Items Selection Modal"
        scrollableContent={false}
        scrollable={false}
        height="540px"
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
