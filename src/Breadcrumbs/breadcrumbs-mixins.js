const Breadcrumbs = optionsArr => {
  const options = {
    height: optionsArr[0],
    sidePadding: optionsArr[1]
  };

  const itemKey = '.item';

  return {
    [itemKey]: {
      display: 'inline-block',
      height: options.height,
      'line-height': options.height,
      padding: `0 ${options.sidePadding}`
    }
  };
};

const BreadcrumbsHover = optionsArr => {
  const options = {
    hoverTextColor: optionsArr[0],
    hoverBackgroundColor: optionsArr[1]
  };

  const itemKey = '.item:not(.active):not(.disabled):hover';

  return {
    [itemKey]: {
      'border-radius': '100px',
      color: options.hoverTextColor,
      'background-color': options.hoverBackgroundColor
    }
  };
};

module.exports = {};
module.exports.Breadcrumbs = Breadcrumbs;
module.exports.BreadcrumbsHover = BreadcrumbsHover;
