# Tag component

> A Tag component

## Properties

| propName | propType | defaultValue | isRequired | description |
|----------|----------|--------------|------------|-------------|
| label | string | - | + | The label which will be displayed on the Tag |
| id | string | - | + | The id of the Tag |
| removable | bool | true | - | If the Tag is removable then it will contain a small clickable X|
| disabled | bool | false | - |  when set to true this component is disabled
| onRemove | func | noop | - | Callback function when removing the Tag |
| size | small or large | small | - | The height of the Tag |
| thumb | element | - | - | An optional thumb to display as part of the Tag |
| theme | [standard, error, warning] |standard| - | theme of the Tag |
