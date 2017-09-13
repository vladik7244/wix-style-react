import _ from 'lodash/fp';

const buttonSelectionDriverFactory = component => {
  const getButtons = () => component.$$('span');

  return {
    getButtonsNames: () => getButtons().getText(),
    getButtonsClasses: () => getButtons().getAttribute('class'),
    getSelectedButton: () => {
      return component.$$('span').getAttribute('class')
          .then(classes => {
            const selectedBtnClass = classes.filter(i => i.match(/ButtonSelection.*[^un]selected/))[0];
            return component.$(`.${selectedBtnClass}`).getText();
          });
    },
    selectByValue: value => {
      return getButtons().getText()
        .then(names => {
          const btnIdx = names.indexOf(value);
          getButtons().get(btnIdx).click();
        });
    },
    element: () => component
  };
};

export default buttonSelectionDriverFactory;

