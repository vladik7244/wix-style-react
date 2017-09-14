const hasClass = (element, cls) => {
  const normalized = cls.toLowerCase().replace('.', '_');
  return element.getAttribute('class').then(classes => classes.split(' ').some(c => c.match(new RegExp(`^Badge.*${normalized}$`))));
};

export default component => ({
  element: () => component,
  isBadge: () => hasClass(component, 'badge'),
  isOfType: type => hasClass(component, type),
  isOfAppearance: appearance => hasClass(component, appearance),
  isOfAlignment: alignment => hasClass(component, alignment),
  isOfShape: shape => hasClass(component, shape),
  text: () => component.getText()
});
