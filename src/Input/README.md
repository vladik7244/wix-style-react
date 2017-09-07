# Input component

> General input container.

## Properties

| propName | propType | defaultValue | isRequired | description |
|----------|----------|--------------|------------|-------------|
| value | string | - | - | Inputs value |
| theme | string | normal | - | The theme of the input, can be one of `normal`, `paneltitle`, `material`, `amaterial`, `flat`, `flatdark` |
| defaultValue | string | - | - | Default value for those who wants to use this component un-controlled |
| tabIndex  | number | - | - | Standard component tabIndex |
| textOverflow | string | clip | - | Text overflow behaviour |
| placeholder  | string | - | - | Placeholder to display |
| readOnly  | bool | false | - | Sets the input to readOnly |
| error  | bool | false | - | Is input value erroneous |
| errorMessage | string | - | - | The error message to display when hovering the error icon, if not given or empty there will be no tooltip |
| help  | bool | false | - | Adding a suffix help icon |
| helpMessage | string | - | - | The help message to display when hovering the help icon, if not given or empty there will be no tooltip |
| unit  | string | - | - | Unit to display in input box |
| magnifyingGlass | bool | false | - | Should the component include a magnifyingGlass |
| menuArrow | bool | false | - | Should the component include a menu arrow |
| rtl  | bool | false | - | Flip the magnify glass image so it be more suitable to rtl |
| autoFocus | bool | false  | - | Standard React Input autoFocus (focus the element on mount) |
| maxLength | number | 524288 | - | Input max length |
| autoSelect | bool | false | - | Standard React Input autoSelect (select the entire text of the element on focus) |
| onChange  | func | - | - | Standard input onChange callback |
| onBlur | func | - | -  | Standard input onBlur callback |
| onInputClicked | func | - | -  | Standard input onClick callback |
| onFocus | func | - | - | Standard input onFocus callback |
| onEnterPressed | func | - | - | Called when user presses -enter- |
| onEscapePressed | func | - | - | Called when user presses -escape- |
| onKeyDown | func | - | - | Standard input onKeyDown callback |
| onClear | func | - | - | Displays a X button on a non-empty input, and calls this callback when pressed. This callback should normally erase the value of the controlled object, and call focus |
| onPaste | func | - | - | called when user pastes text from clipboard (using mouse or keyboard shortcut) |
| size | string | normal | - | Specifies the size of the input (small, normal, large) |
| dataHook | string | normal | - | Specifies a data-hook for tests |
| disabled | bool | false | - |  when set to true this component is disabled
| prefix | node | - | - | Component you want to show as the prefix of the input |
| suffix | node | - | - | Component you want to show as the suffix of the input |
| roundInput | bool | false | - | When set to true, this input will be rounded |
| noLeftBorderRadius | bool | false | - | When set to true, this input will have no rounded corners on its left |
| noRightBorderRadius | bool | false | - | When set to true, this input will have no rounded corners on its right |
| tooltipPlacement | [top, bottom, right, left] | - | - | Placement of the error and help tooltips (supported only for amaterial them for now) |
| onTooltipShow | func | - | - | onShow prop for the error and help tooltips (supported only for amaterial them for now)|
| maxTooltipWidth | string | 250px | - | Max width for a validation/help tooltip (see maxWidth prop of Tooltip component)|
| autocomplete | [on, off] | - | - | Turns on or off autocomplete property, which is responsible for default browser autocomplete suggestions|

## Functions

| function name | description |
|---------------|-------------|
| focus | Focuses on the input |
| blur | Blurs the input (loses focus) |
| select | Selects all text in the input |
