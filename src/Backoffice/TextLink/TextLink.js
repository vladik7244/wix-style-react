import PropTypes from 'prop-types';
import React from 'react';
import WixComponent from '../../BaseComponents/WixComponent';
import BaseTextLink from '../../BaseComponents/TextLink';

export default class TextLink extends WixComponent {

  static propTypes = Object.assign({},
  BaseTextLink.propTypes,
    {
      link: PropTypes.string.isRequired,
      disabled: PropTypes.bool,
      download: PropTypes.bool,
      rel: PropTypes.string,
      target: PropTypes.oneOf(['_blank', '_parent', '_self', '_top', 'framename']),
      ariaLabel: PropTypes.string
    }
  );

  static defaultProps = Object.assign({},
  BaseTextLink.defaultProps, {
    disabled: false,
    download: false,
    rel: null,
    target: null
  });

  render() {

    return (
      <BaseTextLink {...this.props}/>
    );
  }
}
