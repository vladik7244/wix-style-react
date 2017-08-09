const checkboxDriverFactory = component => ({
  click: () => component.click(),
  getLabel: () => component.$(`label`),
  getInput: () => component.$(`input`),
  isChecked: () => component.$(`[data-hook-checked="true"]`).isPresent(),
  isDisabled: () => !!component.$(`input`).getAttribute('disabled'),
  element: () => component
});

export default checkboxDriverFactory;
