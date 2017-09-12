const STYLABLE_DIVIDER_LENGTH = 2;

const getNamespace = component => {
  return component.getAttribute('class').then(classes => {
    const rootMatch = classes.match(/(ToggleSwitch.*)root/);
    if (!rootMatch) {
      throw new Error('Invalid root class: ' + classes);
    }
    const rootGroupMatch = rootMatch[1];
    return rootGroupMatch.slice(0, rootGroupMatch.length - STYLABLE_DIVIDER_LENGTH);
  });
};

const hasCssState = (component, stateName, expected = true) =>
  getNamespace(component)
      .then(namespace => component.getAttribute(`data-${namespace.toLowerCase()}-${stateName.toLowerCase()}`))
      .then(value => {
        const valueExpr = value === 'true';
        if (expected !== valueExpr) {
          throw new Error(`style-state ${stateName} expected: ${expected} but got ${valueExpr}`);
        }
        return true;
      });

const toggleSwitchDriverFactory = component => ({
  click: () => component.click(),
  element: () => component,
  checked: () => component.$('input').isSelected(),
  isXSmall: () => hasCssState(component, 'toggleSwitchXSmall'),
  isSmall: () => hasCssState(component, 'toggleSwitchSmall'),
  isLarge: () => hasCssState(component, 'toggleSwitchSmall', false).then(() => hasCssState(component, 'toggleSwitchXSmall', false))
});

export default toggleSwitchDriverFactory;
